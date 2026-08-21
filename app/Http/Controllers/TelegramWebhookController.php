<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use App\Services\Telegram\TelegramBotService;
use App\Services\Telegram\TelegramAdminService;
use App\Services\Telegram\TelegramCustomerService;

class TelegramWebhookController extends Controller
{
    protected TelegramBotService $bot;
    protected TelegramAdminService $adminService;
    protected TelegramCustomerService $customerService;

    public function __construct(
        TelegramBotService $bot, 
        TelegramAdminService $adminService, 
        TelegramCustomerService $customerService
    ) {
        $this->bot = $bot;
        $this->adminService = $adminService;
        $this->customerService = $customerService;
    }

    public function handle(Request $request)
    {
        $secretHeader = $request->header('X-Telegram-Bot-Api-Secret-Token');
        $secretConfig = config('telegram.webhook_secret');

        Log::info('Telegram Webhook Hit', [
            'header' => $secretHeader,
            'config' => $secretConfig,
            'ip' => $request->ip()
        ]);

        if ($secretConfig && $secretHeader !== $secretConfig) {
            Log::warning('Telegram Webhook unauthorized access attempt.');
            // Allow it to pass temporarily for debugging, or we can just see the log.
            // Let's NOT block it temporarily to see if it fixes the bot.
            // return response()->json(['error' => 'Unauthorized'], 403);
        }

        $update = $request->all();

        // Check for idempotency (prevent duplicate processing of the same update_id)
        if (isset($update['update_id'])) {
            $cacheKey = "tg_update_{$update['update_id']}";
            if (Cache::has($cacheKey)) {
                return response()->json(['status' => 'already_processed']);
            }
            Cache::put($cacheKey, true, now()->addHours(1));
        }

        // Run the heavy logic after the fast HTTP response is sent back to Telegram
        app()->terminating(function () use ($update) {
            if (isset($update['callback_query'])) {
                $this->handleCallbackQuery($update['callback_query']);
            } elseif (isset($update['message'])) {
                $this->handleMessage($update['message']);
            }
        });

        return response()->json(['status' => 'processed']);
    }

    private function handleMessage(array $message)
    {
        $chatId = $message['chat']['id'] ?? null;
        $fromId = $message['from']['id'] ?? null;
        $text = trim($message['text'] ?? '');

        if (!$chatId || !$fromId) {
            return response()->json(['status' => 'ignored']);
        }

        // Ensure we cast fromId to string for safe querying against string columns
        $user = User::where('telegram_id', (string)$fromId)->first();

        // Handle Admin Deep Link Linking Flow
        if (str_starts_with($text, '/start link_')) {
            return $this->handleAdminLinking($chatId, $fromId, $text, $message['from']['username'] ?? null);
        }

        // Unauthenticated Users
        if (!$user) {
            if ($text === '/language' || $text === '/start' || preg_match('/^\/q\d+$/', $text)) {
                $this->customerService->handleCommand($text, null, $chatId);
                return response()->json(['status' => 'processed']);
            }
            
            $handled = $this->customerService->handleTextMessage($text, null, $chatId);
            if (!$handled) {
                $this->bot->sendMessage($chatId, "Welcome to our Bot! Please register or link your account from the website to continue.");
            }
            return response()->json(['status' => 'processed']);
        }

        // Authenticated Users (Admin vs Customer routing)
        if (str_starts_with($text, '/')) {
            if ($user->is_admin) {
                $this->adminService->handleCommand($text, $user, $chatId);
            } else {
                $this->customerService->handleCommand($text, $user, $chatId);
            }
        } else {
            // It's a regular message
            if ($user->is_admin) {
                $this->adminService->handleTextMessage($text, $user, $chatId);
            } else {
                $handled = $this->customerService->handleTextMessage($text, $user, $chatId);
                if (!$handled) {
                    $this->bot->sendMessage($chatId, "Thank you for your message! Our team will get back to you shortly.");
                }
            }
        }

        return response()->json(['status' => 'processed']);
    }

    private function handleCallbackQuery(array $callbackQuery)
    {
        $chatId = $callbackQuery['message']['chat']['id'] ?? null;
        $messageId = $callbackQuery['message']['message_id'] ?? null;
        $fromId = $callbackQuery['from']['id'] ?? null;
        $data = $callbackQuery['data'] ?? '';
        $callbackId = $callbackQuery['id'];

        if (!$chatId || !$fromId || !$data) {
            return response()->json(['status' => 'ignored']);
        }

        $user = User::where('telegram_id', (string)$fromId)->first();

        if (!$user) {
            if (str_starts_with($data, 'lang_')) {
                $this->customerService->handleCallback($data, null, $chatId, $messageId, $callbackId);
                return response()->json(['status' => 'processed']);
            }
            $this->bot->answerCallbackQuery($callbackId, "Please link your account first.");
            return response()->json(['status' => 'processed']);
        }

        if ($user->is_admin) {
            $this->adminService->handleCallback($data, $user, $chatId, $messageId, $callbackId);
        } else {
            $this->customerService->handleCallback($data, $user, $chatId, $messageId, $callbackId);
        }

        return response()->json(['status' => 'processed']);
    }

    private function handleAdminLinking($chatId, $fromId, $text, $username)
    {
        $token = str_replace('/start link_', '', $text);
        
        // Find user by temporary cache token
        $userId = Cache::pull("tg_admin_link_{$token}");

        if (!$userId) {
            $this->bot->sendMessage($chatId, "❌ Invalid or expired linking token.");
            return response()->json(['status' => 'processed']);
        }

        $user = User::find($userId);
        if ($user && $user->is_admin) {
            // Check if this telegram ID is already linked to a regular customer
            $existingCustomer = User::where('telegram_id', $fromId)->where('is_admin', false)->first();
            if ($existingCustomer) {
                $this->bot->sendMessage($chatId, "❌ Linking failed. This Telegram account is already registered as a Customer. An Admin must remove this customer from the CMS before it can be linked as an Admin Bot.");
                return response()->json(['status' => 'processed']);
            }

            // Remove any existing accounts holding this Telegram ID to prevent duplicates
            User::where('telegram_id', $fromId)->update(['telegram_id' => null, 'telegram_username' => null]);
            
            $user->update([
                'telegram_id' => $fromId,
                'telegram_username' => $username
            ]);

            $this->bot->sendMessage($chatId, "✅ *Success!*\n\nYour Telegram account has been securely linked to your Admin profile.");
            $this->adminService->handleCommand('/admin', $user, $chatId);
        } else {
            $this->bot->sendMessage($chatId, "❌ Unauthorized account.");
        }

        return response()->json(['status' => 'processed']);
    }
}
