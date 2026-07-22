<?php

namespace App\Services\ProductImport;

use App\Services\ProductImport\Exceptions\InvalidItemException;

class MarketplaceUrlParser
{
    protected array $allowedHosts = [
        'item.taobao.com',
        'detail.tmall.com',
        'm.taobao.com',
        'm.intl.taobao.com',
        'h5.m.taobao.com',
        'world.taobao.com',
    ];

    /**
     * Parse the URL, validate it, and extract the marketplace and item ID.
     *
     * @return array{marketplace: string, item_id: string}
     * @throws InvalidItemException
     */
    public function parse(string $url): array
    {
        $url = trim($url);
        
        // Basic safety checks
        if (!preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://' . $url;
        }

        $parsed = parse_url($url);
        if (!$parsed || !isset($parsed['host'])) {
            throw new InvalidItemException("Invalid URL format.");
        }

        $host = strtolower($parsed['host']);

        // Check against allowlist
        $isAllowed = false;
        foreach ($this->allowedHosts as $allowed) {
            if ($host === $allowed || str_ends_with($host, '.' . $allowed)) {
                $isAllowed = true;
                break;
            }
        }

        if (!$isAllowed) {
            throw new InvalidItemException("Unsupported marketplace or domain.");
        }

        $marketplace = str_contains($host, 'tmall') ? 'tmall' : 'taobao';
        $itemId = null;

        // Try extracting from query parameter 'id' or 'item_id'
        if (isset($parsed['query'])) {
            parse_str($parsed['query'], $queryParams);
            if (isset($queryParams['id']) && is_numeric($queryParams['id'])) {
                $itemId = $queryParams['id'];
            } elseif (isset($queryParams['item_id']) && is_numeric($queryParams['item_id'])) {
                $itemId = $queryParams['item_id'];
            }
        }

        // Try extracting from path if not found in query (e.g. for some shortlinks, though typically they have query params)
        if (!$itemId && isset($parsed['path'])) {
            if (preg_match('/\/(\d+)\.htm/i', $parsed['path'], $matches)) {
                $itemId = $matches[1];
            }
        }

        if (!$itemId) {
            throw new InvalidItemException("Could not extract item ID from URL.");
        }

        return [
            'marketplace' => $marketplace,
            'item_id' => $itemId,
        ];
    }
}
