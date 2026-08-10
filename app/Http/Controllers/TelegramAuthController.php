<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TelegramFaq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TelegramAuthController extends Controller
{
    /**
     * Verify the Telegram Widget check hash and log in the user.
     */
    public function verifyWidget(Request $request)
    {
        $authData = $request->only([
            'id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date'
        ]);

        // Filter out null or empty values to build data check string correctly
        $authData = array_filter($authData, fn($val) => !is_null($val) && $val !== '');

        $hash = $request->input('hash');
        if (!$hash) {
            return response()->json(['error' => 'Missing signature hash.'], 400);
        }

        $botToken = config('services.telegram.bot_token');
        if (!$botToken) {
            return response()->json(['error' => 'Telegram Bot Token not configured on server.'], 500);
        }

        // 1. Sort alphabetically by key
        ksort($authData);

        // 2. Build check string
        $dataCheckArr = [];
        foreach ($authData as $key => $value) {
            $dataCheckArr[] = "{$key}={$value}";
        }
        $dataCheckString = implode("\n", $dataCheckArr);

        // 3. Compute secret key and hash
        $secretKey = hash('sha256', $botToken, true);
        $hashToCheck = hash_hmac('sha256', $dataCheckString, $secretKey);

        // 4. Verify HMAC signature
        if (!hash_equals($hashToCheck, $hash)) {
            return response()->json(['error' => 'Invalid signature. Verification failed.'], 401);
        }

        // 5. Verify freshness (must be authenticated within the last 24 hours)
        if (time() - (int)$request->input('auth_date') > 86400) {
            return response()->json(['error' => 'Authentication credentials expired.'], 401);
        }

        $telegramId = $request->input('id');
        $username = $request->input('username');
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $photoUrl = $request->input('photo_url');

        // 6. Resolve user account
        $user = User::where('telegram_id', $telegramId)->first();

        if (!$user) {
            $email = "telegram_{$telegramId}@mvmlogistics.asia";
            $user = User::where('email', $email)->first();

            if (!$user) {
                $name = trim("{$firstName} {$lastName}");
                if ($name === '') {
                    $name = $username ?: "Telegram User {$telegramId}";
                }

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'telegram_id' => $telegramId,
                    'telegram_username' => $username,
                    'avatar' => $photoUrl,
                    'email_verified_at' => now(),
                    'password' => Hash::make(Str::random(24)),
                    'role' => 'customer',
                    'customer_code' => User::generateCustomerCode(),
                    'account_status' => 'active',
                ]);
            } else {
                $user->update([
                    'telegram_id' => $telegramId,
                    'telegram_username' => $username,
                    'avatar' => $photoUrl ?: $user->avatar,
                ]);
            }
        } else {
            $user->update([
                'telegram_username' => $username,
                'avatar' => $photoUrl ?: $user->avatar,
            ]);
        }

        // Log the user in
        Auth::guard('web')->login($user, true);
        $request->session()->regenerate();
        $user->forceFill(['last_login_at' => now()])->save();

        return response()->json([
            'success' => true,
            'next_url' => session()->pull('url.intended', '/'),
        ]);
    }

    /**
     * Verify the Telegram Mini App initData and log in the user.
     */
    public function verifyMiniApp(Request $request)
    {
        $initData = $request->input('initData');
        if (!$initData) {
            return response()->json(['error' => 'Missing initData'], 400);
        }

        $parsedData = [];
        foreach (explode('&', $initData) as $chunk) {
            $param = explode('=', $chunk, 2);
            if (count($param) === 2) {
                $parsedData[urldecode($param[0])] = urldecode($param[1]);
            }
        }

        if (!isset($parsedData['hash'])) {
            return response()->json(['error' => 'Missing hash'], 400);
        }

        $hash = $parsedData['hash'];
        unset($parsedData['hash']);

        ksort($parsedData);
        $dataCheckArr = [];
        foreach ($parsedData as $key => $value) {
            $dataCheckArr[] = "{$key}={$value}";
        }
        $dataCheckString = implode("\n", $dataCheckArr);

        $botToken = config('services.telegram.bot_token');
        if (!$botToken) {
            return response()->json(['error' => 'Telegram Bot Token not configured on server.'], 500);
        }

        $secretKey = hash_hmac('sha256', $botToken, 'WebAppData', true);
        $hashToCheck = hash_hmac('sha256', $dataCheckString, $secretKey);

        if (!hash_equals($hashToCheck, $hash)) {
            return response()->json(['error' => 'Invalid signature. Verification failed.'], 401);
        }

        if (!isset($parsedData['user'])) {
            return response()->json(['error' => 'Missing user data'], 400);
        }

        $tgUser = json_decode($parsedData['user'], true);
        $telegramId = $tgUser['id'];
        $username = $tgUser['username'] ?? null;
        $firstName = $tgUser['first_name'] ?? '';
        $lastName = $tgUser['last_name'] ?? '';
        $photoUrl = $tgUser['photo_url'] ?? null;

        // Same user resolution logic as verifyWidget
        $user = User::where('telegram_id', $telegramId)->first();

        if (!$user) {
            $email = "telegram_{$telegramId}@mvmlogistics.asia";
            $user = User::where('email', $email)->first();

            if (!$user) {
                $name = trim("{$firstName} {$lastName}");
                if ($name === '') {
                    $name = $username ?: "Telegram User {$telegramId}";
                }

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'telegram_id' => $telegramId,
                    'telegram_username' => $username,
                    'avatar' => $photoUrl,
                    'email_verified_at' => now(),
                    'password' => Hash::make(Str::random(24)),
                    'role' => 'customer',
                    'customer_code' => User::generateCustomerCode(),
                    'account_status' => 'active',
                ]);
            } else {
                $user->update([
                    'telegram_id' => $telegramId,
                    'telegram_username' => $username,
                    'avatar' => $photoUrl ?: $user->avatar,
                ]);
            }
        } else {
            $user->update([
                'telegram_username' => $username,
                'avatar' => $photoUrl ?: $user->avatar,
            ]);
        }

        Auth::guard('web')->login($user, true);
        $request->session()->regenerate();
        $user->forceFill(['last_login_at' => now()])->save();

        return response()->json([
            'success' => true,
            'message' => 'Authenticated successfully',
            'user' => $user
        ]);
    }

    /**
     * Handle incoming webhooks from the Telegram Bot API.
     */
    public function handleWebhook(Request $request)
    {
        $secretHeader = $request->header('X-Telegram-Bot-Api-Secret-Token');
        $secretConfig = config('services.telegram.webhook_secret');

        if ($secretConfig && $secretHeader !== $secretConfig) {
            Log::warning('Telegram Webhook unauthorized access attempt.');
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $update = $request->all();

        $message = $update['message'] ?? null;
        $callbackQuery = $update['callback_query'] ?? null;

        if ($callbackQuery) {
            return $this->handleCallbackQuery($callbackQuery);
        }

        if (!$message) {
            return response()->json(['status' => 'ignored']);
        }

        $chatId = $message['chat']['id'] ?? null;
        $fromId = $message['from']['id'] ?? null;
        $fromUsername = $message['from']['username'] ?? null;
        $text = trim($message['text'] ?? '');

        if (!$chatId || !$fromId) {
            return response()->json(['status' => 'ignored']);
        }

        // Handle shared contact (for registration/login)
        if (isset($message['contact'])) {
            $contact = $message['contact'];
            $phone = $contact['phone_number'] ?? '';
            // Make sure the contact is the user's own contact
            if (($contact['user_id'] ?? null) == $fromId) {
                $normalizedPhone = $this->normalizePhone($phone);
                if ($normalizedPhone) {
                    $user = User::where('phone_e164', $normalizedPhone)->first();
                    
                    if ($user) {
                        // User exists, update their telegram ID
                        User::where('telegram_id', $fromId)->update(['telegram_id' => null]); // clear duplicates
                        $user->update([
                            'telegram_id' => $fromId,
                            'telegram_username' => $fromUsername,
                        ]);
                        $this->sendMessage($chatId, "✅ *Welcome back!*\n\nYour Telegram account is now linked to your existing MVM Logistics account.\nYou can now request an OTP on the website.", ['remove_keyboard' => true]);
                    } else {
                        // Create a new user account for them!
                        User::where('telegram_id', $fromId)->update(['telegram_id' => null]); // clear duplicates
                        
                        $name = $fromUsername ?? trim(($message['from']['first_name'] ?? '') . ' ' . ($message['from']['last_name'] ?? '')) ?: 'Telegram User';
                        
                        User::create([
                            'name' => $name,
                            'phone_e164' => $normalizedPhone,
                            'telegram_id' => $fromId,
                            'telegram_username' => $fromUsername,
                            'account_status' => 'active',
                            'password' => bcrypt(Str::random(24)),
                        ]);
                        $this->sendMessage($chatId, "🎉 *Registration Complete!*\n\nWe've created a new MVM Logistics account for your phone number.\nReturn to the website and enter your phone number to receive your OTP and log in.", ['remove_keyboard' => true]);
                    }
                } else {
                    $this->sendMessage($chatId, "❌ Invalid phone number format.");
                }
            } else {
                $this->sendMessage($chatId, "❌ Please share your own contact using the button provided.");
            }
            return response()->json(['status' => 'processed']);
        }

        // Handle commands
        if (str_starts_with($text, '/start')) {
            // Handle parameterized starts: e.g. /start link_USERID
            if (preg_match('/^\/start\s+link_(\d+)$/', $text, $matches)) {
                $userId = (int) $matches[1];
                $user = User::find($userId);
                
                if ($user) {
                    // Prevent unique conflict if same Telegram ID was linked elsewhere
                    User::where('telegram_id', $fromId)->update(['telegram_id' => null]);

                    $user->update([
                        'telegram_id' => $fromId,
                        'telegram_username' => $fromUsername,
                    ]);

                    $this->sendMessage($chatId, "✅ *Your Telegram account has been linked to MVM Logistics!*\n\nYou can now use this Telegram Bot to receive instant verification codes (OTP) when logging in.", ['remove_keyboard' => true]);
                } else {
                    $this->sendMessage($chatId, "❌ User not found. Could not link account.");
                }
            } else {
                // Standalone start command
                $replyMarkup = [
                    'inline_keyboard' => [
                        [
                            ['text' => '🇰🇭 ខ្មែរ', 'callback_data' => 'lang_km'],
                            ['text' => '🇬🇧 English', 'callback_data' => 'lang_en'],
                            ['text' => '🇻🇳 Tiếng Việt', 'callback_data' => 'lang_vi'],
                        ]
                    ]
                ];
                $this->sendMessage($chatId, "Welcome to *MVM Logistics*! 📦\n\nPlease select your preferred language below to view our FAQs, or share your phone number to log in.", $replyMarkup);
                
                $contactMarkup = [
                    'keyboard' => [
                        [
                            ['text' => '📱 Share Phone Number to Register', 'request_contact' => true]
                        ]
                    ],
                    'resize_keyboard' => true,
                    'one_time_keyboard' => true,
                ];
                $this->sendMessage($chatId, "To log in or sign up, please click the button below to share your phone number.", $contactMarkup);
            }
        } elseif (str_starts_with($text, '/faq') || str_starts_with($text, '/help')) {
            $replyMarkup = [
                'inline_keyboard' => [
                    [
                        ['text' => '🇰🇭 ខ្មែរ', 'callback_data' => 'lang_km'],
                        ['text' => '🇬🇧 English', 'callback_data' => 'lang_en'],
                        ['text' => '🇻🇳 Tiếng Việt', 'callback_data' => 'lang_vi'],
                    ]
                ]
            ];
            $this->sendMessage($chatId, "Please select your language / សូមជ្រើសរើសភាសា / Vui lòng chọn ngôn ngữ:", $replyMarkup);
        }

        return response()->json(['status' => 'processed']);
    }

    private function handleCallbackQuery($callbackQuery)
    {
        $chatId = $callbackQuery['message']['chat']['id'] ?? null;
        $messageId = $callbackQuery['message']['message_id'] ?? null;
        $data = $callbackQuery['data'] ?? '';

        if (!$chatId || !$data) {
            return response()->json(['status' => 'ignored']);
        }

        if ($data === 'lang_select_menu') {
            $replyMarkup = [
                'inline_keyboard' => [
                    [
                        ['text' => '🇰🇭 ខ្មែរ', 'callback_data' => 'lang_km'],
                        ['text' => '🇬🇧 English', 'callback_data' => 'lang_en'],
                        ['text' => '🇻🇳 Tiếng Việt', 'callback_data' => 'lang_vi'],
                    ]
                ]
            ];
            $this->editMessageText($chatId, $messageId, "Please select your language / សូមជ្រើសរើសភាសា / Vui lòng chọn ngôn ngữ:", $replyMarkup);
        } elseif (str_starts_with($data, 'lang_')) {
            $lang = str_replace('lang_', '', $data);
            $this->sendFaqList($chatId, $messageId, $lang);
        } elseif (str_starts_with($data, 'faq_')) {
            $parts = explode('_', $data);
            if (count($parts) === 3) {
                $faqId = $parts[1];
                $lang = $parts[2];
                $this->sendFaqAnswer($chatId, $messageId, $faqId, $lang);
            }
        }

        // Answer callback query to remove loading state
        $this->answerCallbackQuery($callbackQuery['id']);
        
        return response()->json(['status' => 'processed']);
    }

    private function sendFaqList($chatId, $messageId, $lang)
    {
        $faqs = TelegramFaq::where('is_active', true)->orderBy('sort_order')->get();
        $buttons = [];
        
        foreach ($faqs as $faq) {
            $qField = "question_{$lang}";
            $title = $faq->$qField ?: $faq->question_en;
            if ($title) {
                $buttons[] = [['text' => $title, 'callback_data' => "faq_{$faq->id}_{$lang}"]];
            }
        }

        // Add language selection back button
        $backText = $lang === 'km' ? '🔄 ប្តូរភាសា' : ($lang === 'vi' ? '🔄 Đổi ngôn ngữ' : '🔄 Change Language');
        $buttons[] = [['text' => $backText, 'callback_data' => 'lang_select_menu']];

        $header = $lang === 'km' ? 'សំណួរដែលសួរញឹកញាប់៖' : ($lang === 'vi' ? 'Câu hỏi thường gặp:' : 'Frequently Asked Questions:');

        $this->editMessageText($chatId, $messageId, $header, ['inline_keyboard' => $buttons]);
    }

    private function sendFaqAnswer($chatId, $messageId, $faqId, $lang)
    {
        $faq = TelegramFaq::find($faqId);
        if (!$faq) {
            return;
        }

        $qField = "question_{$lang}";
        $aField = "answer_{$lang}";
        
        $question = $faq->$qField ?: $faq->question_en;
        $answer = $faq->$aField ?: $faq->answer_en;

        $text = "❓ *{$question}*\n\n{$answer}";

        $backText = $lang === 'km' ? '⬅️ ត្រឡប់ក្រោយ' : ($lang === 'vi' ? '⬅️ Quay lại' : '⬅️ Back to FAQs');
        
        $replyMarkup = [
            'inline_keyboard' => [
                [
                    ['text' => $backText, 'callback_data' => "lang_{$lang}"]
                ]
            ]
        ];

        $this->editMessageText($chatId, $messageId, $text, $replyMarkup);
    }

    private function answerCallbackQuery($callbackQueryId)
    {
        $botToken = config('services.telegram.bot_token');
        if (!$botToken) return false;

        Http::post("https://api.telegram.org/bot{$botToken}/answerCallbackQuery", [
            'callback_query_id' => $callbackQueryId
        ]);
        return true;
    }

    private function editMessageText($chatId, $messageId, $text, $replyMarkup = null)
    {
        $botToken = config('services.telegram.bot_token');
        if (!$botToken) return false;

        $payload = [
            'chat_id' => $chatId,
            'message_id' => $messageId,
            'text' => $text,
            'parse_mode' => 'Markdown',
        ];

        if ($replyMarkup) {
            $payload['reply_markup'] = json_encode($replyMarkup);
        }

        Http::post("https://api.telegram.org/bot{$botToken}/editMessageText", $payload);
        return true;
    }

    /**
     * Send a 6-digit OTP code to the user's linked Telegram chat.
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'identifier' => ['required', 'string'],
        ]);

        $identifier = trim($request->input('identifier'));
        $normalizedPhone = $this->normalizePhone($identifier);

        // Search user by phone or telegram username
        $user = User::where(function ($query) use ($identifier, $normalizedPhone) {
            $query->where('telegram_username', $identifier)
                ->orWhere('telegram_username', ltrim($identifier, '@'));
            
            if ($normalizedPhone) {
                $query->orWhere('phone_e164', $normalizedPhone)
                      ->orWhere('phone_e164', $identifier);
            }
        })->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found',
                'message' => 'Your phone number is not registered yet. Please click "Start our Telegram Bot first" below and send any message or share your contact to register.'
            ], 404);
        }

        if (!$user->telegram_id) {
            return response()->json([
                'error' => 'Telegram not linked',
                'message' => 'Your account is not linked to Telegram yet. Please click "Start our Telegram Bot first" below, or log in with Google to link it in your Profile.'
            ], 422);
        }

        // Generate OTP
        $otp = (string) random_int(100000, 999999);
        $user->forceFill([
            'telegram_otp_code' => $otp,
            'telegram_otp_expires_at' => now()->addSeconds(120),
        ])->save();

        // Send to Telegram
        $text = "🔐 *Your MVM Logistics verification code is: {$otp}*\n\nThis code will expire in 2 minutes (120 seconds). Do not share it with anyone.";
        $sent = $this->sendMessage($user->telegram_id, $text);

        if (!$sent) {
            return response()->json([
                'error' => 'Sending failed',
                'message' => 'Failed to send OTP to your Telegram account. Please try again later or contact support.'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'A 6-digit verification code has been sent to your Telegram chat.'
        ]);
    }

    /**
     * Verify the OTP code and log the user in.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'identifier' => ['required', 'string'],
            'otp_code' => ['required', 'string', 'size:6'],
        ]);

        $identifier = trim($request->input('identifier'));
        $otp = trim($request->input('otp_code'));
        $normalizedPhone = $this->normalizePhone($identifier);

        $user = User::where(function ($query) use ($identifier, $normalizedPhone) {
            $query->where('telegram_username', $identifier)
                ->orWhere('telegram_username', ltrim($identifier, '@'));
            
            if ($normalizedPhone) {
                $query->orWhere('phone_e164', $normalizedPhone)
                      ->orWhere('phone_e164', $identifier);
            }
        })->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found',
                'message' => 'No account was found matching the phone or Telegram username.'
            ], 404);
        }

        if (!$user->telegram_otp_code || $user->telegram_otp_code !== $otp) {
            return response()->json([
                'error' => 'Invalid code',
                'message' => 'The verification code provided is incorrect.'
            ], 422);
        }

        if ($user->telegram_otp_expires_at && $user->telegram_otp_expires_at->isPast()) {
            return response()->json([
                'error' => 'Expired code',
                'message' => 'The verification code has expired. Please request a new one.'
            ], 422);
        }

        // Success: clear OTP
        $user->forceFill([
            'telegram_otp_code' => null,
            'telegram_otp_expires_at' => null,
        ])->save();

        // Login user
        Auth::guard('web')->login($user, true);
        $request->session()->regenerate();
        $user->forceFill(['last_login_at' => now()])->save();

        return response()->json([
            'success' => true,
            'next_url' => session()->pull('url.intended', '/'),
        ]);
    }

    /**
     * Outbound message dispatcher to Telegram Bot API.
     */
    private function sendMessage($chatId, string $text, array $replyMarkup = null)
    {
        $token = config('services.telegram.bot_token');
        if (!$token) {
            Log::error('Telegram Bot Token not configured.');
            return false;
        }

        $payload = [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => 'Markdown',
        ];

        if ($replyMarkup) {
            $payload['reply_markup'] = json_encode($replyMarkup);
        }

        $response = Http::post("https://api.telegram.org/bot{$token}/sendMessage", $payload);

        if (!$response->successful()) {
            Log::error('Telegram sendMessage failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;
        }

        return true;
    }

    private function normalizePhone(?string $phone): ?string
    {
        $phone = trim((string) $phone);
        if ($phone === '') {
            return null;
        }

        // Not a phone number if starts with @
        if (str_starts_with($phone, '@') || !preg_match('/^[0-9+\s\-()]+$/', $phone)) {
            return null;
        }

        // Strip everything except digits and +
        $phone = preg_replace('/[^\d+]/', '', $phone);

        // Ensure + prefix if it starts with known country codes
        if (!str_starts_with($phone, '+')) {
            if (preg_match('/^(855|84|856)/', $phone)) {
                $phone = '+' . $phone;
            } elseif (str_starts_with($phone, '0')) {
                // Default to Cambodia if leading 0
                $phone = '+855' . substr($phone, 1);
            } else {
                $phone = '+855' . $phone;
            }
        }

        return $phone;
    }
}
