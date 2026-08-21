<?php

namespace App\Services\Telegram;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramBotService
{
    protected string $token;

    public function __construct()
    {
        $this->token = config('telegram.bot_token', config('services.telegram.bot_token', ''));
    }

    public function sendMessage($chatId, string $text, array $replyMarkup = null, string $parseMode = 'Markdown')
    {
        if (!$this->token) {
            Log::error('Telegram Bot Token not configured.');
            return false;
        }

        $payload = [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => $parseMode,
        ];

        if ($replyMarkup) {
            $payload['reply_markup'] = json_encode($replyMarkup);
        }

        $response = Http::timeout(10)->post("https://api.telegram.org/bot{$this->token}/sendMessage", $payload);

        if (!$response->successful()) {
            Log::error('Telegram sendMessage failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;
        }

        return true;
    }

    public function sendDocument($chatId, $document, string $caption = '', array $replyMarkup = null)
    {
        if (!$this->token) return false;

        $payload = [
            'chat_id' => $chatId,
            'caption' => $caption,
            'parse_mode' => 'Markdown',
        ];

        if ($replyMarkup) {
            $payload['reply_markup'] = json_encode($replyMarkup);
        }

        // if $document is a file path
        if (is_string($document) && file_exists($document)) {
            $response = Http::timeout(30)->attach(
                'document', file_get_contents($document), basename($document)
            )->post("https://api.telegram.org/bot{$this->token}/sendDocument", $payload);
        } else {
            // Document could be a URL or file_id
            $payload['document'] = $document;
            $response = Http::timeout(15)->post("https://api.telegram.org/bot{$this->token}/sendDocument", $payload);
        }

        if (!$response->successful()) {
            Log::error('Telegram sendDocument failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;
        }
        return true;
    }

    public function answerCallbackQuery($callbackQueryId, $text = null)
    {
        if (!$this->token) return false;

        $payload = ['callback_query_id' => $callbackQueryId];
        if ($text) {
            $payload['text'] = $text;
        }

        Http::timeout(5)->post("https://api.telegram.org/bot{$this->token}/answerCallbackQuery", $payload);
        return true;
    }

    public function editMessageText($chatId, $messageId, $text, $replyMarkup = null)
    {
        if (!$this->token) return false;

        $payload = [
            'chat_id' => $chatId,
            'message_id' => $messageId,
            'text' => $text,
            'parse_mode' => 'Markdown',
        ];

        if ($replyMarkup) {
            $payload['reply_markup'] = json_encode($replyMarkup);
        }

        Http::timeout(10)->post("https://api.telegram.org/bot{$this->token}/editMessageText", $payload);
        return true;
    }

    public function deleteMessage($chatId, $messageId): bool
    {
        if (!$this->token) return false;

        $response = Http::timeout(5)->post("https://api.telegram.org/bot{$this->token}/deleteMessage", [
            'chat_id'    => $chatId,
            'message_id' => $messageId,
        ]);

        return $response->successful();
    }
}
