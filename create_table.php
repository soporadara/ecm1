<?php
try {
    $sql = "CREATE TABLE IF NOT EXISTS popups (
        id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title varchar(255) NOT NULL,
        heading varchar(255) NULL,
        description text NULL,
        image_path varchar(255) NULL,
        link_url varchar(255) NULL,
        is_active tinyint(1) NOT NULL DEFAULT '0',
        created_at timestamp NULL,
        updated_at timestamp NULL
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";

    $pdo = new PDO("mysql:host=127.0.0.1;port=3306;dbname=store1", "root", "");
    $pdo->exec($sql);
    
    // We also need to add it to the migrations table so Laravel knows it ran!
    $migrationName = "2026_07_18_161425_create_popups_table";
    $batch = 2; // Assuming batch 1 is initial
    $pdo->exec("INSERT INTO migrations (migration, batch) VALUES ('$migrationName', $batch) ON DUPLICATE KEY UPDATE batch=batch");
    
    echo "Table created successfully!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
