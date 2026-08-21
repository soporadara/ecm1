<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Telegram\TelegramBotService;
use Illuminate\Support\Facades\Http;

class SetTelegramCommands extends Command
{
    protected $signature = 'telegram:set-commands';
    protected $description = 'Set Telegram bot commands';

    public function handle(TelegramBotService $botService)
    {
        $token = config('telegram.bot_token', config('services.telegram.bot_token'));
        if (!$token) {
            $this->error('Bot token not found.');
            return 1;
        }

        $commands = [
            ['command' => 'start', 'description' => 'Open the Main Menu'],
            ['command' => 'track', 'description' => 'Track your active orders'],
            ['command' => 'language', 'description' => 'Change your language settings'],
        ];

        $response = Http::post("https://api.telegram.org/bot{$token}/setMyCommands", [
            'commands' => $commands
        ]);

        if ($response->successful()) {
            $this->info('Telegram bot commands set successfully!');
        } else {
            $this->error('Failed to set commands: ' . $response->body());
        }

        return 0;
    }
}
