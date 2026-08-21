<?php

namespace App\Services\Telegram;

class TelegramMessageFormatter
{
    /**
     * Escape characters for Telegram MarkdownV2 format.
     */
    public static function escape(string $text): string
    {
        $specialChars = [
            '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
        ];

        foreach ($specialChars as $char) {
            $text = str_replace($char, '\\' . $char, $text);
        }

        return $text;
    }

    /**
     * Escape characters safely without escaping markdown formatting.
     * We use simple Markdown parse_mode usually, which only supports basic bold, italic, links.
     */
    public static function escapeSimple(string $text): string
    {
        // For basic 'Markdown' parse_mode (legacy), we just need to avoid unmatched asterisks or underscores.
        // It's often safer to strip markdown characters from raw user data.
        return str_replace(['*', '_', '`', '['], ['\*', '\_', '\`', '\['], $text);
    }
}
