<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=store1', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Add columns if they don't exist
    $columns = ['is_system', 'is_private', 'show_in_navigation', 'is_deletable'];
    foreach ($columns as $col) {
        try {
            $pdo->exec("ALTER TABLE pages ADD COLUMN `$col` TINYINT(1) DEFAULT 0");
        } catch(PDOException $e) {
            // Column might already exist
        }
    }
    
    // Fix default values
    $pdo->exec("ALTER TABLE pages ALTER COLUMN show_in_navigation SET DEFAULT 1");
    $pdo->exec("ALTER TABLE pages ALTER COLUMN is_deletable SET DEFAULT 1");
    
    // Protect system pages
    $pdo->exec("UPDATE pages SET is_system = 1, is_deletable = 0 WHERE slug IN ('home', 'blog', 'about-us', 'contact-us')");
    
    // Hide and protect shop
    $pdo->exec("UPDATE pages SET is_system = 1, is_private = 1, show_in_navigation = 0, is_deletable = 0 WHERE slug = 'shop'");
    
    echo "SUCCESS";
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage();
}
