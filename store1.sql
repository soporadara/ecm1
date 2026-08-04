-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: store1
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `target_type` varchar(255) DEFAULT NULL,
  `target_id` bigint(20) unsigned DEFAULT NULL,
  `old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
  `new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_logs_user_id_foreign` (`user_id`),
  CONSTRAINT `audit_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,19,'firebase.login.success','App\\Models\\User',19,NULL,NULL,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','2026-08-03 10:07:21','2026-08-03 10:07:21'),(2,22,'firebase.login.success','App\\Models\\User',22,NULL,NULL,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','2026-08-03 10:11:52','2026-08-03 10:11:52');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internal_name` varchar(255) NOT NULL,
  `eyebrow_en` varchar(255) DEFAULT NULL,
  `eyebrow_km` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `title_km` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_km` text DEFAULT NULL,
  `primary_button_label` varchar(255) DEFAULT NULL,
  `primary_button_url` varchar(255) DEFAULT NULL,
  `secondary_button_label` varchar(255) DEFAULT NULL,
  `secondary_button_url` varchar(255) DEFAULT NULL,
  `desktop_media_id` bigint(20) unsigned DEFAULT NULL,
  `mobile_media_id` bigint(20) unsigned DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_file_path` varchar(255) DEFAULT NULL,
  `fallback_color` varchar(255) NOT NULL DEFAULT '#000000',
  `text_position` varchar(255) NOT NULL DEFAULT 'center',
  `content_alignment` varchar(255) NOT NULL DEFAULT 'center',
  `theme_variant` varchar(255) NOT NULL DEFAULT 'light',
  `header_theme` varchar(255) NOT NULL DEFAULT 'dark',
  `open_in_new_tab` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `banners_desktop_media_id_foreign` (`desktop_media_id`),
  KEY `banners_mobile_media_id_foreign` (`mobile_media_id`),
  KEY `banners_is_demo_index` (`is_demo`),
  KEY `banners_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `banners_desktop_media_id_foreign` FOREIGN KEY (`desktop_media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `banners_mobile_media_id_foreign` FOREIGN KEY (`mobile_media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (15,'homepage-banner-1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,49,49,NULL,NULL,'#0b1220','center','center','dark','dark',0,1,1,NULL,NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(16,'homepage-banner-2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,50,50,NULL,NULL,'#0b1220','center','center','dark','dark',0,1,2,NULL,NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(17,'homepage-banner-3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,51,51,NULL,NULL,'#0b1220','center','center','dark','dark',0,1,3,NULL,NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(18,'homepage-banner-4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,52,52,NULL,NULL,'#0b1220','center','center','dark','dark',0,1,4,NULL,NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brands_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Northline','northline',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(2,'Veloura','veloura',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(3,'Kroma','kroma',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(4,'Urban Step','urban-step',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(5,'Lumière','lumiere',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(6,'NovaTech','novatech',NULL,NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel-cache-feature_flag:storefront_cart_enabled','b:0;',1785294751),('laravel-cache-spatie.permission.cache','a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:70:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:14:\"dashboard.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:13;i:3;i:14;i:4;i:15;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:13:\"products.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:15:\"products.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:15:\"products.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:16:\"products.publish\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:16:\"products.archive\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:15:\"products.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:15:\"categories.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:17:\"categories.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:17:\"categories.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:17:\"categories.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:14:\"inventory.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:16:\"inventory.adjust\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:16:\"inventory.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:11:\"orders.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:13;i:3;i:14;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:13:\"orders.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:13;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:20:\"orders.update_status\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:13;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:13:\"orders.cancel\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:21:\"orders.refund_request\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:21:\"orders.refund_execute\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:13:\"payments.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:18:\"payments.configure\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:18:\"payments.reconcile\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:14:\"customers.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:13;i:3;i:14;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:16:\"customers.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:17:\"customers.disable\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:10:\"pages.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:27;a:4:{s:1:\"a\";i:28;s:1:\"b\";s:12:\"pages.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:28;a:4:{s:1:\"a\";i:29;s:1:\"b\";s:12:\"pages.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:29;a:4:{s:1:\"a\";i:30;s:1:\"b\";s:13:\"pages.publish\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:30;a:4:{s:1:\"a\";i:31;s:1:\"b\";s:12:\"pages.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:31;a:4:{s:1:\"a\";i:32;s:1:\"b\";s:10:\"posts.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:32;a:4:{s:1:\"a\";i:33;s:1:\"b\";s:12:\"posts.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:33;a:4:{s:1:\"a\";i:34;s:1:\"b\";s:12:\"posts.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:34;a:4:{s:1:\"a\";i:35;s:1:\"b\";s:13:\"posts.publish\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:35;a:4:{s:1:\"a\";i:36;s:1:\"b\";s:12:\"posts.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:36;a:4:{s:1:\"a\";i:37;s:1:\"b\";s:10:\"menus.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:37;a:4:{s:1:\"a\";i:38;s:1:\"b\";s:12:\"menus.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:38;a:4:{s:1:\"a\";i:39;s:1:\"b\";s:10:\"media.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:39;a:4:{s:1:\"a\";i:40;s:1:\"b\";s:12:\"media.upload\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:40;a:4:{s:1:\"a\";i:41;s:1:\"b\";s:12:\"media.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:41;a:4:{s:1:\"a\";i:42;s:1:\"b\";s:12:\"media.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:42;a:4:{s:1:\"a\";i:43;s:1:\"b\";s:11:\"themes.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:43;a:4:{s:1:\"a\";i:44;s:1:\"b\";s:16:\"themes.customize\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:44;a:4:{s:1:\"a\";i:45;s:1:\"b\";s:15:\"themes.activate\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:45;a:4:{s:1:\"a\";i:46;s:1:\"b\";s:15:\"promotions.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:46;a:4:{s:1:\"a\";i:47;s:1:\"b\";s:17:\"promotions.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:47;a:4:{s:1:\"a\";i:48;s:1:\"b\";s:12:\"reports.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:48;a:4:{s:1:\"a\";i:49;s:1:\"b\";s:22:\"reports.view_financial\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:49;a:4:{s:1:\"a\";i:50;s:1:\"b\";s:14:\"reports.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:50;a:4:{s:1:\"a\";i:51;s:1:\"b\";s:10:\"staff.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:51;a:4:{s:1:\"a\";i:52;s:1:\"b\";s:12:\"staff.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:52;a:4:{s:1:\"a\";i:53;s:1:\"b\";s:12:\"staff.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:53;a:4:{s:1:\"a\";i:54;s:1:\"b\";s:13:\"staff.disable\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:54;a:4:{s:1:\"a\";i:55;s:1:\"b\";s:10:\"roles.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:55;a:4:{s:1:\"a\";i:56;s:1:\"b\";s:12:\"roles.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:56;a:4:{s:1:\"a\";i:57;s:1:\"b\";s:12:\"roles.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:57;a:4:{s:1:\"a\";i:58;s:1:\"b\";s:12:\"roles.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:58;a:4:{s:1:\"a\";i:59;s:1:\"b\";s:18:\"permissions.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:59;a:4:{s:1:\"a\";i:60;s:1:\"b\";s:13:\"settings.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:60;a:4:{s:1:\"a\";i:61;s:1:\"b\";s:15:\"settings.update\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:61;a:4:{s:1:\"a\";i:62;s:1:\"b\";s:15:\"audit_logs.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:62;a:4:{s:1:\"a\";i:63;s:1:\"b\";s:14:\"backups.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:63;a:4:{s:1:\"a\";i:64;s:1:\"b\";s:13:\"receipts.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:13;}}i:64;a:4:{s:1:\"a\";i:65;s:1:\"b\";s:12:\"banners.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:65;a:4:{s:1:\"a\";i:66;s:1:\"b\";s:14:\"banners.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:66;a:4:{s:1:\"a\";i:67;s:1:\"b\";s:20:\"available_sites.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:67;a:4:{s:1:\"a\";i:68;s:1:\"b\";s:22:\"available_sites.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:68;a:4:{s:1:\"a\";i:69;s:1:\"b\";s:11:\"popups.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}i:69;a:4:{s:1:\"a\";i:70;s:1:\"b\";s:13:\"popups.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:15;}}}s:5:\"roles\";a:5:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:19:\"Super Administrator\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:13:\"Administrator\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:13;s:1:\"b\";s:9:\"Logistics\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:14;s:1:\"b\";s:7:\"Support\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:15;s:1:\"b\";s:15:\"Content Manager\";s:1:\"c\";s:3:\"web\";}}}',1785371569),('mvm-logistic-cache-356a192b7913b04c54574d18c28d46e6395428ab','i:1;',1785336652),('mvm-logistic-cache-356a192b7913b04c54574d18c28d46e6395428ab:timer','i:1785336652;',1785336652),('mvm-logistic-cache-358242f876ac0bc87af9d4e2df8a1e0b4e328a9a','i:1;',1785463870),('mvm-logistic-cache-358242f876ac0bc87af9d4e2df8a1e0b4e328a9a:timer','i:1785463870;',1785463870),('mvm-logistic-cache-4fd10d5d24e611f1ca4d97417cff6b334584880e','i:1;',1785300632),('mvm-logistic-cache-4fd10d5d24e611f1ca4d97417cff6b334584880e:timer','i:1785300632;',1785300632),('mvm-logistic-cache-5c785c036466adea360111aa28563bfd556b5fba','i:1;',1785752878),('mvm-logistic-cache-5c785c036466adea360111aa28563bfd556b5fba:timer','i:1785752878;',1785752878),('mvm-logistic-cache-5d24104f2fbe446a8c40701382193a09f56316aa','i:1;',1785467474),('mvm-logistic-cache-5d24104f2fbe446a8c40701382193a09f56316aa:timer','i:1785467474;',1785467474),('mvm-logistic-cache-765a16927a4dba1b2d2ce754fb42ba1f46bfa82b','i:1;',1785463889),('mvm-logistic-cache-765a16927a4dba1b2d2ce754fb42ba1f46bfa82b:timer','i:1785463889;',1785463889),('mvm-logistic-cache-admin_counts','a:6:{s:9:\"customers\";i:8;s:6:\"orders\";i:15;s:5:\"posts\";i:1;s:5:\"pages\";i:3;s:10:\"categories\";i:1;s:5:\"staff\";i:5;}',1785755967),('mvm-logistic-cache-af50c309dafdabf71961941e361b7a726a3a9b68','i:1;',1785463557),('mvm-logistic-cache-af50c309dafdabf71961941e361b7a726a3a9b68:timer','i:1785463557;',1785463557),('mvm-logistic-cache-e6d6452d9dc18533d55dbf3b2781b6af9e42ea46','i:1;',1785463967),('mvm-logistic-cache-e6d6452d9dc18533d55dbf3b2781b6af9e42ea46:timer','i:1785463967;',1785463967),('mvm-logistic-cache-ee3ec5bb5475aed4a6146048cf9da8bf2a976a76','i:1;',1785752572),('mvm-logistic-cache-ee3ec5bb5475aed4a6146048cf9da8bf2a976a76:timer','i:1785752572;',1785752572),('mvm-logistic-cache-f6e1126cedebf23e1463aee73f9df08783640400','i:1;',1785752913),('mvm-logistic-cache-f6e1126cedebf23e1463aee73f9df08783640400:timer','i:1785752913;',1785752913),('mvm-logistic-cache-f7c4cc92445e5ef64dbf9bf0c7a0d9ff7b8e4bf6','i:2;',1785466244),('mvm-logistic-cache-f7c4cc92445e5ef64dbf9bf0c7a0d9ff7b8e4bf6:timer','i:1785466244;',1785466244),('mvm-logistic-cache-feature_flag:storefront_cart_enabled','b:0;',1785755966),('mvm-logistic-cache-general_settings','a:35:{s:10:\"store_name\";s:12:\"MVM Logistic\";s:13:\"support_email\";s:16:\"logistic@mvm.com\";s:13:\"support_phone\";s:13:\"+855317669555\";s:8:\"currency\";s:3:\"USD\";s:13:\"store_address\";s:77:\"Lou Village, Svay Pak Commune, Russey Keo District, House No. 24B, Street 101\";s:10:\"store_logo\";s:9:\"/logo.png\";s:13:\"store_favicon\";s:12:\"/favicon.png\";s:16:\"default_currency\";s:3:\"USD\";s:11:\"about_title\";s:17:\"About our company\";s:10:\"about_text\";s:1084:\"At MVM Logistics, we specialize in helping customers order products and deliver goods safely and efficiently between Vietnam and Cambodia. Whether you need assistance purchasing products, creating a manual order, or arranging cross-border shipping, our team provides reliable support every step of the way.\n\nOur website makes it easy to submit an order request, track deliveries, and communicate with our logistics team. Customers can also contact us directly for personalized assistance with sourcing products, transportation, customs coordination, and delivery arrangements.\n\nWe operate two warehouses to ensure faster processing and smoother logistics operations: one warehouse in Vietnam and one warehouse in Cambodia. This allows us to manage shipments efficiently in both directions, from Vietnam to Cambodia and Cambodia to Vietnam.\n\nAt MVM Logistics, our goal is to provide a simple, transparent, and dependable logistics experience—from your first request to your final doorstep delivery. Please view our Vietnam and Cambodia warehouse locations below for more information.\";s:13:\"social_1_name\";s:8:\"Telegram\";s:12:\"social_1_url\";s:0:\"\";s:13:\"social_1_icon\";s:13:\"MessageCircle\";s:13:\"social_2_name\";s:8:\"Facebook\";s:12:\"social_2_url\";s:0:\"\";s:13:\"social_2_icon\";s:8:\"Facebook\";s:13:\"social_3_name\";s:9:\"Instagram\";s:12:\"social_3_url\";s:0:\"\";s:13:\"social_3_icon\";s:9:\"Instagram\";s:13:\"social_4_name\";s:6:\"TikTok\";s:12:\"social_4_url\";s:0:\"\";s:13:\"social_4_icon\";s:5:\"Music\";s:16:\"home_banner_mode\";s:9:\"slideshow\";s:12:\"social_links\";s:606:\"[{\"name\":\"Telegram\",\"url\":null,\"icon\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/512\\/3488\\/3488463.png\"},{\"name\":\"Facebook\",\"url\":null,\"icon\":\"https:\\/\\/static.vecteezy.com\\/system\\/resources\\/previews\\/016\\/716\\/481\\/non_2x\\/facebook-icon-free-png.png\"},{\"name\":\"Instagram\",\"url\":null,\"icon\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/256\\/4782\\/4782335.png\"},{\"name\":\"TikTok\",\"url\":null,\"icon\":\"https:\\/\\/static.vecteezy.com\\/system\\/resources\\/thumbnails\\/016\\/716\\/450\\/small\\/tiktok-icon-free-png.png\"},{\"name\":\"Zalo\",\"url\":null,\"icon\":\"https:\\/\\/hidosport.vn\\/wp-content\\/uploads\\/2023\\/09\\/zalo-icon.png\"}]\";s:9:\"fab_email\";s:24:\"mvmlogistic555@gmail.com\";s:9:\"fab_phone\";s:13:\"+855317669555\";s:13:\"fab_messenger\";s:24:\"https://www.youtube.com/\";s:12:\"fab_telegram\";s:24:\"https://www.youtube.com/\";s:22:\"cambodia_map_embed_url\";s:75:\"https://maps.google.com/maps?q=loc:11.6441475,104.9126435&z=17&output=embed\";s:21:\"cambodia_map_open_url\";s:49:\"https://maps.app.goo.gl/22Bb8oBFDhVxrosV8?g_st=ic\";s:20:\"cambodia_map_address\";s:77:\"Lou Village, Svay Pak Commune, Russey Keo District, House No. 24B, Street 101\";s:21:\"vietnam_map_embed_url\";s:73:\"https://maps.google.com/maps?q=loc:11.076760,106.173980&z=17&output=embed\";s:20:\"vietnam_map_open_url\";s:49:\"https://maps.app.goo.gl/aPY4XLhLnp1XYfKP9?g_st=ic\";s:19:\"vietnam_map_address\";s:111:\"75A Ấp Thuận Tây, Xã Bến Cầu,Tỉnh Tây Ninh, Ap Ben Cau, Vietnam, 842980 ... TayNinh #, GC DutyFree\";s:9:\"fab_links\";s:870:\"[{\"id\":\"ik2yxk5\",\"name\":\"Email\",\"url\":\"mailto:latoureiffel1802@gmail.com\",\"icon_url\":\"https:\\/\\/encrypted-tbn0.gstatic.com\\/images?q=tbn:ANd9GcShAwfImEJMk4uK6o_KsyIuPvGyXqKAHMhdphZS4lrSSYzGCy8qocMKtYU&s=10\"},{\"id\":\"3jil4hi\",\"name\":\"Phone\",\"url\":\"tel:+85593843699\",\"icon_url\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/512\\/9946\\/9946341.png\"},{\"id\":\"ola7m7z\",\"name\":\"Messenger\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/www.iconpacks.net\\/icons\\/2\\/free-facebook-messenger-icon-2881-thumb.png\"},{\"id\":\"ssgxnzu\",\"name\":\"Telegram\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/commons\\/thumb\\/8\\/82\\/Telegram_logo.svg\\/960px-Telegram_logo.svg.png?_=20220101141644\"},{\"id\":\"zz281ea\",\"name\":\"Zalo\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/hidosport.vn\\/wp-content\\/uploads\\/2023\\/09\\/zalo-icon.png\"}]\";}',1785755966),('mvm-logistic-cache-global_nav','a:5:{s:10:\"categories\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:7:{i:0;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:3:\"Men\";s:4:\"slug\";s:3:\"men\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:3:\"Men\";s:4:\"slug\";s:3:\"men\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Women\";s:4:\"slug\";s:5:\"women\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Women\";s:4:\"slug\";s:5:\"women\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:3;s:4:\"name\";s:4:\"Kids\";s:4:\"slug\";s:4:\"kids\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:3;s:4:\"name\";s:4:\"Kids\";s:4:\"slug\";s:4:\"kids\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:3;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:4;s:4:\"name\";s:5:\"Shoes\";s:4:\"slug\";s:5:\"shoes\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:4;s:4:\"name\";s:5:\"Shoes\";s:4:\"slug\";s:5:\"shoes\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:4;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:5;s:4:\"name\";s:11:\"Accessories\";s:4:\"slug\";s:11:\"accessories\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:5;s:4:\"name\";s:11:\"Accessories\";s:4:\"slug\";s:11:\"accessories\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:5;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Beauty\";s:4:\"slug\";s:6:\"beauty\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Beauty\";s:4:\"slug\";s:6:\"beauty\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:6;O:19:\"App\\Models\\Category\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"categories\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:7;s:4:\"name\";s:11:\"Electronics\";s:4:\"slug\";s:11:\"electronics\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:7;s:4:\"name\";s:11:\"Electronics\";s:4:\"slug\";s:11:\"electronics\";s:5:\"image\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";s:9:\"parent_id\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:1:{s:9:\"is_active\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:6:{i:0;s:4:\"name\";i:1;s:4:\"slug\";i:2;s:5:\"image\";i:3;s:9:\"parent_id\";i:4;s:11:\"description\";i:5;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:6:\"brands\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:6:{i:0;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:9:\"Northline\";s:4:\"slug\";s:9:\"northline\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:9:\"Northline\";s:4:\"slug\";s:9:\"northline\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:1;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:2;s:4:\"name\";s:7:\"Veloura\";s:4:\"slug\";s:7:\"veloura\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:2;s:4:\"name\";s:7:\"Veloura\";s:4:\"slug\";s:7:\"veloura\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:2;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:3;s:4:\"name\";s:5:\"Kroma\";s:4:\"slug\";s:5:\"kroma\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:3;s:4:\"name\";s:5:\"Kroma\";s:4:\"slug\";s:5:\"kroma\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:3;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:4;s:4:\"name\";s:10:\"Urban Step\";s:4:\"slug\";s:10:\"urban-step\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:4;s:4:\"name\";s:10:\"Urban Step\";s:4:\"slug\";s:10:\"urban-step\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:4;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:5;s:4:\"name\";s:8:\"Lumière\";s:4:\"slug\";s:7:\"lumiere\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:5;s:4:\"name\";s:8:\"Lumière\";s:4:\"slug\";s:7:\"lumiere\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:5;O:16:\"App\\Models\\Brand\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"brands\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:6;s:4:\"name\";s:8:\"NovaTech\";s:4:\"slug\";s:8:\"novatech\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:6;s:4:\"name\";s:8:\"NovaTech\";s:4:\"slug\";s:8:\"novatech\";s:4:\"logo\";N;s:11:\"description\";N;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:11:\"collections\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:6:{i:0;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:1;s:4:\"name\";s:12:\"New Arrivals\";s:4:\"slug\";s:12:\"new-arrivals\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:1;s:4:\"name\";s:12:\"New Arrivals\";s:4:\"slug\";s:12:\"new-arrivals\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:1;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:2;s:4:\"name\";s:17:\"Summer Essentials\";s:4:\"slug\";s:17:\"summer-essentials\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:2;s:4:\"name\";s:17:\"Summer Essentials\";s:4:\"slug\";s:17:\"summer-essentials\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:2;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:3;s:4:\"name\";s:13:\"Weekend Style\";s:4:\"slug\";s:13:\"weekend-style\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:3;s:4:\"name\";s:13:\"Weekend Style\";s:4:\"slug\";s:13:\"weekend-style\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:3;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:4;s:4:\"name\";s:11:\"Office Edit\";s:4:\"slug\";s:11:\"office-edit\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:4;s:4:\"name\";s:11:\"Office Edit\";s:4:\"slug\";s:11:\"office-edit\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:4;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:5;s:4:\"name\";s:12:\"Best Sellers\";s:4:\"slug\";s:12:\"best-sellers\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:5;s:4:\"name\";s:12:\"Best Sellers\";s:4:\"slug\";s:12:\"best-sellers\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:5;O:21:\"App\\Models\\Collection\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:11:\"collections\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:8:{s:2:\"id\";i:6;s:4:\"name\";s:10:\"Flash Sale\";s:4:\"slug\";s:10:\"flash-sale\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:11:\"\0*\0original\";a:8:{s:2:\"id\";i:6;s:4:\"name\";s:10:\"Flash Sale\";s:4:\"slug\";s:10:\"flash-sale\";s:5:\"image\";N;s:11:\"description\";N;s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-19 01:43:35\";s:10:\"updated_at\";s:19:\"2026-07-19 01:43:35\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:5:\"menus\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:1:{i:0;O:15:\"App\\Models\\Menu\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"menus\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:9:\"Main menu\";s:6:\"handle\";s:8:\"main_nav\";s:8:\"location\";s:6:\"header\";s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-21 11:53:54\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:11:\"\0*\0original\";a:7:{s:2:\"id\";i:1;s:4:\"name\";s:9:\"Main menu\";s:6:\"handle\";s:8:\"main_nav\";s:8:\"location\";s:6:\"header\";s:9:\"is_active\";i:1;s:10:\"created_at\";s:19:\"2026-07-21 11:53:54\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:5:\"items\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:3:{i:0;O:19:\"App\\Models\\MenuItem\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"menu_items\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:10:{s:2:\"id\";i:6;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:4:\"Home\";s:3:\"url\";s:1:\"/\";s:4:\"icon\";N;s:5:\"order\";i:1;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:11:\"\0*\0original\";a:10:{s:2:\"id\";i:6;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:4:\"Home\";s:3:\"url\";s:1:\"/\";s:4:\"icon\";N;s:5:\"order\";i:1;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:7:\"menu_id\";i:1;s:9:\"parent_id\";i:2;s:5:\"label\";i:3;s:3:\"url\";i:4;s:4:\"icon\";i:5;s:5:\"order\";i:6;s:7:\"new_tab\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:19:\"App\\Models\\MenuItem\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"menu_items\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:10:{s:2:\"id\";i:7;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:5:\"Blogs\";s:3:\"url\";s:5:\"/blog\";s:4:\"icon\";N;s:5:\"order\";i:2;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:11:\"\0*\0original\";a:10:{s:2:\"id\";i:7;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:5:\"Blogs\";s:3:\"url\";s:5:\"/blog\";s:4:\"icon\";N;s:5:\"order\";i:2;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:7:\"menu_id\";i:1;s:9:\"parent_id\";i:2;s:5:\"label\";i:3;s:3:\"url\";i:4;s:4:\"icon\";i:5;s:5:\"order\";i:6;s:7:\"new_tab\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:19:\"App\\Models\\MenuItem\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"menu_items\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:10:{s:2:\"id\";i:8;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:7:\"Contact\";s:3:\"url\";s:8:\"/contact\";s:4:\"icon\";N;s:5:\"order\";i:3;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:11:\"\0*\0original\";a:10:{s:2:\"id\";i:8;s:7:\"menu_id\";i:1;s:9:\"parent_id\";N;s:5:\"label\";s:7:\"Contact\";s:3:\"url\";s:8:\"/contact\";s:4:\"icon\";N;s:5:\"order\";i:3;s:7:\"new_tab\";i:0;s:10:\"created_at\";s:19:\"2026-07-23 08:22:19\";s:10:\"updated_at\";s:19:\"2026-07-23 08:22:19\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:1:{s:8:\"children\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:7:\"menu_id\";i:1;s:9:\"parent_id\";i:2;s:5:\"label\";i:3;s:3:\"url\";i:4;s:4:\"icon\";i:5;s:5:\"order\";i:6;s:7:\"new_tab\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:4:{i:0;s:4:\"name\";i:1;s:6:\"handle\";i:2;s:8:\"location\";i:3;s:9:\"is_active\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:5:\"pages\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:3:{i:0;O:15:\"App\\Models\\Page\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"pages\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:2;s:5:\"title\";s:10:\"Contact Us\";s:4:\"slug\";s:10:\"contact-us\";s:9:\"is_system\";i:1;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:2;s:5:\"title\";s:10:\"Contact Us\";s:4:\"slug\";s:10:\"contact-us\";s:9:\"is_system\";i:1;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:5:{s:12:\"is_published\";s:7:\"boolean\";s:9:\"is_system\";s:7:\"boolean\";s:10:\"is_private\";s:7:\"boolean\";s:18:\"show_in_navigation\";s:7:\"boolean\";s:12:\"is_deletable\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:1;O:15:\"App\\Models\\Page\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"pages\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:3;s:5:\"title\";s:4:\"Home\";s:4:\"slug\";s:4:\"home\";s:9:\"is_system\";i:1;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:3;s:5:\"title\";s:4:\"Home\";s:4:\"slug\";s:4:\"home\";s:9:\"is_system\";i:1;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:5:{s:12:\"is_published\";s:7:\"boolean\";s:9:\"is_system\";s:7:\"boolean\";s:10:\"is_private\";s:7:\"boolean\";s:18:\"show_in_navigation\";s:7:\"boolean\";s:12:\"is_deletable\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}i:2;O:15:\"App\\Models\\Page\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"pages\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:4;s:5:\"title\";s:4:\"Blog\";s:4:\"slug\";s:4:\"blog\";s:9:\"is_system\";i:1;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:4;s:5:\"title\";s:4:\"Blog\";s:4:\"slug\";s:4:\"blog\";s:9:\"is_system\";i:1;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:5:{s:12:\"is_published\";s:7:\"boolean\";s:9:\"is_system\";s:7:\"boolean\";s:10:\"is_private\";s:7:\"boolean\";s:18:\"show_in_navigation\";s:7:\"boolean\";s:12:\"is_deletable\";s:7:\"boolean\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:0:{}s:10:\"\0*\0guarded\";a:0:{}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}',1785755966),('mvm-logistic-cache-seo_settings','a:5:{s:10:\"meta_title\";s:5:\"Rafel\";s:16:\"meta_description\";s:20:\"Welcome to our store\";s:13:\"meta_keywords\";s:22:\"ecommerce, store, shop\";s:8:\"og_image\";N;s:14:\"twitter_handle\";s:6:\"@store\";}',1785755966);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `product_variant_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  KEY `carts_session_id_index` (`session_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Men','men',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(2,'Women','women',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(3,'Kids','kids',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(4,'Shoes','shoes',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(5,'Accessories','accessories',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(6,'Beauty','beauty',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL),(7,'Electronics','electronics',NULL,'2026-07-18 18:43:35','2026-07-18 18:43:35',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_login_attempts`
--

DROP TABLE IF EXISTS `cms_login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_login_attempts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email_hash` varchar(64) DEFAULT NULL,
  `masked_email` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `device_hash` varchar(64) DEFAULT NULL,
  `user_agent_summary` varchar(255) DEFAULT NULL,
  `failure_category` varchar(255) NOT NULL DEFAULT 'invalid_credentials',
  `attempted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cms_login_attempts_email_hash_index` (`email_hash`),
  KEY `cms_login_attempts_ip_address_index` (`ip_address`),
  KEY `cms_login_attempts_device_hash_index` (`device_hash`),
  KEY `cms_login_attempts_attempted_at_index` (`attempted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_login_attempts`
--

LOCK TABLES `cms_login_attempts` WRITE;
/*!40000 ALTER TABLE `cms_login_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_security_blocks`
--

DROP TABLE IF EXISTS `cms_security_blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_security_blocks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email_hash` varchar(64) DEFAULT NULL,
  `masked_email` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `device_hash` varchar(64) DEFAULT NULL,
  `reason` varchar(255) NOT NULL DEFAULT 'failed_login_threshold',
  `internal_note` text DEFAULT NULL,
  `starts_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL,
  `released_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `released_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cms_security_blocks_created_by_foreign` (`created_by`),
  KEY `cms_security_blocks_released_by_foreign` (`released_by`),
  KEY `cms_security_blocks_email_hash_index` (`email_hash`),
  KEY `cms_security_blocks_ip_address_index` (`ip_address`),
  KEY `cms_security_blocks_device_hash_index` (`device_hash`),
  KEY `cms_security_blocks_expires_at_index` (`expires_at`),
  KEY `cms_security_blocks_released_at_index` (`released_at`),
  CONSTRAINT `cms_security_blocks_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cms_security_blocks_released_by_foreign` FOREIGN KEY (`released_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_security_blocks`
--

LOCK TABLES `cms_security_blocks` WRITE;
/*!40000 ALTER TABLE `cms_security_blocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cms_security_blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `collections_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
INSERT INTO `collections` VALUES (1,'New Arrivals','new-arrivals',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(2,'Summer Essentials','summer-essentials',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(3,'Weekend Style','weekend-style',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(4,'Office Edit','office-edit',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(5,'Best Sellers','best-sellers',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(6,'Flash Sale','flash-sale',NULL,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35');
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `customer_code` varchar(255) DEFAULT NULL,
  `order_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `preferred_contact_method` varchar(255) DEFAULT NULL,
  `attachment_disk` varchar(255) DEFAULT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `attachment_original_filename` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `assigned_to` bigint(20) unsigned DEFAULT NULL,
  `internal_notes` text DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_messages_user_id_foreign` (`user_id`),
  KEY `contact_messages_assigned_to_foreign` (`assigned_to`),
  KEY `contact_messages_is_demo_index` (`is_demo`),
  KEY `contact_messages_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `contact_messages_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contact_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (5,15,'CUS-TEST-KH-0001','ORD-TEST-KH-0001','Sokha Test Customer','sokha.customer@example.test','+85512345678','Demo order support question','Can you confirm the backpack color before purchase?','telegram',NULL,NULL,NULL,'open',18,'Demo contact message assigned to logistics admin.',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(6,16,'CUS-TEST-VN-0002','ORD-TEST-VN-0002','Nguyen An Test Customer','nguyen.customer@example.test','+84912345678','Demo delayed shipment question','Please update me when the supplier ships the speaker.','telegram',NULL,NULL,NULL,'new',18,'Demo contact message for delayed order.',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_settings`
--

DROP TABLE IF EXISTS `content_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL,
  `value_type` varchar(255) NOT NULL DEFAULT 'text',
  `locale` varchar(255) NOT NULL DEFAULT 'en',
  `is_public` tinyint(1) NOT NULL DEFAULT 1,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_settings_group_key_locale_unique` (`group`,`key`,`locale`),
  KEY `content_settings_updated_by_foreign` (`updated_by`),
  CONSTRAINT `content_settings_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_settings`
--

LOCK TABLES `content_settings` WRITE;
/*!40000 ALTER TABLE `content_settings` DISABLE KEYS */;
INSERT INTO `content_settings` VALUES (1,'order_messages','request_quote_page_title','Create Manual Order','text','en',1,NULL,'2026-07-23 02:24:28','2026-07-23 02:24:28'),(2,'order_messages','submit_button_text','Submit Manual Order','text','en',1,NULL,'2026-07-23 02:24:28','2026-07-23 02:24:28');
/*!40000 ALTER TABLE `content_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `min_cart_value` decimal(10,2) DEFAULT NULL,
  `starts_at` date DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_verifications`
--

DROP TABLE IF EXISTS `email_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_verifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `new_email` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_verifications_user_id_foreign` (`user_id`),
  CONSTRAINT `email_verifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verifications`
--

LOCK TABLES `email_verifications` WRITE;
/*!40000 ALTER TABLE `email_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature_flags`
--

DROP TABLE IF EXISTS `feature_flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feature_flags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `value` tinyint(1) NOT NULL DEFAULT 0,
  `is_admin_editable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `feature_flags_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_flags`
--

LOCK TABLES `feature_flags` WRITE;
/*!40000 ALTER TABLE `feature_flags` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature_flags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_page_sections`
--

DROP TABLE IF EXISTS `home_page_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_page_sections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_page_sections`
--

LOCK TABLES `home_page_sections` WRITE;
/*!40000 ALTER TABLE `home_page_sections` DISABLE KEYS */;
INSERT INTO `home_page_sections` VALUES (1,'hero','Spring Collection 2026','Elevate Your Everyday Style','{\"discount\":\"Up to 40% Off\",\"button_text\":\"Shop Now\",\"link\":\"\\/shop\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1441986300917-64674bd600d8?w=1600&q=80\",\"media_url\":\"\\/storage\\/banners\\/LVJJNxII92TcbRvhOqvTVcaus6EF2rwo1inQp2yH.jpg\",\"media_type\":\"image\",\"media_source\":\"upload\",\"button_link\":\"\\/shop\"}',1,1,'2026-07-18 18:43:35','2026-07-21 00:55:46'),(2,'featured_categories','Shop by Category','Explore our wide range of premium collections','[]',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(3,'new_arrivals','New Arrivals','Discover the latest additions to our store','{\"product_ids\":[22,6,11,26,20,7,14,4]}',3,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(4,'shop_by_gender',NULL,NULL,'{\"men\":\"https:\\/\\/images.unsplash.com\\/photo-1516826957135-7331811a5ebf?w=800&q=80\",\"women\":\"https:\\/\\/images.unsplash.com\\/photo-1483985988355-763728e1935b?w=800&q=80\",\"kids\":\"https:\\/\\/images.unsplash.com\\/photo-1519241047957-be31d7379a5d?w=800&q=80\"}',4,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(5,'promo_split',NULL,NULL,'{\"left\":{\"title\":\"Summer Sale\",\"subtitle\":\"Up to 50% Off\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1523381210434-271e8be1f52b?w=800&q=80\"},\"right\":{\"title\":\"Accessories\",\"subtitle\":\"Complete your look\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1492707892479-7bc8d5a4ee93?w=800&q=80\"}}',5,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(6,'popular_tabs','Popular Right Now','Trending styles across all categories',NULL,6,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(7,'flash_sale','Deal of the Day','Hurry, offers end soon!','{\"end_time\":\"2026-07-21T01:43:35+00:00\",\"product_ids\":[28,18,13,12]}',7,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(8,'featured_collection','The Office Edit','Professional essentials for the modern workplace','{\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1487222477894-8943e31ef7b2?w=1200&q=80\",\"product_ids\":[2,15,16,17]}',8,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(9,'lookbook','Get The Look','Styled by our experts','{\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1469334031218-e382a71b716b?w=1600&q=80\",\"product_ids\":[10,8]}',9,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(10,'best_sellers','Best Sellers','Our most loved items','{\"product_ids\":[29,1,3,30,25,5,24,27]}',10,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(11,'trending','Trending Now',NULL,NULL,11,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(12,'recommended','Recommended For You',NULL,NULL,12,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(13,'brands','Our Trusted Brands',NULL,NULL,13,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(14,'seasonal_promo',NULL,NULL,'{\"title\":\"Mid-Season Clearance\",\"subtitle\":\"Extra 20% off sale items\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1445205170230-053b83016050?w=1600&q=80\"}',14,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(15,'customer_favorites','Customer Favorites',NULL,NULL,15,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(16,'limited_stock','Almost Gone','Grab them before they sell out',NULL,16,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(17,'benefits',NULL,NULL,NULL,17,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(18,'testimonials','What Our Customers Say',NULL,NULL,18,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(19,'blog_posts','From The Journal',NULL,NULL,19,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(20,'newsletter',NULL,NULL,NULL,20,1,'2026-07-18 18:43:35','2026-07-18 18:43:35');
/*!40000 ALTER TABLE `home_page_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'default','{\"uuid\":\"94e27a76-a5d0-4894-8913-951e293007bb\",\"displayName\":\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":17:{s:5:\\\"event\\\";O:60:\\\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\\\":3:{s:10:\\\"notifiable\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:41:\\\"App\\\\Notifications\\\\AdminSystemNotification\\\":4:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";s:2:\\\"id\\\";s:36:\\\"573969d5-c0c7-43ec-8de5-87f26367969b\\\";}s:4:\\\"data\\\";a:3:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:23:\\\"deleteWhenMissingModels\\\";b:1;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\",\"batchId\":null},\"createdAt\":1785374709,\"delay\":null}',0,NULL,1785374709,1785374709),(2,'default','{\"uuid\":\"ca6f9604-c885-4144-9476-a1ca5e1bc7b1\",\"displayName\":\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":17:{s:5:\\\"event\\\";O:60:\\\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\\\":3:{s:10:\\\"notifiable\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:17;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:41:\\\"App\\\\Notifications\\\\AdminSystemNotification\\\":4:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";s:2:\\\"id\\\";s:36:\\\"87879863-b1d2-4c6e-b3f1-119d34fc1525\\\";}s:4:\\\"data\\\";a:3:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:23:\\\"deleteWhenMissingModels\\\";b:1;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\",\"batchId\":null},\"createdAt\":1785374709,\"delay\":null}',0,NULL,1785374709,1785374709),(3,'default','{\"uuid\":\"f1b1ed3a-01f2-43dd-b968-513654c0fefc\",\"displayName\":\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":17:{s:5:\\\"event\\\";O:60:\\\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\\\":3:{s:10:\\\"notifiable\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:18;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:41:\\\"App\\\\Notifications\\\\AdminSystemNotification\\\":4:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";s:2:\\\"id\\\";s:36:\\\"3374cf9b-768d-4914-9ef1-2bee2ac40a1b\\\";}s:4:\\\"data\\\";a:3:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:23:\\\"deleteWhenMissingModels\\\";b:1;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\",\"batchId\":null},\"createdAt\":1785374709,\"delay\":null}',0,NULL,1785374709,1785374709),(4,'default','{\"uuid\":\"df9ba320-eff9-428a-89a1-f173a725b53e\",\"displayName\":\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":17:{s:5:\\\"event\\\";O:60:\\\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\\\":3:{s:10:\\\"notifiable\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:23;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:41:\\\"App\\\\Notifications\\\\AdminSystemNotification\\\":4:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";s:2:\\\"id\\\";s:36:\\\"9bf187b2-0837-4bac-9af2-c158a09ac314\\\";}s:4:\\\"data\\\";a:3:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:23:\\\"deleteWhenMissingModels\\\";b:1;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\",\"batchId\":null},\"createdAt\":1785374709,\"delay\":null}',0,NULL,1785374709,1785374709),(5,'default','{\"uuid\":\"9e1e6265-feff-4f78-8e38-86ce2104c69f\",\"displayName\":\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":17:{s:5:\\\"event\\\";O:60:\\\"Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated\\\":3:{s:10:\\\"notifiable\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:24;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:41:\\\"App\\\\Notifications\\\\AdminSystemNotification\\\":4:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";s:2:\\\"id\\\";s:36:\\\"0a064c2c-6ae4-416c-898d-e7c7d6ee5be5\\\";}s:4:\\\"data\\\";a:3:{s:7:\\\"message\\\";s:84:\\\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\\\";s:4:\\\"type\\\";s:7:\\\"comment\\\";s:3:\\\"url\\\";s:23:\\\"\\/admin\\/posts\\/7\\/comments\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:23:\\\"deleteWhenMissingModels\\\";b:1;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:12:\\\"messageGroup\\\";N;s:12:\\\"deduplicator\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\",\"batchId\":null},\"createdAt\":1785374709,\"delay\":null}',0,NULL,1785374709,1785374709);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_order_files`
--

DROP TABLE IF EXISTS `manual_order_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_order_files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `manual_order_id` bigint(20) unsigned NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manual_order_files_manual_order_id_foreign` (`manual_order_id`),
  CONSTRAINT `manual_order_files_manual_order_id_foreign` FOREIGN KEY (`manual_order_id`) REFERENCES `manual_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_order_files`
--

LOCK TABLES `manual_order_files` WRITE;
/*!40000 ALTER TABLE `manual_order_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual_order_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_order_items`
--

DROP TABLE IF EXISTS `manual_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `manual_order_id` bigint(20) unsigned NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manual_order_items_manual_order_id_foreign` (`manual_order_id`),
  CONSTRAINT `manual_order_items_manual_order_id_foreign` FOREIGN KEY (`manual_order_id`) REFERENCES `manual_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_order_items`
--

LOCK TABLES `manual_order_items` WRITE;
/*!40000 ALTER TABLE `manual_order_items` DISABLE KEYS */;
INSERT INTO `manual_order_items` VALUES (1,1,'Test Product 1',3,12.50,148.99,'2026-07-29 01:09:47','2026-07-29 01:09:47'),(2,2,'Test Product 2',3,34.50,23.99,'2026-07-29 01:09:47','2026-07-29 01:09:47'),(3,3,'Test Product 3',3,28.50,89.99,'2026-07-29 01:09:47','2026-07-29 01:09:47'),(4,4,'Test Product 4',1,48.50,65.99,'2026-07-29 01:09:47','2026-07-29 01:09:47'),(5,5,'Test Product 5',2,47.50,111.99,'2026-07-29 01:09:47','2026-07-29 01:09:47'),(6,7,'Test Product 1',2,41.50,77.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(7,8,'Test Product 2',2,41.50,122.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(8,9,'Test Product 3',1,14.50,108.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(9,10,'Test Product 4',1,38.50,44.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(10,11,'Test Product 5',1,12.50,69.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(11,12,'Test Product 1',1,12.50,148.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(12,13,'Test Product 2',2,34.50,65.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(13,14,'Test Product 3',2,21.50,67.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(14,15,'Test Product 4',3,31.50,78.99,'2026-07-29 01:10:11','2026-07-29 01:10:11'),(15,16,'Test Product 5',1,13.50,150.99,'2026-07-29 01:10:11','2026-07-29 01:10:11');
/*!40000 ALTER TABLE `manual_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_orders`
--

DROP TABLE IF EXISTS `manual_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `order_number` varchar(255) NOT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `receipt_number` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `payment_status` varchar(255) NOT NULL DEFAULT 'unpaid',
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `budget` decimal(12,2) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `manual_orders_order_number_unique` (`order_number`),
  UNIQUE KEY `manual_orders_invoice_number_unique` (`invoice_number`),
  UNIQUE KEY `manual_orders_receipt_number_unique` (`receipt_number`),
  KEY `manual_orders_user_id_foreign` (`user_id`),
  KEY `manual_orders_created_by_foreign` (`created_by`),
  CONSTRAINT `manual_orders_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `manual_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_orders`
--

LOCK TABLES `manual_orders` WRITE;
/*!40000 ALTER TABLE `manual_orders` DISABLE KEYS */;
INSERT INTO `manual_orders` VALUES (1,2,'MVM-ORD-016',NULL,NULL,'pending','unpaid',470.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:09:47','2026-07-29 01:24:03',NULL),(2,2,'MVM-ORD-017',NULL,NULL,'processing','partial',50.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:09:47','2026-07-29 01:24:03',NULL),(3,2,'MVM-ORD-018',NULL,NULL,'packed','paid',332.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:09:47','2026-07-29 01:24:03',NULL),(4,2,'MVM-ORD-019',NULL,NULL,'shipping','refunded',482.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:09:47','2026-07-29 01:24:03',NULL),(5,2,'MVM-ORD-020',NULL,NULL,'delivered','paid',241.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:09:47','2026-07-29 01:24:03',NULL),(7,2,'MVM-ORD-021',NULL,NULL,'pending','unpaid',367.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(8,2,'MVM-ORD-022',NULL,NULL,'processing','partial',161.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(9,2,'MVM-ORD-023',NULL,NULL,'packed','paid',67.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(10,2,'MVM-ORD-024',NULL,NULL,'shipping','refunded',408.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(11,2,'MVM-ORD-025',NULL,NULL,'delivered','paid',448.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(12,2,'MVM-ORD-026',NULL,NULL,'pending','unpaid',363.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(13,2,'MVM-ORD-027',NULL,NULL,'processing','partial',441.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(14,2,'MVM-ORD-028',NULL,NULL,'packed','paid',144.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(15,2,'MVM-ORD-029',NULL,NULL,'shipping','refunded',386.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL),(16,2,'MVM-ORD-030',NULL,NULL,'delivered','paid',386.99,NULL,NULL,NULL,NULL,NULL,'2026-07-29 01:10:11','2026-07-29 01:24:03',NULL);
/*!40000 ALTER TABLE `manual_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketplace_domains`
--

DROP TABLE IF EXISTS `marketplace_domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketplace_domains` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `marketplace_id` bigint(20) unsigned NOT NULL,
  `domain` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `marketplace_domains_domain_unique` (`domain`),
  KEY `marketplace_domains_marketplace_id_foreign` (`marketplace_id`),
  CONSTRAINT `marketplace_domains_marketplace_id_foreign` FOREIGN KEY (`marketplace_id`) REFERENCES `marketplaces` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketplace_domains`
--

LOCK TABLES `marketplace_domains` WRITE;
/*!40000 ALTER TABLE `marketplace_domains` DISABLE KEYS */;
/*!40000 ALTER TABLE `marketplace_domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketplaces`
--

DROP TABLE IF EXISTS `marketplaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketplaces` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `icon_source_url` varchar(255) DEFAULT NULL,
  `icon_path` varchar(255) DEFAULT NULL,
  `name_vi` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_km` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `brand_color` varchar(7) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `android_app_url` varchar(255) DEFAULT NULL,
  `ios_app_url` varchar(255) DEFAULT NULL,
  `universal_link` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `open_in_new_tab` tinyint(1) NOT NULL DEFAULT 1,
  `import_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `manual_fallback_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `maintenance_message` text DEFAULT NULL,
  `supported_countries` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`supported_countries`)),
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `cache_lifetime_minutes` int(11) NOT NULL DEFAULT 60,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `marketplaces_slug_unique` (`slug`),
  KEY `marketplaces_created_by_foreign` (`created_by`),
  KEY `marketplaces_updated_by_foreign` (`updated_by`),
  CONSTRAINT `marketplaces_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `marketplaces_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketplaces`
--

LOCK TABLES `marketplaces` WRITE;
/*!40000 ALTER TABLE `marketplaces` DISABLE KEYS */;
INSERT INTO `marketplaces` VALUES (1,'TIKI',NULL,'https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png',NULL,NULL,NULL,NULL,'tiki',NULL,NULL,'https://tiki.vn/',NULL,NULL,NULL,NULL,1,1,0,1,'active',NULL,NULL,1,NULL,NULL,NULL,NULL,60,'2026-07-28 08:46:56','2026-07-28 08:46:56',NULL),(2,'Mua Thông Minh',NULL,'https://resource.metric.vn/assets/0d53976b-7e9b-4045-9d8d-9559f9d4ecd2',NULL,NULL,NULL,NULL,'mua-thong-minh',NULL,NULL,'https://muathongminh.vn/',NULL,NULL,NULL,NULL,1,1,0,1,'active',NULL,NULL,2,NULL,NULL,NULL,NULL,60,'2026-07-28 08:46:56','2026-07-28 08:46:56',NULL),(3,'MUJI',NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSujdzjCRtX-3gCRLRTej3mfPsfoR-fMG1jFyTBalG5aVnw3jK5a1f2NQ4&s=10',NULL,NULL,NULL,NULL,'muji',NULL,NULL,'https://www.muji.com.vn/vn',NULL,NULL,NULL,NULL,1,1,0,1,'active',NULL,NULL,3,NULL,NULL,NULL,NULL,60,'2026-07-28 08:46:56','2026-07-28 08:46:56',NULL),(4,'UNIQLO',NULL,'https://photos.prnewswire.com/prnfull/20160805/396025LOGO',NULL,NULL,NULL,NULL,'uniqlo',NULL,NULL,'https://www.uniqlo.com/vn/vi/',NULL,NULL,NULL,NULL,1,1,0,1,'active',NULL,NULL,4,NULL,NULL,NULL,NULL,60,'2026-07-28 08:46:56','2026-07-28 08:46:56',NULL),(5,'SHEIN',NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyzgEqyG-zkkCw95zL9D8M6auDLlSIc4SZmTQp9zyEBzmglZj3t-S-lJt&s=10',NULL,NULL,NULL,NULL,'shein',NULL,NULL,'https://www.shein.com.vn/',NULL,NULL,NULL,NULL,1,1,0,1,'active',NULL,NULL,5,NULL,NULL,NULL,NULL,60,'2026-07-28 08:46:56','2026-07-28 08:46:56',NULL);
/*!40000 ALTER TABLE `marketplaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `size` bigint(20) unsigned NOT NULL,
  `path` varchar(255) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_user_id_foreign` (`user_id`),
  KEY `media_is_demo_index` (`is_demo`),
  KEY `media_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `media_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (37,'Running shoes demo product','N1mLr8KYjlPVsxs3JqEPSmmaK70f1IoxacE3DbCI.webp','image/webp',4162,'demo-order-images/N1mLr8KYjlPVsxs3JqEPSmmaK70f1IoxacE3DbCI.webp','Running shoes demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(38,'Travel backpack demo product','ouoy6XUnxAYr97UksX7fGoM9xR3R8WovhFVmRa5D.webp','image/webp',3548,'demo-order-images/ouoy6XUnxAYr97UksX7fGoM9xR3R8WovhFVmRa5D.webp','Travel backpack demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(39,'Mechanical keyboard demo product','g3FjqqGSA48aiBpJZ4sPreGk97vZsyniGZF5vIAo.webp','image/webp',3570,'demo-order-images/g3FjqqGSA48aiBpJZ4sPreGk97vZsyniGZF5vIAo.webp','Mechanical keyboard demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(40,'Water bottle demo product','79SPszFD1arb6KjOmq5ApRFOnBOdbwZZRj5MQvia.webp','image/webp',3838,'demo-order-images/79SPszFD1arb6KjOmq5ApRFOnBOdbwZZRj5MQvia.webp','Water bottle demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(41,'USB-C cable demo product','9wre1lIqLsndldPqUoxH3PS6TMtudb3bOC43mr6l.webp','image/webp',3596,'demo-order-images/9wre1lIqLsndldPqUoxH3PS6TMtudb3bOC43mr6l.webp','USB-C cable demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(42,'Bluetooth speaker demo product','AHR31orAdVzX8TMXxrP6jXE5FaYRe7hfOFft6yXP.webp','image/webp',3872,'demo-order-images/AHR31orAdVzX8TMXxrP6jXE5FaYRe7hfOFft6yXP.webp','Bluetooth speaker demo product',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(43,'Demo banner manual order','z8LfhHMC5SS7EjDPwlIMNo4j8OQ1K5oiYLshWtku.webp','image/webp',4586,'demo-banners/z8LfhHMC5SS7EjDPwlIMNo4j8OQ1K5oiYLshWtku.webp','Demo banner manual order',17,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(45,'Demo banner tracking','AHFcn57slP1sa9mgg4a76ikpOF0ssvWz9n0Lf2rB.webp','image/webp',4016,'demo-banners/AHFcn57slP1sa9mgg4a76ikpOF0ssvWz9n0Lf2rB.webp','Demo banner tracking',17,'2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(46,'Demo banner uploads','6mr71up5M3XIgsC4z8LxfBIp9h53Yfe8arh7UDxL.webp','image/webp',3840,'demo-banners/6mr71up5M3XIgsC4z8LxfBIp9h53Yfe8arh7UDxL.webp','Demo banner uploads',17,'2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(47,'Demo banner support','oyGQDE534U9SrMSGKeucFBLd4MDQa2HU169jl8sU.webp','image/webp',3754,'demo-banners/oyGQDE534U9SrMSGKeucFBLd4MDQa2HU169jl8sU.webp','Demo banner support',17,'2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(48,'Demo popup manual order','UijAJrDPFqXAxtBfjeeDOYL87tdIPEG9jgw0sdji.webp','image/webp',4442,'demo-banners/UijAJrDPFqXAxtBfjeeDOYL87tdIPEG9jgw0sdji.webp','Demo popup manual order',17,'2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(49,'Homepage Banner 1','homepage-1.png','image/png',2048947,'banners/homepage-1.png','Homepage logistics banner 1',NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(50,'Homepage Banner 2','homepage-2.png','image/png',1642251,'banners/homepage-2.png','Homepage logistics banner 2',NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(51,'Homepage Banner 3','homepage-3.png','image/png',1672806,'banners/homepage-3.png','Homepage logistics banner 3',NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL),(52,'Homepage Banner 4','homepage-4.png','image/png',2110964,'banners/homepage-4.png','Homepage logistics banner 4',NULL,'2026-07-23 09:00:45','2026-07-23 09:00:45',0,NULL);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` bigint(20) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `new_tab` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_items_menu_id_foreign` (`menu_id`),
  KEY `menu_items_parent_id_foreign` (`parent_id`),
  CONSTRAINT `menu_items_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_items_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (6,1,NULL,'Home','/',NULL,1,0,'2026-07-23 01:22:19','2026-07-23 01:22:19'),(7,1,NULL,'Blogs','/blog',NULL,2,0,'2026-07-23 01:22:19','2026-07-23 01:22:19'),(8,1,NULL,'Contact','/contact',NULL,3,0,'2026-07-23 01:22:19','2026-07-23 01:22:19');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menus_handle_unique` (`handle`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Main menu','main_nav','header',1,'2026-07-21 04:53:54','2026-07-23 01:22:19');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_07_18_000000_create_categories_table',1),(5,'2026_07_18_000001_create_products_table',1),(6,'2026_07_18_000002_create_carts_table',1),(7,'2026_07_18_000003_create_cart_items_table',1),(8,'2026_07_18_064558_add_is_admin_to_users_table',1),(9,'2026_07_18_064626_create_orders_table',1),(10,'2026_07_18_064644_create_order_items_table',1),(11,'2026_07_18_070025_create_brands_table',1),(12,'2026_07_18_070025_create_collections_table',1),(13,'2026_07_18_070025_create_coupons_table',1),(14,'2026_07_18_070025_create_home_page_sections_table',1),(15,'2026_07_18_070025_create_pages_table',1),(16,'2026_07_18_070025_create_posts_table',1),(17,'2026_07_18_070025_create_product_images_table',1),(18,'2026_07_18_070025_create_product_variants_table',1),(19,'2026_07_18_070025_create_settings_table',1),(20,'2026_07_18_070032_add_parent_id_to_categories_table',1),(21,'2026_07_18_070032_update_products_table_for_full_ecommerce',1),(22,'2026_07_18_070154_update_cart_items_and_order_items_tables',1),(23,'2026_07_18_075140_add_detailed_content_to_products_table',1),(24,'2026_07_18_161425_create_popups_table',1),(25,'2026_07_18_170000_add_google_auth_to_users_table',1),(26,'2026_07_18_170001_create_reviews_table',1),(27,'2026_07_19_000000_add_role_to_users_table',1),(28,'2026_07_20_084215_create_media_table',2),(29,'2026_07_20_084417_create_menus_table',3),(30,'2026_07_20_084418_create_menu_items_table',4),(31,'2026_07_20_090539_create_permission_tables',5),(32,'2026_07_20_100000_create_feature_flags_table',6),(33,'2026_07_20_100001_create_marketplaces_table',6),(34,'2026_07_20_100002_add_logistics_fields_to_users_table',6),(35,'2026_07_21_000001_add_seo_and_banner_to_pages_table',6),(36,'2026_07_21_103827_create_banners_table',7),(37,'2026_07_21_141110_add_system_fields_to_pages_table',8),(38,'2026_07_23_000000_update_users_for_logistics',9),(39,'2026_07_23_000001_update_orders_for_logistics',9),(40,'2026_07_23_000002_update_order_items_for_logistics',9),(41,'2026_07_23_000003_create_logistics_tables',9),(42,'2026_07_23_000004_add_address_fields_to_users_table',10),(43,'2026_07_23_000005_complete_quote_request_schema',11),(44,'2026_07_23_000006_manual_order_currency_locale_contact_messages',12),(45,'2026_07_23_000007_demo_flags_and_header_theme',13),(46,'2026_07_23_000008_usd_vnd_currency_cleanup',14),(47,'2026_07_23_000009_available_sites_and_order_status_cleanup',15),(48,'2026_07_23_000010_enhance_popup_ads',16),(49,'2026_07_23_000011_google_only_customer_auth',17),(50,'2026_07_23_000012_add_creative_size_to_popups',18),(51,'2026_07_23_000013_simplify_order_and_budget_statuses',19),(52,'2026_07_23_000014_add_scheduling_and_images_to_posts',19),(53,'2026_07_24_000001_add_customer_profile_onboarding_fields',20),(54,'2026_07_24_000002_create_cms_security_tables',20),(55,'2026_07_24_000003_create_post_categories_table',21),(56,'2026_07_24_000004_create_manual_orders_table',22),(57,'2026_07_24_000005_update_receipts_for_manual_orders',22),(58,'2026_07_25_074245_create_email_verifications_table',23),(59,'2026_07_26_000000_create_note_folders_table',24),(60,'2026_07_26_000001_create_notes_table',24),(61,'2026_07_28_000000_create_user_addresses_table',25),(62,'2026_07_29_043000_create_testimonials_table',26),(63,'2026_07_29_132400_create_post_comments_table',27),(64,'2026_07_29_140000_add_product_images_to_testimonials_table',28),(65,'2026_07_29_140001_add_video_fields_to_banners_table',28),(66,'2026_07_30_073200_add_admin_reply_to_post_comments_table',29),(67,'2026_07_30_073800_create_notifications_table',29);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(1,'App\\Models\\User',9),(1,'App\\Models\\User',13),(1,'App\\Models\\User',17),(2,'App\\Models\\User',10),(2,'App\\Models\\User',14),(2,'App\\Models\\User',18),(2,'App\\Models\\User',23),(2,'App\\Models\\User',24),(12,'App\\Models\\User',7),(12,'App\\Models\\User',8),(12,'App\\Models\\User',11),(12,'App\\Models\\User',12),(12,'App\\Models\\User',15),(12,'App\\Models\\User',16),(12,'App\\Models\\User',19),(12,'App\\Models\\User',20),(12,'App\\Models\\User',22),(13,'App\\Models\\User',24);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_folders`
--

DROP TABLE IF EXISTS `note_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note_folders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `note_folders_user_id_foreign` (`user_id`),
  CONSTRAINT `note_folders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_folders`
--

LOCK TABLES `note_folders` WRITE;
/*!40000 ALTER TABLE `note_folders` DISABLE KEYS */;
INSERT INTO `note_folders` VALUES (1,'test',NULL,'2026-07-30 00:56:56','2026-07-30 00:56:56');
/*!40000 ALTER TABLE `note_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `note_folder_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `is_trashed` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notes_note_folder_id_foreign` (`note_folder_id`),
  KEY `notes_user_id_foreign` (`user_id`),
  CONSTRAINT `notes_note_folder_id_foreign` FOREIGN KEY (`note_folder_id`) REFERENCES `note_folders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,NULL,'Untitled Notehfdeh',NULL,0,1,'2026-07-26 16:57:19','2026-07-26 16:57:28'),(2,NULL,'Untitled Note',NULL,0,1,'2026-07-26 16:57:24','2026-07-26 16:57:24'),(3,NULL,'Untitled Note',NULL,0,1,'2026-07-26 16:57:56','2026-07-26 16:57:56'),(4,NULL,'Untitled Note',NULL,0,1,'2026-07-26 17:02:50','2026-07-26 17:02:50'),(5,NULL,'Untitled N',NULL,0,NULL,'2026-07-30 02:09:29','2026-07-30 02:09:41');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) unsigned NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('0a064c2c-6ae4-416c-898d-e7c7d6ee5be5','App\\Notifications\\AdminSystemNotification','App\\Models\\User',24,'{\"message\":\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\",\"type\":\"comment\",\"url\":\"\\/admin\\/posts\\/7\\/comments\"}',NULL,'2026-07-30 01:25:09','2026-07-30 01:25:09'),('3374cf9b-768d-4914-9ef1-2bee2ac40a1b','App\\Notifications\\AdminSystemNotification','App\\Models\\User',18,'{\"message\":\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\",\"type\":\"comment\",\"url\":\"\\/admin\\/posts\\/7\\/comments\"}',NULL,'2026-07-30 01:25:09','2026-07-30 01:25:09'),('573969d5-c0c7-43ec-8de5-87f26367969b','App\\Notifications\\AdminSystemNotification','App\\Models\\User',1,'{\"message\":\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\",\"type\":\"comment\",\"url\":\"\\/admin\\/posts\\/7\\/comments\"}',NULL,'2026-07-30 01:25:09','2026-07-30 01:25:09'),('87879863-b1d2-4c6e-b3f1-119d34fc1525','App\\Notifications\\AdminSystemNotification','App\\Models\\User',17,'{\"message\":\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\",\"type\":\"comment\",\"url\":\"\\/admin\\/posts\\/7\\/comments\"}',NULL,'2026-07-30 01:25:09','2026-07-30 01:25:09'),('9bf187b2-0837-4bac-9af2-c158a09ac314','App\\Notifications\\AdminSystemNotification','App\\Models\\User',23,'{\"message\":\"New comment by te on \'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet\'\",\"type\":\"comment\",\"url\":\"\\/admin\\/posts\\/7\\/comments\"}',NULL,'2026-07-30 01:25:09','2026-07-30 01:25:09');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_attachments`
--

DROP TABLE IF EXISTS `order_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_attachments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `order_item_id` bigint(20) unsigned DEFAULT NULL,
  `uploaded_by` bigint(20) unsigned DEFAULT NULL,
  `attachment_type` varchar(255) NOT NULL DEFAULT 'pdf',
  `original_filename` varchar(255) NOT NULL,
  `stored_filename` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL DEFAULT 'local',
  `path` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `size_bytes` bigint(20) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_attachments_order_id_foreign` (`order_id`),
  KEY `order_attachments_order_item_id_foreign` (`order_item_id`),
  KEY `order_attachments_uploaded_by_foreign` (`uploaded_by`),
  KEY `order_attachments_is_demo_index` (`is_demo`),
  KEY `order_attachments_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_attachments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_attachments_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_attachments_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_attachments`
--

LOCK TABLES `order_attachments` WRITE;
/*!40000 ALTER TABLE `order_attachments` DISABLE KEYS */;
INSERT INTO `order_attachments` VALUES (21,11,NULL,15,'pdf','demo-size-guide.pdf','demo-size-guide.pdf','local','demo-attachments/demo-size-guide.pdf','application/pdf',488,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(22,11,NULL,15,'pdf','demo-product-specification.pdf','demo-product-specification.pdf','local','demo-attachments/demo-product-specification.pdf','application/pdf',499,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(23,12,NULL,15,'pdf','demo-size-guide.pdf','demo-size-guide.pdf','local','demo-attachments/demo-size-guide.pdf','application/pdf',488,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(24,12,NULL,15,'pdf','demo-product-specification.pdf','demo-product-specification.pdf','local','demo-attachments/demo-product-specification.pdf','application/pdf',499,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(25,13,NULL,16,'pdf','demo-size-guide.pdf','demo-size-guide.pdf','local','demo-attachments/demo-size-guide.pdf','application/pdf',488,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(26,13,NULL,16,'pdf','demo-product-specification.pdf','demo-product-specification.pdf','local','demo-attachments/demo-product-specification.pdf','application/pdf',499,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(27,14,NULL,16,'pdf','demo-size-guide.pdf','demo-size-guide.pdf','local','demo-attachments/demo-size-guide.pdf','application/pdf',488,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(28,14,NULL,16,'pdf','demo-product-specification.pdf','demo-product-specification.pdf','local','demo-attachments/demo-product-specification.pdf','application/pdf',499,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_images`
--

DROP TABLE IF EXISTS `order_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `order_item_id` bigint(20) unsigned DEFAULT NULL,
  `uploaded_by` bigint(20) unsigned DEFAULT NULL,
  `original_filename` varchar(255) NOT NULL,
  `stored_filename` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL DEFAULT 'local',
  `path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) NOT NULL,
  `original_mime_type` varchar(255) DEFAULT NULL,
  `size_bytes` bigint(20) unsigned NOT NULL DEFAULT 0,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_images_order_id_foreign` (`order_id`),
  KEY `order_images_order_item_id_foreign` (`order_item_id`),
  KEY `order_images_uploaded_by_foreign` (`uploaded_by`),
  KEY `order_images_is_demo_index` (`is_demo`),
  KEY `order_images_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_images_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_images_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_images_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_images`
--

LOCK TABLES `order_images` WRITE;
/*!40000 ALTER TABLE `order_images` DISABLE KEYS */;
INSERT INTO `order_images` VALUES (16,11,16,15,'running-shoes.png','N1mLr8KYjlPVsxs3JqEPSmmaK70f1IoxacE3DbCI.webp','public','demo-order-images/N1mLr8KYjlPVsxs3JqEPSmmaK70f1IoxacE3DbCI.webp','demo-order-images/thumbnails/N1mLr8KYjlPVsxs3JqEPSmmaK70f1IoxacE3DbCI.webp','image/webp','image/png',4162,1200,760,0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(17,11,17,15,'backpack.png','ouoy6XUnxAYr97UksX7fGoM9xR3R8WovhFVmRa5D.webp','public','demo-order-images/ouoy6XUnxAYr97UksX7fGoM9xR3R8WovhFVmRa5D.webp','demo-order-images/thumbnails/ouoy6XUnxAYr97UksX7fGoM9xR3R8WovhFVmRa5D.webp','image/webp','image/png',3548,1200,760,1,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(18,12,18,15,'keyboard.png','g3FjqqGSA48aiBpJZ4sPreGk97vZsyniGZF5vIAo.webp','public','demo-order-images/g3FjqqGSA48aiBpJZ4sPreGk97vZsyniGZF5vIAo.webp','demo-order-images/thumbnails/g3FjqqGSA48aiBpJZ4sPreGk97vZsyniGZF5vIAo.webp','image/webp','image/png',3570,1200,760,0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(19,13,19,16,'water-bottle.png','79SPszFD1arb6KjOmq5ApRFOnBOdbwZZRj5MQvia.webp','public','demo-order-images/79SPszFD1arb6KjOmq5ApRFOnBOdbwZZRj5MQvia.webp','demo-order-images/thumbnails/79SPszFD1arb6KjOmq5ApRFOnBOdbwZZRj5MQvia.webp','image/webp','image/png',3838,1200,760,0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(20,13,20,16,'usb-c-cable.png','9wre1lIqLsndldPqUoxH3PS6TMtudb3bOC43mr6l.webp','public','demo-order-images/9wre1lIqLsndldPqUoxH3PS6TMtudb3bOC43mr6l.webp','demo-order-images/thumbnails/9wre1lIqLsndldPqUoxH3PS6TMtudb3bOC43mr6l.webp','image/webp','image/png',3596,1200,760,1,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(21,14,21,16,'bluetooth-speaker.png','AHR31orAdVzX8TMXxrP6jXE5FaYRe7hfOFft6yXP.webp','public','demo-order-images/AHR31orAdVzX8TMXxrP6jXE5FaYRe7hfOFft6yXP.webp','demo-order-images/thumbnails/AHR31orAdVzX8TMXxrP6jXE5FaYRe7hfOFft6yXP.webp','image/webp','image/png',3872,1200,760,0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item_urls`
--

DROP TABLE IF EXISTS `order_item_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_item_urls` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_item_id` bigint(20) unsigned NOT NULL,
  `url` varchar(2048) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_item_urls_order_item_id_foreign` (`order_item_id`),
  KEY `order_item_urls_is_demo_index` (`is_demo`),
  KEY `order_item_urls_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_item_urls_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item_urls`
--

LOCK TABLES `order_item_urls` WRITE;
/*!40000 ALTER TABLE `order_item_urls` DISABLE KEYS */;
INSERT INTO `order_item_urls` VALUES (16,16,'https://example.test/products/running-shoes','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(17,17,'https://example.test/products/travel-backpack','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(18,18,'https://example.test/products/mechanical-keyboard','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(19,19,'https://example.test/products/water-bottle','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(20,20,'https://example.test/products/usb-c-cable','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(21,21,'https://example.test/products/bluetooth-speaker','example.test',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_item_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `variant` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `estimated_unit_price` decimal(10,2) DEFAULT NULL,
  `final_unit_price` decimal(10,2) DEFAULT NULL,
  `line_total` decimal(10,2) DEFAULT NULL,
  `customer_notes` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `product_variant_id` bigint(20) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_product_variant_id_foreign` (`product_variant_id`),
  KEY `order_items_is_demo_index` (`is_demo`),
  KEY `order_items_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (16,11,NULL,'Women\'s Running Shoes','Demo Women\'s Running Shoes with customer-selected attributes.','White / Size 38',3000.00,2,NULL,NULL,NULL,3000.00,3000.00,6000.00,'Demo customer note for product sourcing.','Demo internal product note.',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1'),(17,11,NULL,'Travel Backpack','Demo Travel Backpack with customer-selected attributes.','Black / 35L',1800.00,1,NULL,NULL,NULL,1800.00,1800.00,1800.00,'Demo customer note for product sourcing.','Demo internal product note.',1,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1'),(18,12,NULL,'Wireless Mechanical Keyboard','Demo Wireless Mechanical Keyboard with customer-selected attributes.','Brown switch',5200.00,1,NULL,NULL,NULL,5200.00,5200.00,5200.00,'Demo customer note for product sourcing.','Demo internal product note.',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1'),(19,13,NULL,'Stainless Steel Water Bottle','Demo Stainless Steel Water Bottle with customer-selected attributes.','750ml',0.00,3,NULL,NULL,NULL,NULL,NULL,NULL,'Demo customer note for product sourcing.','Demo internal product note.',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1'),(20,13,NULL,'USB-C Charging Cable','Demo USB-C Charging Cable with customer-selected attributes.','1m',0.00,5,NULL,NULL,NULL,NULL,NULL,NULL,'Demo customer note for product sourcing.','Demo internal product note.',1,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1'),(21,14,NULL,'Portable Bluetooth Speaker','Demo Portable Bluetooth Speaker with customer-selected attributes.','Blue',600000.00,2,NULL,NULL,NULL,600000.00,600000.00,1200000.00,'Demo customer note for product sourcing.','Demo internal product note.',0,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_messages`
--

DROP TABLE IF EXISTS `order_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `sender_id` bigint(20) unsigned NOT NULL,
  `message` text NOT NULL,
  `visibility` varchar(255) NOT NULL DEFAULT 'public',
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_messages_order_id_foreign` (`order_id`),
  KEY `order_messages_sender_id_foreign` (`sender_id`),
  KEY `order_messages_is_demo_index` (`is_demo`),
  KEY `order_messages_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_messages_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_messages`
--

LOCK TABLES `order_messages` WRITE;
/*!40000 ALTER TABLE `order_messages` DISABLE KEYS */;
INSERT INTO `order_messages` VALUES (21,11,18,'Deposit received. Products are being purchased and consolidated.','public',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(22,11,18,'Private internal demo note for CMS staff only.','internal',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(23,12,18,'Completed and receipt generated.','public',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(24,12,18,'Private internal demo note for CMS staff only.','internal',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(25,13,18,'Pricing and logistics fee are pending confirmation.','public',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(26,13,18,'Private internal demo note for CMS staff only.','internal',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(27,14,18,'Supplier shipment was delayed. Updated delivery date has been added.','public',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(28,14,18,'Private internal demo note for CMS staff only.','internal',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status_histories`
--

DROP TABLE IF EXISTS `order_status_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_status_histories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `from_status` varchar(255) DEFAULT NULL,
  `to_status` varchar(255) NOT NULL,
  `public_message` text DEFAULT NULL,
  `internal_note` text DEFAULT NULL,
  `changed_by` bigint(20) unsigned DEFAULT NULL,
  `estimated_delivery_at` timestamp NULL DEFAULT NULL,
  `reason_code` varchar(255) DEFAULT NULL,
  `customer_notified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_status_histories_order_id_foreign` (`order_id`),
  KEY `order_status_histories_changed_by_foreign` (`changed_by`),
  KEY `order_status_histories_is_demo_index` (`is_demo`),
  KEY `order_status_histories_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `order_status_histories_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_status_histories_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status_histories`
--

LOCK TABLES `order_status_histories` WRITE;
/*!40000 ALTER TABLE `order_status_histories` DISABLE KEYS */;
INSERT INTO `order_status_histories` VALUES (31,11,NULL,'pending_review','Demo order moved to pending_review.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(32,11,NULL,'pricing_ready','Demo order moved to pricing_ready.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(33,11,NULL,'in_progress','Deposit received. Products are being purchased and consolidated.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(34,12,NULL,'pending_review','Demo order moved to pending_review.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(35,12,NULL,'pricing_ready','Demo order moved to pricing_ready.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(36,12,NULL,'completed','Completed and receipt generated.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(37,13,NULL,'pending_review','Pricing and logistics fee are pending confirmation.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(38,13,NULL,'pricing_ready','Demo order moved to pricing_ready.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(39,13,NULL,'pending_review','Pricing and logistics fee are pending confirmation.','Demo internal status history note.',18,NULL,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(40,14,NULL,'pending_review','Demo order moved to pending_review.','Demo internal status history note.',18,'2026-08-04 03:50:50',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(41,14,NULL,'pricing_ready','Demo order moved to pricing_ready.','Demo internal status history note.',18,'2026-08-04 03:50:50',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1'),(42,14,NULL,'delayed','Supplier shipment was delayed. Updated delivery date has been added.','Supplier shipment was delayed.',18,'2026-08-04 03:50:50',NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50','2026-07-23 03:50:50',1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `order_status_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `customer_code_snapshot` varchar(255) DEFAULT NULL,
  `customer_name_snapshot` varchar(255) DEFAULT NULL,
  `customer_email_snapshot` varchar(255) DEFAULT NULL,
  `customer_phone_snapshot` varchar(255) DEFAULT NULL,
  `delivery_address_snapshot` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `pricing_status` varchar(255) NOT NULL DEFAULT 'not_calculated',
  `currency_code` varchar(3) NOT NULL DEFAULT 'KHR',
  `final_total_amount` bigint(20) DEFAULT NULL,
  `estimated_total_amount` bigint(20) DEFAULT NULL,
  `discount_amount` bigint(20) DEFAULT NULL,
  `delivery_fee_amount` bigint(20) DEFAULT NULL,
  `service_fee_amount` bigint(20) DEFAULT NULL,
  `logistics_fee_amount` bigint(20) DEFAULT NULL,
  `subtotal_amount` bigint(20) DEFAULT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'not_recorded',
  `purchase_readiness` varchar(255) NOT NULL DEFAULT 'not_ready',
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `logistics_fee` decimal(10,2) DEFAULT NULL,
  `service_charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `delivery_charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estimated_total` decimal(10,2) DEFAULT NULL,
  `final_total` decimal(10,2) DEFAULT NULL,
  `pricing_notes` text DEFAULT NULL,
  `customer_visible_note` text DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL DEFAULT 0.00,
  `outstanding_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `preferred_contact_method` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) NOT NULL DEFAULT 'cod',
  `payment_reference` varchar(255) DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT NULL,
  `payment_note` text DEFAULT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `shipping_city` varchar(255) NOT NULL,
  `shipping_phone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_to` bigint(20) unsigned DEFAULT NULL,
  `estimated_delivery_at` timestamp NULL DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `cancellation_reason` text DEFAULT NULL,
  `customer_notes` text DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_assigned_to_foreign` (`assigned_to`),
  KEY `orders_created_by_foreign` (`created_by`),
  KEY `orders_updated_by_foreign` (`updated_by`),
  KEY `orders_is_demo_index` (`is_demo`),
  KEY `orders_demo_batch_id_index` (`demo_batch_id`),
  CONSTRAINT `orders_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (11,'ORD-TEST-KH-0001',15,'CUS-TEST-KH-0001','Sokha Test Customer','sokha.customer@example.test','+85512345678','No. 25, Street 271\nSangkat Toul Tom Poung 2\nKhan Chamkarmon\nPhnom Penh\nCambodia',NULL,NULL,'in_progress','pricing_ready','USD',9400,9400,200,400,300,1100,7800,'unpaid','not_ready',7800.00,1100.00,300.00,400.00,200.00,9400.00,9400.00,'Demo internal pricing snapshot.','Deposit received. Products are being purchased and consolidated.',9400.00,2500.00,6900.00,'telegram','cod',NULL,NULL,NULL,'No. 25, Street 271','Phnom Penh','+85512345678','2026-07-23 03:50:50','2026-07-23 03:50:50',18,'2026-07-30 03:50:50','2026-07-16 03:50:50',NULL,NULL,NULL,NULL,NULL,15,18,NULL,1,'manual-order-demo-v1'),(12,'ORD-TEST-KH-0002',15,'CUS-TEST-KH-0001','Sokha Test Customer','sokha.customer@example.test','+85512345678','No. 25, Street 271\nSangkat Toul Tom Poung 2\nKhan Chamkarmon\nPhnom Penh\nCambodia',NULL,NULL,'delivered','pricing_ready','USD',6300,6300,0,300,0,800,5200,'paid','not_ready',5200.00,800.00,0.00,300.00,0.00,6300.00,6300.00,'Demo internal pricing snapshot.','Completed and receipt generated.',6300.00,6300.00,0.00,'telegram','cod',NULL,NULL,NULL,'No. 25, Street 271','Phnom Penh','+85512345678','2026-07-23 03:50:50','2026-07-23 03:50:50',18,'2026-07-30 03:50:50','2026-07-16 03:50:50',NULL,NULL,NULL,NULL,NULL,15,18,NULL,1,'manual-order-demo-v1'),(13,'ORD-TEST-VN-0001',16,'MVM-002','Nguyen An Test Customer','nguyen.customer@example.test','+84912345678','125 Nguyen Hue Street\nBen Nghe Ward\nDistrict 1\nHo Chi Minh City\nVietnam',NULL,NULL,'in_progress','pricing_review','VND',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'unpaid','not_ready',0.00,NULL,0.00,0.00,0.00,NULL,NULL,'Demo internal pricing snapshot.','Pricing and logistics fee are pending confirmation.',0.00,0.00,0.00,'telegram','cod',NULL,NULL,NULL,'125 Nguyen Hue Street','Ho Chi Minh City','+84912345678','2026-07-23 03:50:50','2026-08-03 07:03:04',18,'2026-07-30 03:50:50','2026-07-16 03:50:50',NULL,NULL,NULL,NULL,NULL,16,18,NULL,1,'manual-order-demo-v1'),(14,'ORD-TEST-VN-0002',16,'MVM-002','Nguyen An Test Customer','nguyen.customer@example.test','+84912345678','125 Nguyen Hue Street\nBen Nghe Ward\nDistrict 1\nHo Chi Minh City\nVietnam',NULL,NULL,'in_progress','pricing_ready','VND',1530000,1530000,0,50000,100000,180000,1200000,'unpaid','not_ready',1200000.00,180000.00,100000.00,50000.00,0.00,1530000.00,1530000.00,'Demo internal pricing snapshot.','Supplier shipment was delayed. Updated delivery date has been added.',1530000.00,0.00,1530000.00,'telegram','cod',NULL,NULL,NULL,'125 Nguyen Hue Street','Ho Chi Minh City','+84912345678','2026-07-23 03:50:50','2026-08-03 07:03:04',18,'2026-08-04 03:50:50','2026-07-16 03:50:50',NULL,NULL,NULL,NULL,NULL,16,18,NULL,1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_system` tinyint(1) DEFAULT 0,
  `is_private` tinyint(1) DEFAULT 0,
  `show_in_navigation` tinyint(1) DEFAULT 1,
  `is_deletable` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (2,'Contact Us','contact-us','<p>Have a question? We are here to help!</p><p>Email: support@pengu.com<br>Phone: +855 12 345 678</p>','Contact Us | Pengu','Get in touch with the Pengu team.',NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35',1,0,0,0),(3,'Home','home',NULL,'Home',NULL,'https://img.miniexcavator.org/ebay/test/1111.webp',1,'2026-07-21 01:35:28','2026-07-21 04:41:01',1,0,0,0),(4,'Blog','blog','','Blog','',NULL,1,'2026-07-21 01:35:28','2026-07-21 01:35:28',1,0,0,0);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
INSERT INTO `password_reset_tokens` VALUES ('sopoadararin01@gmail.com','294181','2026-07-26 08:47:00');
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'dashboard.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(2,'products.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(3,'products.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(4,'products.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(5,'products.publish','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(6,'products.archive','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(7,'products.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(8,'categories.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(9,'categories.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(10,'categories.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(11,'categories.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(12,'inventory.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(13,'inventory.adjust','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(14,'inventory.export','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(15,'orders.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(16,'orders.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(17,'orders.update_status','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(18,'orders.cancel','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(19,'orders.refund_request','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(20,'orders.refund_execute','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(21,'payments.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(22,'payments.configure','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(23,'payments.reconcile','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(24,'customers.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(25,'customers.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(26,'customers.disable','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(27,'pages.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(28,'pages.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(29,'pages.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(30,'pages.publish','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(31,'pages.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(32,'posts.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(33,'posts.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(34,'posts.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(35,'posts.publish','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(36,'posts.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(37,'menus.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(38,'menus.manage','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(39,'media.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(40,'media.upload','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(41,'media.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(42,'media.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(43,'themes.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(44,'themes.customize','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(45,'themes.activate','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(46,'promotions.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(47,'promotions.manage','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(48,'reports.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(49,'reports.view_financial','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(50,'reports.export','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(51,'staff.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(52,'staff.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(53,'staff.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(54,'staff.disable','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(55,'roles.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(56,'roles.create','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(57,'roles.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(58,'roles.delete','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(59,'permissions.manage','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(60,'settings.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(61,'settings.update','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(62,'audit_logs.view','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(63,'backups.manage','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(64,'receipts.view','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(65,'banners.view','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(66,'banners.manage','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(67,'available_sites.view','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(68,'available_sites.manage','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(69,'popups.view','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(70,'popups.manage','web','2026-07-23 08:52:40','2026-07-23 08:52:40'),(71,'team_notes.view','web','2026-08-03 06:50:11','2026-08-03 06:50:11'),(72,'testimonials.view','web','2026-08-03 06:50:11','2026-08-03 06:50:11');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popups`
--

DROP TABLE IF EXISTS `popups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `popups` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `badge_text` varchar(255) DEFAULT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `creative_size` varchar(255) NOT NULL DEFAULT 'landscape_1920x1080',
  `link_url` varchar(255) DEFAULT NULL,
  `button_label` varchar(255) DEFAULT NULL,
  `accent_color` varchar(7) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `popups_is_demo_index` (`is_demo`),
  KEY `popups_demo_batch_id_index` (`demo_batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popups`
--

LOCK TABLES `popups` WRITE;
/*!40000 ALTER TABLE `popups` DISABLE KEYS */;
INSERT INTO `popups` VALUES (3,'Order Promotion',NULL,NULL,NULL,'popups/KvvWPPUNcOo1IFyeaR98DfR7TrywvkIVTAIJarb8.png','landscape_1920x1080','/manual-order','Order now','#1566d1',1,'2026-07-20 23:47:00','2026-08-05 23:48:00','2026-07-23 03:50:50','2026-08-03 10:32:25',1,'manual-order-demo-v1');
/*!40000 ALTER TABLE `popups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_categories`
--

DROP TABLE IF EXISTS `post_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_categories`
--

LOCK TABLES `post_categories` WRITE;
/*!40000 ALTER TABLE `post_categories` DISABLE KEYS */;
INSERT INTO `post_categories` VALUES (1,'Logistic','logistic','2026-07-24 23:06:06','2026-07-24 23:06:06');
/*!40000 ALTER TABLE `post_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_comments`
--

DROP TABLE IF EXISTS `post_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `review_title` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `admin_reply` text DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_comments_post_id_foreign` (`post_id`),
  CONSTRAINT `post_comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comments`
--

LOCK TABLES `post_comments` WRITE;
/*!40000 ALTER TABLE `post_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `post_category_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_user_id_foreign` (`user_id`),
  KEY `posts_post_category_id_foreign` (`post_category_id`),
  CONSTRAINT `posts_post_category_id_foreign` FOREIGN KEY (`post_category_id`) REFERENCES `post_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,1,'Fashion Trends for 2030','fashion-trends-2030','<p>Discover the upcoming trends that will define the next season of fashion. We explore materials, silhouettes, and must-have accessories.</p>','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',NULL,'Fashion Trends 2030','A deep dive into upcoming fashion trends.',1,NULL,'2026-07-08 18:43:35','2026-07-18 18:43:35','2026-07-18 18:43:35',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `path` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_hover_image` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Classic Oxford Shirt - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(2,1,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Classic Oxford Shirt - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(3,1,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Classic Oxford Shirt - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(4,1,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Classic Oxford Shirt - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(5,2,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Relaxed Linen Shirt - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(6,2,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Relaxed Linen Shirt - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(7,2,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Relaxed Linen Shirt - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(8,2,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Relaxed Linen Shirt - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(9,3,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Tailored Cotton Trousers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(10,3,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Tailored Cotton Trousers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(11,3,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Tailored Cotton Trousers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(12,3,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Tailored Cotton Trousers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(13,4,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Everyday Polo - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(14,4,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Everyday Polo - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(15,4,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Everyday Polo - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(16,4,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Everyday Polo - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(17,5,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Lightweight Bomber Jacket - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(18,5,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Lightweight Bomber Jacket - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(19,5,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Lightweight Bomber Jacket - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(20,5,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Lightweight Bomber Jacket - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(21,6,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Satin Midi Dress - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(22,6,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Satin Midi Dress - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(23,6,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Satin Midi Dress - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(24,6,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Satin Midi Dress - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(25,7,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Pleated Wide-Leg Trousers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(26,7,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Pleated Wide-Leg Trousers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(27,7,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Pleated Wide-Leg Trousers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(28,7,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Pleated Wide-Leg Trousers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(29,8,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Cropped Knit Cardigan - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(30,8,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Cropped Knit Cardigan - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(31,8,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Cropped Knit Cardigan - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(32,8,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Cropped Knit Cardigan - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(33,9,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Everyday Blazer - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(34,9,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Everyday Blazer - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(35,9,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Everyday Blazer - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(36,9,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Everyday Blazer - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(37,10,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Soft Cotton Blouse - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(38,10,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Soft Cotton Blouse - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(39,10,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Soft Cotton Blouse - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(40,10,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Soft Cotton Blouse - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(41,11,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Urban Runner Sneakers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(42,11,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Urban Runner Sneakers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(43,11,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Urban Runner Sneakers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(44,11,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Urban Runner Sneakers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(45,12,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Classic White Sneakers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(46,12,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Classic White Sneakers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(47,12,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Classic White Sneakers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(48,12,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Classic White Sneakers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(49,13,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Leather Loafers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(50,13,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Leather Loafers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(51,13,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Leather Loafers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(52,13,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Leather Loafers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(53,14,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Platform Sneakers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(54,14,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Platform Sneakers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(55,14,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Platform Sneakers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(56,14,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Platform Sneakers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(57,15,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Minimal Slide Sandals - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(58,15,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Minimal Slide Sandals - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(59,15,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Minimal Slide Sandals - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(60,15,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Minimal Slide Sandals - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(61,16,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Leather Crossbody Bag - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(62,16,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Leather Crossbody Bag - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(63,16,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Leather Crossbody Bag - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(64,16,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Leather Crossbody Bag - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(65,17,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Stainless Steel Watch - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(66,17,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Stainless Steel Watch - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(67,17,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Stainless Steel Watch - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(68,17,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Stainless Steel Watch - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(69,18,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Polarized Sunglasses - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(70,18,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Polarized Sunglasses - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(71,18,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Polarized Sunglasses - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(72,18,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Polarized Sunglasses - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(73,19,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Canvas Everyday Tote - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(74,19,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Canvas Everyday Tote - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(75,19,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Canvas Everyday Tote - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(76,19,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Canvas Everyday Tote - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(77,20,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Classic Leather Belt - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(78,20,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Classic Leather Belt - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(79,20,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Classic Leather Belt - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(80,20,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Classic Leather Belt - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(81,21,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Hydrating Face Cream - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(82,21,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Hydrating Face Cream - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(83,21,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Hydrating Face Cream - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(84,22,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Velvet Matte Lip Color - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(85,22,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Velvet Matte Lip Color - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(86,22,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Velvet Matte Lip Color - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(87,23,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Daily Sunscreen SPF 50 - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(88,23,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','Daily Sunscreen SPF 50 - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(89,23,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Daily Sunscreen SPF 50 - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(90,24,'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80','Gentle Facial Cleanser - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(91,24,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Gentle Facial Cleanser - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(92,24,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Gentle Facial Cleanser - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(93,25,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Wireless Earbuds - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(94,25,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Wireless Earbuds - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(95,25,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Wireless Earbuds - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(96,26,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Compact Bluetooth Speaker - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(97,26,'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','Compact Bluetooth Speaker - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(98,26,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Compact Bluetooth Speaker - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(99,27,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Smart Fitness Band - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(100,27,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Smart Fitness Band - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(101,27,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Smart Fitness Band - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(102,28,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','USB-C Fast Charger - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(103,28,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','USB-C Fast Charger - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(104,28,'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80','USB-C Fast Charger - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(105,29,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','Kids Graphic T-Shirt - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(106,29,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Kids Graphic T-Shirt - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(107,29,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Kids Graphic T-Shirt - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(108,29,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80','Kids Graphic T-Shirt - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(109,30,'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80','Kids Everyday Sneakers - View 1',1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(110,30,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','Kids Everyday Sneakers - View 2',2,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(111,30,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80','Kids Everyday Sneakers - View 3',3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(112,30,'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80','Kids Everyday Sneakers - View 4',4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_variants_sku_unique` (`sku`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,1,'S','Default',NULL,'SKU-CNI7HBYR-S',NULL,26,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(2,1,'M','Default',NULL,'SKU-CNI7HBYR-M',NULL,6,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(3,1,'L','Default',NULL,'SKU-CNI7HBYR-L',NULL,9,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(4,2,'S','Default',NULL,'SKU-B1ZUWKH8-S',NULL,28,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(5,2,'M','Default',NULL,'SKU-B1ZUWKH8-M',NULL,13,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(6,2,'L','Default',NULL,'SKU-B1ZUWKH8-L',NULL,26,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(7,3,'S','Default',NULL,'SKU-V6RF5M4W-S',NULL,7,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(8,3,'M','Default',NULL,'SKU-V6RF5M4W-M',NULL,30,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(9,3,'L','Default',NULL,'SKU-V6RF5M4W-L',NULL,24,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(10,4,'S','Default',NULL,'SKU-KVP3P2PU-S',NULL,11,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(11,4,'M','Default',NULL,'SKU-KVP3P2PU-M',NULL,18,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(12,4,'L','Default',NULL,'SKU-KVP3P2PU-L',NULL,30,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(13,5,'S','Default',NULL,'SKU-ATEVZQQC-S',NULL,9,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(14,5,'M','Default',NULL,'SKU-ATEVZQQC-M',NULL,11,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(15,5,'L','Default',NULL,'SKU-ATEVZQQC-L',NULL,23,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(16,6,'S','Default',NULL,'SKU-S4TIJIUR-S',NULL,6,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(17,6,'M','Default',NULL,'SKU-S4TIJIUR-M',NULL,26,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(18,6,'L','Default',NULL,'SKU-S4TIJIUR-L',NULL,9,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(19,7,'S','Default',NULL,'SKU-UOIGEGZC-S',NULL,27,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(20,7,'M','Default',NULL,'SKU-UOIGEGZC-M',NULL,13,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(21,7,'L','Default',NULL,'SKU-UOIGEGZC-L',NULL,7,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(22,8,'S','Default',NULL,'SKU-HQ5WSUVJ-S',NULL,12,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(23,8,'M','Default',NULL,'SKU-HQ5WSUVJ-M',NULL,28,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(24,8,'L','Default',NULL,'SKU-HQ5WSUVJ-L',NULL,22,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(25,9,'S','Default',NULL,'SKU-SKOB0MV3-S',NULL,19,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(26,9,'M','Default',NULL,'SKU-SKOB0MV3-M',NULL,15,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(27,9,'L','Default',NULL,'SKU-SKOB0MV3-L',NULL,10,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(28,10,'S','Default',NULL,'SKU-TYQQXDVK-S',NULL,30,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(29,10,'M','Default',NULL,'SKU-TYQQXDVK-M',NULL,27,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(30,10,'L','Default',NULL,'SKU-TYQQXDVK-L',NULL,10,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(31,11,'S','Default',NULL,'SKU-GZRS2O94-S',NULL,12,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(32,11,'M','Default',NULL,'SKU-GZRS2O94-M',NULL,23,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(33,11,'L','Default',NULL,'SKU-GZRS2O94-L',NULL,22,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(34,12,'S','Default',NULL,'SKU-81I8NGCJ-S',NULL,8,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(35,12,'M','Default',NULL,'SKU-81I8NGCJ-M',NULL,6,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(36,12,'L','Default',NULL,'SKU-81I8NGCJ-L',NULL,19,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(37,13,'S','Default',NULL,'SKU-7AVVOEQ1-S',NULL,22,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(38,13,'M','Default',NULL,'SKU-7AVVOEQ1-M',NULL,27,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(39,13,'L','Default',NULL,'SKU-7AVVOEQ1-L',NULL,20,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(40,14,'S','Default',NULL,'SKU-IQM8YHCL-S',NULL,21,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(41,14,'M','Default',NULL,'SKU-IQM8YHCL-M',NULL,9,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(42,14,'L','Default',NULL,'SKU-IQM8YHCL-L',NULL,13,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(43,15,'S','Default',NULL,'SKU-ZBTCM2VD-S',NULL,30,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(44,15,'M','Default',NULL,'SKU-ZBTCM2VD-M',NULL,18,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(45,15,'L','Default',NULL,'SKU-ZBTCM2VD-L',NULL,20,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(46,29,'S','Default',NULL,'SKU-BEPTR7GF-S',NULL,6,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(47,29,'M','Default',NULL,'SKU-BEPTR7GF-M',NULL,11,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(48,29,'L','Default',NULL,'SKU-BEPTR7GF-L',NULL,16,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(49,30,'S','Default',NULL,'SKU-M46JF2JX-S',NULL,30,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(50,30,'M','Default',NULL,'SKU-M46JF2JX-M',NULL,10,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35'),(51,30,'L','Default',NULL,'SKU-M46JF2JX-L',NULL,13,NULL,1,'2026-07-18 18:43:35','2026-07-18 18:43:35');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sku` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `low_stock_threshold` int(11) NOT NULL DEFAULT 5,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `brand_id` bigint(20) unsigned DEFAULT NULL,
  `collection_id` bigint(20) unsigned DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `material` varchar(255) DEFAULT NULL,
  `care_instructions` text DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `shipping_info` text DEFAULT NULL,
  `return_info` text DEFAULT NULL,
  `subcategory_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_brand_id_foreign` (`brand_id`),
  KEY `products_collection_id_foreign` (`collection_id`),
  KEY `products_subcategory_id_foreign` (`subcategory_id`),
  CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_collection_id_foreign` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_subcategory_id_foreign` FOREIGN KEY (`subcategory_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SKU-CNI7HBYR','890631187457','Classic Oxford Shirt','classic-oxford-shirt-742','A breathable cotton shirt with a clean tailored fit, designed for office wear, events, and relaxed everyday styling.','<p>This Classic Oxford Shirt is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',45.00,NULL,18.00,51,5,NULL,1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',1,4,'Classic Oxford Shirt | Premium Quality','A breathable cotton shirt with a clean tailored fit, designed for office wear, events, and relaxed everyday styling.',1,'100% Cotton','Machine wash cold with similar colors. Do not bleach.','0.9 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(2,'SKU-B1ZUWKH8','890193575860','Relaxed Linen Shirt','relaxed-linen-shirt-539','Lightweight and airy, this relaxed linen shirt offers the perfect blend of casual comfort and sophisticated weekend style.','<p>This Relaxed Linen Shirt is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',55.00,NULL,22.00,87,5,NULL,1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',3,3,'Relaxed Linen Shirt | Premium Quality','Lightweight and airy, this relaxed linen shirt offers the perfect blend of casual comfort and sophisticated weekend style.',1,'100% Linen','Hand wash cold or dry clean. Hang dry.','0.9 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(3,'SKU-V6RF5M4W','890444118662','Tailored Cotton Trousers','tailored-cotton-trousers-778','Sharp tailored trousers with a slight stretch for all-day comfort, transitioning seamlessly from the boardroom to evening dinners.','<p>This Tailored Cotton Trousers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',65.00,NULL,26.00,80,5,NULL,1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,1,'Tailored Cotton Trousers | Premium Quality','Sharp tailored trousers with a slight stretch for all-day comfort, transitioning seamlessly from the boardroom to evening dinners.',1,'98% Cotton, 2% Elastane','Machine wash cold. Tumble dry low.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(4,'SKU-KVP3P2PU','890995453702','Everyday Polo','everyday-polo-455','A staple wardrobe piece made from soft, moisture-wicking pique cotton, perfect for a round of golf or casual Fridays.','<p>This Everyday Polo is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',35.00,NULL,14.00,120,5,NULL,1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',2,5,'Everyday Polo | Premium Quality','A staple wardrobe piece made from soft, moisture-wicking pique cotton, perfect for a round of golf or casual Fridays.',1,'100% Pique Cotton','Machine wash warm. Iron on medium.','0.5 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(5,'SKU-ATEVZQQC','890324810194','Lightweight Bomber Jacket','lightweight-bomber-jacket-680','A modern take on the classic bomber, featuring a water-resistant shell and lightweight lining for unpredictable weather.','<p>This Lightweight Bomber Jacket is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',110.00,88.00,44.00,40,5,NULL,1,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',2,1,'Lightweight Bomber Jacket | Premium Quality','A modern take on the classic bomber, featuring a water-resistant shell and lightweight lining for unpredictable weather.',1,'100% Polyester Shell','Dry clean only.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(6,'SKU-S4TIJIUR','890120314631','Satin Midi Dress','satin-midi-dress-934','An elegant slip dress crafted from lustrous satin, featuring a flattering bias cut that drapes beautifully for evening events.','<p>This Satin Midi Dress is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',120.00,96.00,48.00,115,5,NULL,2,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,4,'Satin Midi Dress | Premium Quality','An elegant slip dress crafted from lustrous satin, featuring a flattering bias cut that drapes beautifully for evening events.',1,'100% Silk Satin','Dry clean only. Do not iron directly.','0.8 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(7,'SKU-UOIGEGZC','890677953959','Pleated Wide-Leg Trousers','pleated-wide-leg-trousers-314','High-waisted wide-leg trousers with fluid pleats that elongate the silhouette, offering a sophisticated and comfortable fit.','<p>This Pleated Wide-Leg Trousers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',85.00,NULL,34.00,43,5,NULL,2,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,4,'Pleated Wide-Leg Trousers | Premium Quality','High-waisted wide-leg trousers with fluid pleats that elongate the silhouette, offering a sophisticated and comfortable fit.',1,'Polyester Blend','Machine wash cold on gentle cycle.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(8,'SKU-HQ5WSUVJ','890221460709','Cropped Knit Cardigan','cropped-knit-cardigan-891','A cozy, textured knit cardigan with an oversized fit and tortoiseshell buttons, perfect for layering during transitional seasons.','<p>This Cropped Knit Cardigan is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',60.00,48.00,24.00,97,5,NULL,2,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',3,6,'Cropped Knit Cardigan | Premium Quality','A cozy, textured knit cardigan with an oversized fit and tortoiseshell buttons, perfect for layering during transitional seasons.',1,'Wool and Acrylic Blend','Hand wash cold. Dry flat.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(9,'SKU-SKOB0MV3','890234116818','Everyday Blazer','everyday-blazer-170','A sharply tailored single-breasted blazer that instantly elevates any outfit, designed with lightly padded shoulders and flap pockets.','<p>This Everyday Blazer is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',140.00,112.00,56.00,40,5,NULL,2,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,6,'Everyday Blazer | Premium Quality','A sharply tailored single-breasted blazer that instantly elevates any outfit, designed with lightly padded shoulders and flap pockets.',1,'Wool Blend','Dry clean only.','0.8 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(10,'SKU-TYQQXDVK','890339835510','Soft Cotton Blouse','soft-cotton-blouse-123','A feminine cotton blouse featuring subtle puffed sleeves and a delicate button front, ideal for both work and weekends.','<p>This Soft Cotton Blouse is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',50.00,NULL,20.00,44,5,NULL,2,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,6,'Soft Cotton Blouse | Premium Quality','A feminine cotton blouse featuring subtle puffed sleeves and a delicate button front, ideal for both work and weekends.',1,'100% Cotton','Machine wash cold. Line dry.','0.8 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(11,'SKU-GZRS2O94','890985564275','Urban Runner Sneakers','urban-runner-sneakers-432','High-performance urban sneakers with responsive cushioning and a breathable mesh upper, designed for active city living.','<p>This Urban Runner Sneakers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',130.00,NULL,52.00,91,5,NULL,4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',5,5,'Urban Runner Sneakers | Premium Quality','High-performance urban sneakers with responsive cushioning and a breathable mesh upper, designed for active city living.',1,'Mesh Upper, Rubber Sole','Wipe clean with a damp cloth.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(12,'SKU-81I8NGCJ','890910948703','Classic White Sneakers','classic-white-sneakers-480','Minimalist white leather sneakers that pair perfectly with everything from tailored suits to casual denim.','<p>This Classic White Sneakers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',90.00,NULL,36.00,64,5,NULL,4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,1,'Classic White Sneakers | Premium Quality','Minimalist white leather sneakers that pair perfectly with everything from tailored suits to casual denim.',1,'Genuine Leather','Use leather cleaner and conditioner regularly.','0.8 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(13,'SKU-7AVVOEQ1','890630804834','Leather Loafers','leather-loafers-959','Timeless penny loafers crafted from supple leather, featuring a cushioned footbed for exceptional all-day comfort.','<p>This Leather Loafers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',150.00,NULL,60.00,89,5,NULL,4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',5,6,'Leather Loafers | Premium Quality','Timeless penny loafers crafted from supple leather, featuring a cushioned footbed for exceptional all-day comfort.',1,'Full Grain Leather','Polish regularly with matching shoe cream.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(14,'SKU-IQM8YHCL','890639316676','Platform Sneakers','platform-sneakers-857','Elevate your everyday look with these chunky platform sneakers, combining retro aesthetics with modern comfort technology.','<p>This Platform Sneakers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',95.00,76.00,38.00,18,5,NULL,4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,1,'Platform Sneakers | Premium Quality','Elevate your everyday look with these chunky platform sneakers, combining retro aesthetics with modern comfort technology.',1,'Canvas and Rubber','Spot clean with mild soap.','0.5 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(15,'SKU-ZBTCM2VD','890943787929','Minimal Slide Sandals','minimal-slide-sandals-174','Sleek and comfortable slide sandals with a contoured footbed, essential for warm weather and beachside vacations.','<p>This Minimal Slide Sandals is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',45.00,NULL,18.00,42,5,NULL,4,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,5,'Minimal Slide Sandals | Premium Quality','Sleek and comfortable slide sandals with a contoured footbed, essential for warm weather and beachside vacations.',1,'EVA Foam','Rinse with water and air dry.','0.2 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(16,'SKU-4I8BN5CA','890504353606','Leather Crossbody Bag','leather-crossbody-bag-767','A compact yet spacious crossbody bag made from premium pebble leather, featuring secure compartments for daily essentials.','<p>This Leather Crossbody Bag is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',120.00,NULL,48.00,89,5,NULL,5,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,3,'Leather Crossbody Bag | Premium Quality','A compact yet spacious crossbody bag made from premium pebble leather, featuring secure compartments for daily essentials.',1,'Pebble Leather','Keep away from direct heat. Use leather protector.','0.8 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(17,'SKU-2MSXUWZ0','890321705585','Stainless Steel Watch','stainless-steel-watch-258','A sophisticated timepiece featuring a brushed stainless steel case, minimalist dial, and precise quartz movement.','<p>This Stainless Steel Watch is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',195.00,156.00,78.00,100,5,NULL,5,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',2,5,'Stainless Steel Watch | Premium Quality','A sophisticated timepiece featuring a brushed stainless steel case, minimalist dial, and precise quartz movement.',1,'Stainless Steel','Wipe with microfiber cloth. Water resistant to 30m.','0.5 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(18,'SKU-VGEBLQHL','890719266854','Polarized Sunglasses','polarized-sunglasses-444','Classic sunglasses updated with polarized lenses that reduce glare and provide 100% UV protection for your eyes.','<p>This Polarized Sunglasses is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',85.00,68.00,34.00,115,5,NULL,5,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',1,6,'Polarized Sunglasses | Premium Quality','Classic sunglasses updated with polarized lenses that reduce glare and provide 100% UV protection for your eyes.',1,'Acetate Frame, Polycarbonate Lenses','Clean with provided microfiber cloth.','0.5 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(19,'SKU-3ENHMXUA','890855117143','Canvas Everyday Tote','canvas-everyday-tote-343','A durable heavyweight canvas tote bag with reinforced handles, spacious enough for your laptop and daily necessities.','<p>This Canvas Everyday Tote is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',55.00,44.00,22.00,108,5,NULL,5,1,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,2,'Canvas Everyday Tote | Premium Quality','A durable heavyweight canvas tote bag with reinforced handles, spacious enough for your laptop and daily necessities.',1,'100% Cotton Canvas','Spot clean only.','0.6 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(20,'SKU-JL6BYD62','890473553192','Classic Leather Belt','classic-leather-belt-624','An essential everyday belt crafted from vegetable-tanned leather, finished with a subtle brushed metal buckle.','<p>This Classic Leather Belt is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',40.00,NULL,16.00,27,5,NULL,5,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,1,'Classic Leather Belt | Premium Quality','An essential everyday belt crafted from vegetable-tanned leather, finished with a subtle brushed metal buckle.',1,'Genuine Leather','Condition occasionally to prevent cracking.','0.4 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(21,'SKU-IXVIT1LZ','890132902876','Hydrating Face Cream','hydrating-face-cream-273','A rich, deeply nourishing face cream infused with hyaluronic acid and ceramides to lock in moisture and plump the skin.','<p>This Hydrating Face Cream is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',45.00,NULL,18.00,100,5,NULL,6,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',3,5,'Hydrating Face Cream | Premium Quality','A rich, deeply nourishing face cream infused with hyaluronic acid and ceramides to lock in moisture and plump the skin.',1,'Water, Glycerin, Hyaluronic Acid','Apply daily to clean face and neck.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(22,'SKU-KVEYQO4F','890425732180','Velvet Matte Lip Color','velvet-matte-lip-color-557','A highly pigmented liquid lipstick that delivers a comfortable, long-lasting matte finish without drying your lips.','<p>This Velvet Matte Lip Color is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',28.00,NULL,11.20,103,5,NULL,6,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',5,4,'Velvet Matte Lip Color | Premium Quality','A highly pigmented liquid lipstick that delivers a comfortable, long-lasting matte finish without drying your lips.',1,'Isododecane, Dimethicone','Store in a cool, dry place.','0.5 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(23,'SKU-1U23ZE5J','890232072692','Daily Sunscreen SPF 50','daily-sunscreen-spf-50-485','A lightweight, invisible broad-spectrum sunscreen that protects against UVA/UVB rays without leaving a white cast.','<p>This Daily Sunscreen SPF 50 is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',35.00,NULL,14.00,106,5,NULL,6,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,1,'Daily Sunscreen SPF 50 | Premium Quality','A lightweight, invisible broad-spectrum sunscreen that protects against UVA/UVB rays without leaving a white cast.',1,'Zinc Oxide, Titanium Dioxide','Apply liberally 15 minutes before sun exposure.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(24,'SKU-3YOXO7KN','890133074413','Gentle Facial Cleanser','gentle-facial-cleanser-251','A pH-balanced gel cleanser that effectively removes makeup and impurities while respecting your skin\'s natural barrier.','<p>This Gentle Facial Cleanser is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',24.00,NULL,9.60,51,5,NULL,6,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',2,3,'Gentle Facial Cleanser | Premium Quality','A pH-balanced gel cleanser that effectively removes makeup and impurities while respecting your skin\'s natural barrier.',1,'Aloe Vera, Chamomile Extract','Massage onto damp skin and rinse thoroughly.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(25,'SKU-12APIWOD','890691100000','Wireless Earbuds','wireless-earbuds-359','True wireless earbuds delivering immersive sound, active noise cancellation, and all-day battery life in a compact case.','<p>This Wireless Earbuds is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',149.00,NULL,59.60,105,5,NULL,7,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,6,'Wireless Earbuds | Premium Quality','True wireless earbuds delivering immersive sound, active noise cancellation, and all-day battery life in a compact case.',1,'Plastic and Silicone','Keep charging contacts clean and dry.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(26,'SKU-IRKDIW5O','890425223366','Compact Bluetooth Speaker','compact-bluetooth-speaker-211','A rugged, waterproof portable speaker that packs surprisingly powerful, room-filling sound and deep bass.','<p>This Compact Bluetooth Speaker is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',89.00,NULL,35.60,53,5,NULL,7,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',6,2,'Compact Bluetooth Speaker | Premium Quality','A rugged, waterproof portable speaker that packs surprisingly powerful, room-filling sound and deep bass.',1,'Rubberized Housing','Rinse with fresh water after exposure to chlorine.','0.9 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(27,'SKU-TABF0DEL','890124510107','Smart Fitness Band','smart-fitness-band-761','A sleek activity tracker that monitors your heart rate, sleep patterns, and daily steps to help you reach your goals.','<p>This Smart Fitness Band is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',69.00,55.20,27.60,51,5,NULL,7,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',3,4,'Smart Fitness Band | Premium Quality','A sleek activity tracker that monitors your heart rate, sleep patterns, and daily steps to help you reach your goals.',1,'Silicone Strap','Wipe strap with mild soap and water.','0.2 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(28,'SKU-RLC2NZTO','890896820583','USB-C Fast Charger','usb-c-fast-charger-291','A high-speed 65W wall adapter capable of rapidly charging your laptop, tablet, or smartphone simultaneously.','<p>This USB-C Fast Charger is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',29.00,NULL,11.60,117,5,NULL,7,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',2,6,'USB-C Fast Charger | Premium Quality','A high-speed 65W wall adapter capable of rapidly charging your laptop, tablet, or smartphone simultaneously.',1,'Fire-resistant PC','Do not expose to liquids.','0.7 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(29,'SKU-BEPTR7GF','890408207628','Kids Graphic T-Shirt','kids-graphic-t-shirt-358','A soft and durable cotton t-shirt featuring a playful, vibrant graphic print that kids will love wearing every day.','<p>This Kids Graphic T-Shirt is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',25.00,NULL,10.00,93,5,NULL,3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,4,'Kids Graphic T-Shirt | Premium Quality','A soft and durable cotton t-shirt featuring a playful, vibrant graphic print that kids will love wearing every day.',1,'100% Organic Cotton','Machine wash cold. Tumble dry low.','0.3 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL),(30,'SKU-M46JF2JX','890999223047','Kids Everyday Sneakers','kids-everyday-sneakers-109','Comfortable and supportive sneakers with easy hook-and-loop closures, designed for active kids on the playground.','<p>This Kids Everyday Sneakers is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>\n            <p><strong>Highlights:</strong></p>\n            <ul>\n                <li>Premium breathable fabric</li>\n                <li>Modern tailored fit</li>\n                <li>Durable reinforced stitching</li>\n                <li>Versatile for multiple occasions</li>\n            </ul>',45.00,NULL,18.00,35,5,NULL,3,0,'2026-07-18 18:43:35','2026-07-18 18:43:35',4,6,'Kids Everyday Sneakers | Premium Quality','Comfortable and supportive sneakers with easy hook-and-loop closures, designed for active kids on the playground.',1,'Synthetic Upper','Wipe clean with a damp cloth.','0.4 kg','30 x 20 x 5 cm','Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.','Eligible for return within 14 days if unworn and in original condition.',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `receipt_number` varchar(255) NOT NULL,
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `manual_order_id` bigint(20) unsigned DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `snapshot_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`snapshot_json`)),
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `charges` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status` varchar(255) NOT NULL DEFAULT 'unpaid',
  `generated_by` bigint(20) unsigned DEFAULT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT 1,
  `is_voided` tinyint(1) NOT NULL DEFAULT 0,
  `void_reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipts_receipt_number_unique` (`receipt_number`),
  KEY `receipts_order_id_foreign` (`order_id`),
  KEY `receipts_user_id_foreign` (`user_id`),
  KEY `receipts_generated_by_foreign` (`generated_by`),
  KEY `receipts_is_demo_index` (`is_demo`),
  KEY `receipts_demo_batch_id_index` (`demo_batch_id`),
  KEY `receipts_manual_order_id_foreign` (`manual_order_id`),
  CONSTRAINT `receipts_generated_by_foreign` FOREIGN KEY (`generated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `receipts_manual_order_id_foreign` FOREIGN KEY (`manual_order_id`) REFERENCES `manual_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `receipts_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `receipts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipts`
--

LOCK TABLES `receipts` WRITE;
/*!40000 ALTER TABLE `receipts` DISABLE KEYS */;
INSERT INTO `receipts` VALUES (4,'RCP-TEST-KH-0001',12,NULL,15,'{\"order_number\":\"ORD-TEST-KH-0002\",\"currency\":\"USD\"}',5200.00,1100.00,0.00,6300.00,'paid',18,'demo-attachments/demo-product-specification.pdf',1,0,NULL,'2026-07-23 03:50:50','2026-07-23 03:50:50',NULL,1,'manual-order-demo-v1'),(5,'RCP-2026-382460',11,NULL,15,'{\"order\":{\"id\":11,\"order_number\":\"ORD-TEST-KH-0001\",\"title\":null,\"description\":null,\"status\":\"in_progress\"},\"items\":[{\"id\":16,\"order_id\":11,\"product_id\":null,\"product_name\":\"Women\'s Running Shoes\",\"description\":\"Demo Women\'s Running Shoes with customer-selected attributes.\",\"variant\":\"White \\/ Size 38\",\"price\":\"3000.00\",\"quantity\":2,\"type\":null,\"color\":null,\"size\":null,\"estimated_unit_price\":\"3000.00\",\"final_unit_price\":\"3000.00\",\"line_total\":\"6000.00\",\"customer_notes\":\"Demo customer note for product sourcing.\",\"admin_notes\":\"Demo internal product note.\",\"sort_order\":0,\"created_at\":\"2026-07-23T03:50:50.000000Z\",\"updated_at\":\"2026-07-23T03:50:50.000000Z\",\"product_variant_id\":null,\"deleted_at\":null,\"is_demo\":1,\"demo_batch_id\":\"manual-order-demo-v1\"},{\"id\":17,\"order_id\":11,\"product_id\":null,\"product_name\":\"Travel Backpack\",\"description\":\"Demo Travel Backpack with customer-selected attributes.\",\"variant\":\"Black \\/ 35L\",\"price\":\"1800.00\",\"quantity\":1,\"type\":null,\"color\":null,\"size\":null,\"estimated_unit_price\":\"1800.00\",\"final_unit_price\":\"1800.00\",\"line_total\":\"1800.00\",\"customer_notes\":\"Demo customer note for product sourcing.\",\"admin_notes\":\"Demo internal product note.\",\"sort_order\":1,\"created_at\":\"2026-07-23T03:50:50.000000Z\",\"updated_at\":\"2026-07-23T03:50:50.000000Z\",\"product_variant_id\":null,\"deleted_at\":null,\"is_demo\":1,\"demo_batch_id\":\"manual-order-demo-v1\"}]}',7800.00,700.00,200.00,8300.00,'deposit_paid',1,NULL,1,0,NULL,'2026-07-23 04:26:16','2026-07-23 04:26:16',NULL,0,NULL),(6,'RCP-2026-243721',11,NULL,15,'{\"order\":{\"id\":11,\"order_number\":\"ORD-TEST-KH-0001\",\"title\":null,\"description\":null,\"status\":\"in_progress\"},\"items\":[{\"id\":16,\"order_id\":11,\"product_id\":null,\"product_name\":\"Women\'s Running Shoes\",\"description\":\"Demo Women\'s Running Shoes with customer-selected attributes.\",\"variant\":\"White \\/ Size 38\",\"price\":\"3000.00\",\"quantity\":2,\"type\":null,\"color\":null,\"size\":null,\"estimated_unit_price\":\"3000.00\",\"final_unit_price\":\"3000.00\",\"line_total\":\"6000.00\",\"customer_notes\":\"Demo customer note for product sourcing.\",\"admin_notes\":\"Demo internal product note.\",\"sort_order\":0,\"created_at\":\"2026-07-23T03:50:50.000000Z\",\"updated_at\":\"2026-07-23T03:50:50.000000Z\",\"product_variant_id\":null,\"deleted_at\":null,\"is_demo\":1,\"demo_batch_id\":\"manual-order-demo-v1\"},{\"id\":17,\"order_id\":11,\"product_id\":null,\"product_name\":\"Travel Backpack\",\"description\":\"Demo Travel Backpack with customer-selected attributes.\",\"variant\":\"Black \\/ 35L\",\"price\":\"1800.00\",\"quantity\":1,\"type\":null,\"color\":null,\"size\":null,\"estimated_unit_price\":\"1800.00\",\"final_unit_price\":\"1800.00\",\"line_total\":\"1800.00\",\"customer_notes\":\"Demo customer note for product sourcing.\",\"admin_notes\":\"Demo internal product note.\",\"sort_order\":1,\"created_at\":\"2026-07-23T03:50:50.000000Z\",\"updated_at\":\"2026-07-23T03:50:50.000000Z\",\"product_variant_id\":null,\"deleted_at\":null,\"is_demo\":1,\"demo_batch_id\":\"manual-order-demo-v1\"}]}',7800.00,700.00,200.00,8300.00,'unpaid',17,NULL,1,0,NULL,'2026-07-24 11:32:48','2026-07-24 11:32:48',NULL,0,NULL),(7,'RCP-2026-260812',NULL,7,2,'{\"order\":{\"id\":7,\"order_number\":\"ORD-TEST-1785287411-6a6952f3a85a1-1\",\"status\":\"pending\"},\"items\":[{\"id\":6,\"manual_order_id\":7,\"product_name\":\"Test Product 1\",\"quantity\":2,\"unit_price\":\"41.50\",\"total_price\":\"77.99\",\"created_at\":\"2026-07-29T01:10:11.000000Z\",\"updated_at\":\"2026-07-29T01:10:11.000000Z\"}]}',367.99,0.00,0.00,367.99,'unpaid',1,NULL,1,0,NULL,'2026-07-29 01:21:45','2026-07-29 01:21:45',NULL,0,NULL),(8,'RCP-2026-812870',NULL,5,2,'{\"order\":{\"id\":5,\"order_number\":\"MVM-ORD-020\",\"status\":\"delivered\"},\"items\":[{\"id\":5,\"manual_order_id\":5,\"product_name\":\"Test Product 5\",\"quantity\":2,\"unit_price\":\"47.50\",\"total_price\":\"111.99\",\"created_at\":\"2026-07-29T01:09:47.000000Z\",\"updated_at\":\"2026-07-29T01:09:47.000000Z\"}]}',241.99,0.00,0.00,241.99,'paid',24,NULL,1,0,NULL,'2026-07-31 00:56:49','2026-07-31 00:56:49',NULL,0,NULL);
/*!40000 ALTER TABLE `receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_product_id_user_id_unique` (`product_id`,`user_id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(1,2),(1,13),(2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(9,1),(9,2),(10,1),(10,2),(11,1),(11,2),(12,1),(12,2),(13,1),(13,2),(14,1),(14,2),(15,1),(15,2),(15,13),(16,1),(16,2),(16,13),(17,1),(17,2),(17,13),(18,1),(18,2),(19,1),(19,2),(20,1),(20,2),(21,1),(21,2),(22,1),(22,2),(23,1),(23,2),(24,1),(24,2),(24,13),(25,1),(25,2),(26,1),(26,2),(27,1),(27,2),(28,1),(28,2),(29,1),(29,2),(30,1),(30,2),(31,1),(31,2),(32,1),(32,2),(33,1),(33,2),(34,1),(34,2),(35,1),(35,2),(36,1),(36,2),(37,1),(37,2),(38,1),(38,2),(39,1),(39,2),(40,1),(40,2),(41,1),(41,2),(42,1),(42,2),(43,1),(43,2),(44,1),(44,2),(45,1),(45,2),(46,1),(46,2),(47,1),(47,2),(48,1),(48,2),(48,13),(49,1),(49,2),(50,1),(50,2),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(57,1),(58,1),(59,1),(60,1),(60,2),(61,1),(61,2),(62,1),(63,1),(64,1),(64,2),(64,13),(65,1),(65,2),(65,13),(66,1),(66,2),(66,13),(67,1),(67,2),(68,1),(68,2),(69,1),(69,2),(69,13),(70,1),(70,2),(70,13),(71,1),(71,2),(71,13),(72,1),(72,2),(72,13);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Administrator','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(2,'Administrator','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(12,'Customer','web','2026-07-20 02:16:30','2026-07-20 02:16:30'),(13,'Logistics','web','2026-07-23 08:52:40','2026-07-23 08:52:40');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1A1Ww54JV9rTSaS222HaLdUjDZQx8LNE7X9T0nHU',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNURzbThjdWtDYUE1VnZkMG5USDJlanZkWXdhZ3F5RVZVWldzWWZidSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752224),('1ek327NKWD3cNGG31ziKlj4aYIyZMGXNEgLCXVfN',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVEY4SE9kY3lPbE43TVFETUFQZFBscjZCck9xdnZtcER6NG42NUdERSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752385),('2MdKI9P7B3RGQ8XDDauiRC8XTlAGvvoTZeeYl6AO',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidGRLQXlDMjJQUkhXd1dIajVNMVQ2Z1pFcjhLZHZFbTh6WnR6NjVyNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752390),('3iIEN0bQqgTWGzYHKVMCu7jzRWz3B98rfASy9jRt',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNzhGOEluVXlCSE9uV25GTlVuNDdzS0pOeE8za09qR1NOUkRuZVZNQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752467),('3sZmxu6FWVJ6sru9EoBIdN51QztJLrqYk2nhJLTN',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUpCV1JtTFRjcTBkdUFlSGlSelZiTElTYXZsSm0xUEVhRXR0Wk0zQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752225),('3xYkczsz4sfSqEcb3i2jOfXojBngFYAY4LqCRVKN',NULL,'10.10.0.237','Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYWREMkdPM3ZmYkNTbkpwYzdkUDdxN0hLWHUwT0lPSzdzeU5OQzM0WiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785753021),('4VnIWO32jLKMgDqQGdWFkulSrP0xq4nqwueAXbea',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiV3JxZmFGblBmdWtGOFU1WG1Ed09iSTFvTFRVZnZQRW1GM2ZEZGxHeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752390),('5m4yBKqlzlwUhUboDCYtwHbitO7dFYS9ygyOXroW',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiekJMbnJQWDJmWThOcFlTaDV5eGZXWW8xNzhYQTVyQ1FNZGVlMDFKZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752197),('6417sWrxPzOByA5qzhAk9WIRODq8Em0uM6JfveWu',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoic3dWRGhzV0pqOXlkR1o4Y2RYbUhKQnZUb2Z1bGJMd0tmcHpBNjQ3NiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752200),('AOhhVjdXjLt2BRrDTmWn4QGChP5PaxIrlXVvwcCq',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkRrbXlaZkpOWkhieGFmaVRmTzRKUnYzYTZJejlsWUFySU84aHFqMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752210),('aSTlbe8IJ3Lc1hv5Vhra1oaRTurOpDiuBc7ljNmI',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTk8xWmRUS1Y3dWlkaTdZTDB4eHVPM1p3cEV5QklyVzFLMWQ0VXM3RCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752224),('AWIrykIRBfqniXbFeOVS7rDI2InR1uneMFKcJu00',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVlZtU1BRd2l6RmVLMElndW5BYXE1empYQ3NFOEpGS0FqeEdVODVGeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785755907),('BcbKcouWg6X8IiFaGOr6QKfQRBJcXA5Qq5UAcHTx',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzNnYzFya0JvSTM3RzIyd1VtZFNoYjFPRlU3UUdJclE0NmYxSmFQNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752419),('c1Wjsz9Vkb52oBuWLoKyHkrl6nZyLLBTL5RcBWGD',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieVE3RWFaVDhYMFFQSnhlVGR5aFgxOUVTalBETlNDQzg0UHpmbzdMWSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752408),('ce8TxIr43KbLReKoiItjtupqNvc7cJpiO271uw4q',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGthRVFZS2ZoM3JKSVNBdlExUk1xbUFDd2ZaV1REeXYyN1JBNWFCUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752399),('cGdgNxIIdrcNMVaOPdQmEC1qqM7A38ZzVKd9NKVF',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWklzanc3RVo0YmdFNjJoRlR3OXBFUUg1emFXQlNNMWM3SXNjRDlCVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785755907),('Ct2hEknkxnTSQek6FbwdexRiWmYHZ1QacaCNB4To',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZThYNHF2dXZzTm1oQXVVdHZpUUg0b2I1bTRGVzE0NkYxTTNJcTZCZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752388),('d6PKO3awI28QNPePDk1J3J88ZPeM2T63m9T0LPUo',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidUNocXFZeTNpTnVwWkRXY3ZONGgyWUM4enNsaXhZbFhBYzdiUFd6bCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752224),('dy1dD9t2bQHbLMSfw6tNhQzr05rU7VhWNaB8y5Ll',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoibjVXVlpCOTA3OFVVdUFtcVlDY05TNVRUOElrZGFyQ1Z5eDhud2xydyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752427),('E4dfMR3QiUvRBpS7SDRZICvDJCfwz2maOdXoBH1U',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVFkTkdvb3hpSE02MVJrNndXbDZqVmtLVFRmT1RHZ1FkNzhFT09SdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752505),('glTnF0VLYrT0FPy1eUdyqZluyqZI9PkjgJNcNjro',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzJwQkU5em5OVEs1RmVQb1VLaXgwMm1TVldXY2ZwOTZTRnV4eW1ObiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752215),('HqrsdSpO4J2eqCmZO9BvYk1cNLJI2U0gk4YX21gP',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoicDdOWmZIbkZhUE5GNHB1WGlGZEVKanVaMW5CVWNKTjZvV3hOTEpUQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752409),('HShrK0FQSeAzNi1qzvKEOblVGJglMWlOdYr46W8Y',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidkcxZG43cVA3ZWtpV0xCM1VJTE45elBzcUhadGZTbXZxNUVpT0w1cCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752611),('Hx9AYaqZOPFs5rPD5RCc2NS6RE1Se926oZFmZLOM',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXd6QjlJckNOT2czV1EwV0M5ajV2bnI5U1NydENlSFBWQkhJWnBLTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752221),('hyNKLp3NtVC2RFYAPuhYBgJZFLTz3JO0lhWEAzim',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0xCNVlQUXVHcmVlVEVHdGI3TTFLano2bE8xdGEyZXc1cnhJUnJkViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785755919),('IN9qxH7NgwA7Y6ePvld0AJtPy99liJPkbkHR9Kcx',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YToyOntzOjY6Il90b2tlbiI7czo0MDoib09MUmNIYkNuS3dmS25XR1FvT0t3SnFaWXgzZTQ4YlgwZ2dYOFRIaiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1785752512),('iwN0kvuxDSN5lHpBacSsjkaZYVG9I3gAhvPkgTCL',NULL,'10.10.0.237','Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1','YToyOntzOjY6Il90b2tlbiI7czo0MDoiR21Eb0w1UWRyOVFNTG1yUE52dWhVaU1RQmZ6N3VlRnF0MHhyYWRkbiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1785752760),('JeTqe9eq7SILWuAWSS7lPYkxYzWLEsCNaQbwbD8k',NULL,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZUVnTjR0aXNsWXdZODg0NDcwc2V5TDVFQmZ6ZW4xbFRZOWRHUUhaOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNS9jb250YWN0IjtzOjU6InJvdXRlIjtzOjc6ImNvbnRhY3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YToxOntzOjg6ImludGVuZGVkIjtzOjM0OiJodHRwOi8vMTI3LjAuMC4xOjgwMDUvbWFudWFsLW9yZGVyIjt9czo1MjoibG9naW5fYWRtaW5fNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1785755920),('JRNzC8sMm1ScjzJJLrLgS6GvJobviXvvZljznTaT',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHhUVFRVaTNYMjN2T040cVA1NVdFeGRmTGxucnB5TkhZRkRPQlhhMSI7czoxNjoib3Blbl9sb2dpbl9tb2RhbCI7czo2OiJzaWduaW4iO3M6NjoiX2ZsYXNoIjthOjI6e3M6MzoibmV3IjthOjA6e31zOjM6Im9sZCI7YToxOntpOjA7czoxNjoib3Blbl9sb2dpbl9tb2RhbCI7fX19',1785752512),('jtSMwgLtn9O4upeasAayU3229emy3aXVD8Mc8XVo',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoic0tlcEhjdWdOQXlKd0g2T2JIZEx6Z2E3NHUycU5KMHNJMVNLS2N3RCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752427),('JUQgCGBkMr4Iowx7qRxGyFSU3PHvfofAZ9US2gpz',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2Q2TjRtcUR3ZlJJb1dhc085SVRhMkxFQ2YwQ3F5alhmbEJteXJXVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752211),('JxfmHAoo5LE9qkm3zUcyLCsn7oCg6n1hRHpZamEA',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVTNqSTJ3V2swS3J2RU5uNlU1ZW43NlJVcEdOd3hNTWNyV2NZTXIxWiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752224),('JxWnVIt7opqwaj81LHYf1hG4t5uraW88G4TjENDE',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZW1ONEFhTTc5bUpHMExmNWZBeklla1lmYmNWMmNkV21ocW5KZ2VhUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752410),('kPWLxPmnVmiei3WlSqA6QAPCy5SbflYDl2oP4ECy',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidVhKRmVCZ1JiRzB4SThYQ0M5czFxWENkOVZvM0RZVmg0OGVzT2x3VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752383),('l2wjZbcNCCpSSkjChyDGTiS6y3wMqlmUBomypmVE',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaU5qTzh6aGEyNDFTY0NEZGhqd3lRYmJzSzZvQ20wd3AyR2ZyclVKaSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752304),('Lkps9OZQGBmKuXBv0mzXm589HrNgsNlPn9VmZjOq',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmhMQnhWQk4zenNFMmY4NUNKSjF4YzVycWZVVUpuNXczV25CblloYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752278),('LkU8YYyUmCcxnXhXYCE921OV4EeEkDwoeHgiqALt',22,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVUVxWEhYdWp1RDRSb3dvYlZnZUxXcUd4YnVzaUpyTnpOMTBmVWZ2dyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjI7fQ==',1785751912),('LqdOdFofzK3bm6miZl1p7LLz1KCdZT1L7XfDYh9T',25,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNDA0ekFTOW5iTG9hUWZKc2t6b1FLOERqaTBGUmI4dFNieWlrUGJIQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNS9wcm9maWxlL2NvbXBsZXRlIjtzOjU6InJvdXRlIjtzOjE2OiJwcm9maWxlLmNvbXBsZXRlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjU7czo3OiJwcm9maWxlIjthOjE6e3M6MjU6InJlZGlyZWN0X2FmdGVyX2NvbXBsZXRpb24iO3M6MTM6Ii9tYW51YWwtb3JkZXIiO319',1785755919),('m0DJiZXKgxJGIlNA2ywxYdGMkgiSVYc1XLLVNuAk',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOHBEME13MEpwaVVBQm1FNFVHYUZXZG1BZU9Bbk9IcHpCc2w0U1JYSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752225),('M24f2sG7Fu4MCkCJjkg9wuqWwJQFtUDIQzS0gCfJ',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVNaSENWRjk4WGZrV3JaaVRWaTRXWHVIOXRTWloyV1RVTWk1NDlvVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752280),('mvq2QNAWeNikxi1ycqEaIqfoG9HqxL4w4mi4XR9J',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieDVXZ1hGcGNUcFhqS1M2SkFGTEZhRXAxQXNEbXdORlFpcDEzU1BZbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752213),('naAAsH5nE8Dq979c7UCTKJ4SofZo0twG5TB8JzuQ',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHhhUG5qV1R2TzdOQldYbEpkVVBpZDcxMmc4UVZBZnJpb044NGcwWSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752408),('NrAc7ZrfsA7d2x8xvHBycFkjWvtYD8QmSofVBroY',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiamtFU0dWYjFLQXE3T2ZNTWp0QzdTUjNTZFdwN0RTR3Rjakd4U2VhNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752302),('p2T8w6hj6sq0IUyNOjwA7KDwuabCPuXI07rX38pS',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidWFzQUxqVlpxUGY1NEJsbUVJc3NnQWRWd29Jd1JRUXpOWXZSbmc3VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752446),('POl52jvwcmeIBlYkSlftLNp5Cei8Q9bMJu1HAib8',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHJHS1c1WFNpS2lwMW9UdVVxemNrbjYzY1lrbjBzVVpFTXdsVWJmdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752410),('qdi2I3Cm6ka4A0qzG3qWtAmkm6BKslfsPLEqrLLw',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmFpNzhzYmNvS0lpWkVoQ1YzVllLRlNORDY0M0RxOVdraU9obnl4VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752390),('resyOvCH51NJEQcJKQIDIuc9qyhssq8RGGS76hKm',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnNTM2RMd1hSWUcwM29RbGlJVll2RFZBWnptT0hVdzVMMGpwYzZFSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752391),('RhG6AOhl4XYmbwFpoEWklBYrnlmetS2SNu9dB3XI',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNXFLUjhwMDl5MGRHZ3NySUJvOG1JclBabFQwYVFGV3VwMDQ2R2tlTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752227),('rrNIE9uta3t2J3EXTQH8kneVz5D6LH7u1WMo2HV0',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YToyOntzOjY6Il90b2tlbiI7czo0MDoiV2lHZ0Y5bmhwckVISGdiRGNQYkFSY2c4elBFV0dzaExTOGV4aTBYeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1785752584),('RTKI7CW3wfCCXMtH53YZM6d414GbK2kprW0M2DqU',19,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQ2s5Wk1LcXI0YWFNWHFFeUNmMnREUHVRNHdpdnlON0pvZkluaUdocSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTk7fQ==',1785751666),('RX9WgozdWarndHFJnztTQCzz3feDm0cK2SEPzgPL',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidWZOdDU1bXVjc0ZmYVo0Y1JGUkdYY3RYS1FCdjVoUHdQSFU4TnJNSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752438),('Shbd5gXc7YoYhrIt8Spvadzr5pgA3tPsz9hbflMY',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2dBZEMwSDg0QkJGNkpDZGtaRmFTR1Njb2NjcllMYWlCakFURVEzbiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752399),('Um9JwlJbBtrbKKcwqERnRnWvOFwDTYbT1nhRxmg9',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiU2tONWhLWVduYTFSZkxyYmVnYkNyVXdHbVF0TVprOHFSTUlUbGRzTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752391),('UwTiniKRi7prSKhsYIFYJJByauIKdkGUGlPKYjE8',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmp4Y210MVJOYzZ5dEQ1Vk1pUlAyVHNQUm9kUzAxSERVSGhBaVNibyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752384),('w6Sv90JWAe59t9uZ1Su5DWeFpVTGgVkhRE7TWUnG',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMXBGWncyZGVNcTNLQzlQQ0xOVU5RY3VuT2FtQlFPdXo1RmZnRHNxNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752223),('WFU0BFZ1rv97bUjz03BIIaZxosMOCO0nwdxPi794',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoicFkwVXdqbGJLZkp5Qk1oandMc1A4WmxDSW1iZmpiOHhqOTQ0c1hnMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752391),('WhkaQa9PU9DaFsWUowb5zK3hoRl2wo83iV3OQaho',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjk0dG1aVVlSM0taNEF3RzA2VG5SVGxnWjdSa3lHOGlpclNTcG81eSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752328),('wNsmq3cHpS34ksBG1QUeusnZ6qKZgaS0nPpSGxJt',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidDEyY29wWTRDb2VwU3lXTzNFSUpaSVE0bU5TbEtSZGdZYmxxeWV4eCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752213),('Wt6u5zhDhlpPx09oerr7FU0qzQcYgqjyqgrGMv86',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoibTh0MWd5bHU5ZWlPVzl5a1ZSMTRVSUNyMlFEb3l0YWtCNzlBTWhxayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752317),('WXlAz1c8jmHOadz8ZHAFUyUZMQvJWWsfFArNYHHg',NULL,'10.10.0.104','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGd2SEdNRHhseUNZWWNncHE4REVhcEVpd3NMeVp1Z3NnYXc4WEhiUSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNjoiaHR0cDovLzEwLjEwLjAuMjQyOjgwMDUvbWFudWFsLW9yZGVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1785752512),('XeZwTT3jKtEGM9maVWLSGR0556F4yRoqm5aeJJiI',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYW1KckJOUG5aYjhUWHpyd0U5ZjhtMmVsbE56Q1BjVThJNmFmMkRpZiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752387),('XjBZXKmnVav7VoT7m6fvpz3Zjy0dzHeD6P8tYe5A',NULL,'10.10.0.237','Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/23F84 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1RtUmxCa1hMbnViTXBhZmsyeUFKZGF3RGtQYkRNY01WbWdpNTJhNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752622),('ynnVFTCmqEYcP3Fc6CsEOlOXCUcZdXqTviVVMGlu',NULL,'10.10.0.237','Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMEhTMVh5TmRrVmZkcUtpTElpVnEzQmF2dVYweVpnT255T1hVWE5OTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752641),('Ys5amQUrOZz1GQhP0UeXlIMhJB93cJg03VZz4OS0',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVRWRkdtdUpmQ2pzaUtLSzNMR1p1T3NiWWY1UnVseVZUZWVVTktjaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752419),('zlNDlRWzg5pk1FBQpFuKMcDfuPFSDpOYecelOxLr',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQW9YYTBXVFVyUnlwRXhSeWlacmdsdE9jbEpSMU1PVmpsSXJPRWRNZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752350),('zR8l2veP4VuBj0b3NghO4YBSqKgQw35hXr65H7cR',NULL,'10.10.0.242','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVZKQkZjMGhiMDN3TXI0TVMySjNEOGNkdlJUMlVmM1pDNU9WeWV1SSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly8xMC4xMC4wLjI0Mjo4MDA1IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1785752390);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'general','store_name','MVM Logistic','2026-07-21 04:42:40','2026-07-26 10:00:53'),(2,'general','support_email','logistic@mvm.com','2026-07-21 04:42:40','2026-07-26 10:00:53'),(3,'general','support_phone','+855317669555','2026-07-21 04:42:40','2026-08-03 06:10:31'),(4,'general','currency','USD','2026-07-23 03:50:50','2026-07-23 03:50:50'),(5,'general','store_address','Lou Village, Svay Pak Commune, Russey Keo District, House No. 24B, Street 101','2026-07-21 04:42:40','2026-07-31 00:38:32'),(6,'theme_colors','primary_color','#4f46e5','2026-07-21 08:00:34','2026-07-21 08:00:34'),(7,'theme_colors','secondary_color','#0f172a','2026-07-21 08:00:34','2026-07-21 08:00:34'),(8,'theme_colors','bg_color','#f8fafc','2026-07-21 08:00:34','2026-07-21 08:00:34'),(9,'general','store_logo','/logo.png','2026-07-21 08:41:31','2026-07-23 01:34:40'),(10,'general','store_favicon','/favicon.png','2026-07-21 08:41:31','2026-07-23 01:34:40'),(11,'seo','meta_title','Rafel','2026-07-23 00:41:43','2026-07-23 00:41:43'),(12,'seo','meta_description','Welcome to our store','2026-07-23 00:41:43','2026-07-23 00:41:43'),(13,'seo','meta_keywords','ecommerce, store, shop','2026-07-23 00:41:43','2026-07-23 00:41:43'),(14,'seo','og_image',NULL,'2026-07-23 00:41:43','2026-07-23 00:41:43'),(15,'seo','twitter_handle','@store','2026-07-23 00:41:43','2026-07-23 00:41:43'),(16,'general','default_currency','USD','2026-07-23 03:50:50','2026-07-23 03:50:50'),(17,'general','about_title','About our company','2026-07-26 09:58:11','2026-07-26 09:58:11'),(18,'general','about_text','At MVM Logistics, we specialize in helping customers order products and deliver goods safely and efficiently between Vietnam and Cambodia. Whether you need assistance purchasing products, creating a manual order, or arranging cross-border shipping, our team provides reliable support every step of the way.\n\nOur website makes it easy to submit an order request, track deliveries, and communicate with our logistics team. Customers can also contact us directly for personalized assistance with sourcing products, transportation, customs coordination, and delivery arrangements.\n\nWe operate two warehouses to ensure faster processing and smoother logistics operations: one warehouse in Vietnam and one warehouse in Cambodia. This allows us to manage shipments efficiently in both directions, from Vietnam to Cambodia and Cambodia to Vietnam.\n\nAt MVM Logistics, our goal is to provide a simple, transparent, and dependable logistics experience—from your first request to your final doorstep delivery. Please view our Vietnam and Cambodia warehouse locations below for more information.','2026-07-26 09:58:11','2026-07-31 00:39:54'),(19,'general','social_1_name','Telegram','2026-07-26 09:58:11','2026-07-26 09:58:11'),(20,'general','social_1_url','','2026-07-26 09:58:11','2026-07-26 09:58:11'),(21,'general','social_1_icon','MessageCircle','2026-07-26 09:58:11','2026-07-26 09:58:11'),(22,'general','social_2_name','Facebook','2026-07-26 09:58:11','2026-07-26 09:58:11'),(23,'general','social_2_url','','2026-07-26 09:58:11','2026-07-26 09:58:11'),(24,'general','social_2_icon','Facebook','2026-07-26 09:58:11','2026-07-26 09:58:11'),(25,'general','social_3_name','Instagram','2026-07-26 09:58:11','2026-07-26 09:58:11'),(26,'general','social_3_url','','2026-07-26 09:58:11','2026-07-26 09:58:11'),(27,'general','social_3_icon','Instagram','2026-07-26 09:58:11','2026-07-26 09:58:11'),(28,'general','social_4_name','TikTok','2026-07-26 09:58:11','2026-07-26 09:58:11'),(29,'general','social_4_url','','2026-07-26 09:58:11','2026-07-26 09:58:11'),(30,'general','social_4_icon','Music','2026-07-26 09:58:11','2026-07-26 09:58:11'),(31,'general','home_banner_mode','slideshow','2026-07-26 16:34:04','2026-07-26 16:34:22'),(32,'general','social_links','[{\"name\":\"Telegram\",\"url\":null,\"icon\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/512\\/3488\\/3488463.png\"},{\"name\":\"Facebook\",\"url\":null,\"icon\":\"https:\\/\\/static.vecteezy.com\\/system\\/resources\\/previews\\/016\\/716\\/481\\/non_2x\\/facebook-icon-free-png.png\"},{\"name\":\"Instagram\",\"url\":null,\"icon\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/256\\/4782\\/4782335.png\"},{\"name\":\"TikTok\",\"url\":null,\"icon\":\"https:\\/\\/static.vecteezy.com\\/system\\/resources\\/thumbnails\\/016\\/716\\/450\\/small\\/tiktok-icon-free-png.png\"},{\"name\":\"Zalo\",\"url\":null,\"icon\":\"https:\\/\\/hidosport.vn\\/wp-content\\/uploads\\/2023\\/09\\/zalo-icon.png\"}]','2026-07-28 04:31:12','2026-07-31 00:32:32'),(33,'general','fab_email','mvmlogistic555@gmail.com','2026-07-28 04:31:12','2026-08-03 06:10:31'),(34,'general','fab_phone','+855317669555','2026-07-28 04:31:12','2026-08-03 06:10:31'),(35,'general','fab_messenger','https://www.youtube.com/','2026-07-28 04:31:12','2026-07-28 04:46:05'),(36,'general','fab_telegram','https://www.youtube.com/','2026-07-28 04:31:12','2026-07-28 04:46:05'),(37,'general','cambodia_map_embed_url','https://maps.google.com/maps?q=loc:11.6441475,104.9126435&z=17&output=embed','2026-07-28 04:31:12','2026-08-03 11:18:40'),(38,'general','cambodia_map_open_url','https://maps.app.goo.gl/22Bb8oBFDhVxrosV8?g_st=ic','2026-07-28 04:31:12','2026-08-03 06:12:44'),(39,'general','cambodia_map_address','Lou Village, Svay Pak Commune, Russey Keo District, House No. 24B, Street 101','2026-07-28 04:31:12','2026-07-28 07:26:58'),(40,'general','vietnam_map_embed_url','https://maps.google.com/maps?q=loc:11.076760,106.173980&z=17&output=embed','2026-07-28 04:31:12','2026-08-03 11:18:40'),(41,'general','vietnam_map_open_url','https://maps.app.goo.gl/aPY4XLhLnp1XYfKP9?g_st=ic','2026-07-28 04:31:12','2026-08-03 06:12:44'),(42,'general','vietnam_map_address','75A Ấp Thuận Tây, Xã Bến Cầu,Tỉnh Tây Ninh, Ap Ben Cau, Vietnam, 842980 ... TayNinh #, GC DutyFree','2026-07-28 04:31:12','2026-07-30 00:18:05'),(43,'general','fab_links','[{\"id\":\"ik2yxk5\",\"name\":\"Email\",\"url\":\"mailto:latoureiffel1802@gmail.com\",\"icon_url\":\"https:\\/\\/encrypted-tbn0.gstatic.com\\/images?q=tbn:ANd9GcShAwfImEJMk4uK6o_KsyIuPvGyXqKAHMhdphZS4lrSSYzGCy8qocMKtYU&s=10\"},{\"id\":\"3jil4hi\",\"name\":\"Phone\",\"url\":\"tel:+85593843699\",\"icon_url\":\"https:\\/\\/cdn-icons-png.flaticon.com\\/512\\/9946\\/9946341.png\"},{\"id\":\"ola7m7z\",\"name\":\"Messenger\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/www.iconpacks.net\\/icons\\/2\\/free-facebook-messenger-icon-2881-thumb.png\"},{\"id\":\"ssgxnzu\",\"name\":\"Telegram\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/commons\\/thumb\\/8\\/82\\/Telegram_logo.svg\\/960px-Telegram_logo.svg.png?_=20220101141644\"},{\"id\":\"zz281ea\",\"name\":\"Zalo\",\"url\":\"https:\\/\\/www.youtube.com\\/\",\"icon_url\":\"https:\\/\\/hidosport.vn\\/wp-content\\/uploads\\/2023\\/09\\/zalo-icon.png\"}]','2026-07-31 00:34:39','2026-07-31 02:57:47');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_login_providers`
--

DROP TABLE IF EXISTS `staff_login_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_login_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `provider` varchar(255) NOT NULL DEFAULT 'google',
  `authorized_email` varchar(255) NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `staff_login_providers_provider_authorized_email_unique` (`provider`,`authorized_email`),
  KEY `staff_login_providers_user_id_foreign` (`user_id`),
  KEY `staff_login_providers_authorized_email_index` (`authorized_email`),
  CONSTRAINT `staff_login_providers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_login_providers`
--

LOCK TABLES `staff_login_providers` WRITE;
/*!40000 ALTER TABLE `staff_login_providers` DISABLE KEYS */;
INSERT INTO `staff_login_providers` VALUES (1,1,'google','latoureiffel1802@gmail.com',1,'2026-07-28 04:40:49',NULL,'2026-07-28 04:40:49');
/*!40000 ALTER TABLE `staff_login_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonials` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `product_image_1` varchar(255) DEFAULT NULL,
  `product_image_2` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Sokha','testimonials/man.png','home.testimonial_1',NULL,NULL,5,1,0,'2026-08-02 09:48:56','2026-08-03 06:40:33'),(2,'Linh','testimonials/woman2.png','home.testimonial_2',NULL,NULL,5,1,0,'2026-08-02 09:48:57','2026-08-03 06:40:29'),(3,'Bora','testimonials/woman1.png','home.testimonial_3',NULL,NULL,5,1,0,'2026-08-02 09:48:57','2026-08-03 06:40:19');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_addresses`
--

DROP TABLE IF EXISTS `user_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_addresses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `address_line_1` varchar(1000) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `address_notes` text DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `user_addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_addresses`
--

LOCK TABLES `user_addresses` WRITE;
/*!40000 ALTER TABLE `user_addresses` DISABLE KEYS */;
INSERT INTO `user_addresses` VALUES (1,1,'Sensok\nPhnom Penh',NULL,'Phnom Penh',NULL,NULL,NULL,1,'2026-07-28 08:56:39','2026-07-28 08:56:39'),(2,15,'No. 25, Street 271','Sangkat Toul Tom Poung 2','Phnom Penh','Khan Chamkarmon',NULL,'Cambodia',1,'2026-07-28 08:56:39','2026-07-28 08:56:39'),(3,16,'125 Nguyen Hue Street','Ben Nghe Ward','Ho Chi Minh City','District 1',NULL,'Vietnam',1,'2026-07-28 08:56:39','2026-07-28 08:56:39'),(4,19,'Sensok\nPhnom Penh, Cambodia',NULL,'Phnom Penh',NULL,NULL,NULL,1,'2026-07-28 08:56:39','2026-07-28 08:56:39'),(5,21,'faf',NULL,'Phnom Penh',NULL,NULL,NULL,1,'2026-07-28 08:56:39','2026-07-28 08:56:39'),(6,22,'fdasf','dfa','af',NULL,'12000','423',1,'2026-07-28 08:56:39','2026-07-28 08:56:39');
/*!40000 ALTER TABLE `user_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firebase_uid` varchar(255) DEFAULT NULL,
  `customer_code` varchar(255) DEFAULT NULL,
  `member_code` varchar(12) DEFAULT NULL,
  `phone_e164` varchar(20) DEFAULT NULL,
  `telegram_username` varchar(255) DEFAULT NULL,
  `whatsapp_number` varchar(255) DEFAULT NULL,
  `messenger_contact` varchar(255) DEFAULT NULL,
  `address_line_1` text DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `country_code` varchar(2) DEFAULT NULL,
  `address_notes` text DEFAULT NULL,
  `preferred_locale` varchar(5) NOT NULL DEFAULT 'km',
  `profile_completed_at` timestamp NULL DEFAULT NULL,
  `profile_onboarding_skipped_at` timestamp NULL DEFAULT NULL,
  `profile_completion_reminder_dismissed_at` timestamp NULL DEFAULT NULL,
  `phone_verified_at` timestamp NULL DEFAULT NULL,
  `preferred_language` varchar(5) NOT NULL DEFAULT 'en',
  `preferred_currency` varchar(3) NOT NULL DEFAULT 'USD',
  `authentication_provider` varchar(255) NOT NULL DEFAULT 'password',
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `must_change_password` tinyint(1) NOT NULL DEFAULT 0,
  `firebase_provider` varchar(255) DEFAULT NULL,
  `account_status` varchar(255) NOT NULL DEFAULT 'active',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `avatar_source_url` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'customer',
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT 0,
  `demo_batch_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_firebase_uid_unique` (`firebase_uid`),
  UNIQUE KEY `users_member_code_unique` (`member_code`),
  UNIQUE KEY `users_phone_e164_unique` (`phone_e164`),
  UNIQUE KEY `users_customer_code_unique` (`customer_code`),
  KEY `users_is_demo_index` (`is_demo`),
  KEY `users_demo_batch_id_index` (`demo_batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'iu99xaMsmGUykqth1bxH9EngisM2',NULL,NULL,NULL,'dara',NULL,NULL,'Sensok\nPhnom Penh',NULL,'Phnom Penh',NULL,NULL,NULL,NULL,'km','2026-07-23 01:49:56',NULL,NULL,NULL,'en','USD','password',NULL,NULL,0,'google','active','2026-08-03 06:08:39','Dara Super Admin','admin@example.com',NULL,NULL,'/storage/avatars/WPZmeZqyXdLktkEpjDREcsmMZKpe9XiTGA76AxDO.png','avatars/WPZmeZqyXdLktkEpjDREcsmMZKpe9XiTGA76AxDO.png',NULL,1,'2026-07-18 18:43:35','super_admin','$2y$12$oMRMP9z/X57Kvynzcay9HefWWDG5et2LO60slJdmS7rLGZGGBuYyW','Bn0JoMjaeYat8dmuZU5yWYQlY7OKYUcsyHTxIOrOJKaZIwIQay01RI0POUJP','2026-07-18 18:43:35','2026-08-03 06:08:39',0,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'en','USD','google',NULL,NULL,0,NULL,'active',NULL,'Test User','test@example.com',NULL,NULL,NULL,NULL,NULL,0,'2026-07-18 18:43:35','customer','$2y$12$oLe6.0LLKHoSYlQ2vpfUluW9LXgoirWzCOfCwYA2q6oL33lDw7TIW','JyonItrj07','2026-07-18 18:43:35','2026-07-18 18:43:35',0,NULL),(15,NULL,'MVM-001',NULL,'+85512345678','@sokha_test',NULL,NULL,'No. 25, Street 271','Sangkat Toul Tom Poung 2','Phnom Penh','Khan Chamkarmon',NULL,'KH','Cambodia','km','2026-07-23 03:50:49',NULL,NULL,NULL,'km','USD','google',NULL,NULL,0,NULL,'active',NULL,'Sokha Test Customer','sokha.customer@example.test','sokha.customer@example.test',NULL,NULL,NULL,NULL,0,NULL,'customer','$2y$12$QqC0.MYbjON7j8im9vEntexfhBVmjRZGuA/diNBdTfAcHreGQTDKm','VdClGk2W7aTFsMYotXHBve3RSAc6gC0HFJ1r4ZEzy7J0pWUQjvcNuQFw03WR','2026-07-23 03:50:49','2026-08-03 07:01:10',1,'manual-order-demo-v1'),(16,NULL,'MVM-002',NULL,'+84912345678','@nguyen_test',NULL,NULL,'125 Nguyen Hue Street','Ben Nghe Ward','Ho Chi Minh City','District 1',NULL,'VN','Vietnam','vi','2026-07-23 03:50:49',NULL,NULL,NULL,'vi','VND','google',NULL,NULL,0,NULL,'active',NULL,'Nguyen An Test Customer','nguyen.customer@example.test','nguyen.customer@example.test',NULL,NULL,NULL,NULL,0,NULL,'customer','$2y$12$QqC0.MYbjON7j8im9vEntexfhBVmjRZGuA/diNBdTfAcHreGQTDKm',NULL,'2026-07-23 03:50:49','2026-08-03 07:03:04',1,'manual-order-demo-v1'),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'km','USD','password',NULL,NULL,0,NULL,'active','2026-07-25 00:31:03','Soporadara Rin','latoureiffel1802@gmail.com',NULL,NULL,'/storage/avatars/OcEgyskZjCXmxdujm67pX8ytG2X8Hn1bujuX1zPv.png','avatars/OcEgyskZjCXmxdujm67pX8ytG2X8Hn1bujuX1zPv.png',NULL,1,NULL,'super_admin','$2y$12$Tj0pLJcAQGO.cNCJlDYnouYHhRnxP0FK4oYKRqBlUv7aVVG8D.qCG','6E1iD8d8Ur9wRGr6K9fBg6Es2HSoiHwcvD8co4btp1iot0MivQZCG8EDexda','2026-07-23 03:50:49','2026-07-26 15:28:52',1,'manual-order-demo-v1'),(18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'km','USD','password',NULL,NULL,0,NULL,'active',NULL,'Demo Logistics Admin','admin@example.test',NULL,NULL,NULL,NULL,NULL,1,NULL,'admin','$2y$12$dPSD78i1ICye0eMhX2wl3u0jjfnn0H5En4o88DMfU7OyB8mz6xAbG',NULL,'2026-07-23 03:50:49','2026-07-23 03:50:49',1,'manual-order-demo-v1'),(19,'S9s139iI90QOkToN6pAOg3jITm52','MVM-003',NULL,'+85593843695','test',NULL,NULL,'Sensok\nPhnom Penh, Cambodia',NULL,'Phnom Penh',NULL,NULL,'KH',NULL,'en','2026-07-23 07:04:47',NULL,NULL,NULL,'en','USD','google',NULL,NULL,0,'google','active','2026-08-03 10:07:21','Dara DigitalKiuQ','digitalmedia10.kiuq@gmail.com',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocIkjS7LY9jxqTpNOnWZ-YXcN2bJ2QYA1T-PzTl11KgOXIKf1Vk=s96-c',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIkjS7LY9jxqTpNOnWZ-YXcN2bJ2QYA1T-PzTl11KgOXIKf1Vk=s96-c',0,'2026-07-24 04:37:41','customer',NULL,NULL,'2026-07-23 07:02:12','2026-08-03 10:07:21',0,NULL),(20,'LbeKb6Z2t5QZtviV2YyKCqZGAI22','MVM-004',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'km','USD','google',NULL,NULL,0,'google','active','2026-07-25 01:58:20','Dara GEMINI PRO','babucigalavits@gmail.com',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLiMhpzSM9aCp4xi5ebqpNxQLvyKpPP6h3FzhtwWLleJsvS2mc=s96-c',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLiMhpzSM9aCp4xi5ebqpNxQLvyKpPP6h3FzhtwWLleJsvS2mc=s96-c',0,NULL,'customer',NULL,NULL,'2026-07-25 01:58:20','2026-08-03 07:03:04',0,NULL),(21,NULL,NULL,NULL,'+85543534542',NULL,NULL,NULL,'faf',NULL,'Phnom Penh',NULL,NULL,'KH',NULL,'en','2026-07-25 03:30:15',NULL,NULL,NULL,'en','USD','password',NULL,NULL,0,NULL,'active','2026-07-25 02:25:17','Dara Gemini haha','sopoadararin01@gmail.com',NULL,NULL,NULL,NULL,NULL,0,'2026-07-25 03:29:33','customer','$2y$12$cITq8AzSAi/RGPC63tAr4.3RVqAskGHynI92kcY0PPF0dFlrUjOiC','uyvhAQmyaMuUdx3OFjvCWxh9rIocSqLJ7rDRQzV0ZKJKkQGlS1ih8aR17zJQ','2026-07-25 01:58:57','2026-07-25 03:30:15',0,NULL),(22,'GSOB72doE9MmRBghMjsvJuxlYVK2','MVM-005',NULL,'+8559999999','324',NULL,NULL,'fdasf','dfa','af',NULL,'12000','KH','423','en','2026-07-28 06:16:25',NULL,NULL,NULL,'en','USD','google',NULL,NULL,0,'google','active','2026-08-03 10:11:52','Soporadara Rin','soporadara@kiuq.com',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocK_DKKOh37IGTsYfSptUnzBkTnsBKeH1QqFBwJkr82kQ67MNw=s96-c',NULL,'https://lh3.googleusercontent.com/a/ACg8ocK_DKKOh37IGTsYfSptUnzBkTnsBKeH1QqFBwJkr82kQ67MNw=s96-c',0,'2026-07-28 06:14:52','customer',NULL,NULL,'2026-07-28 06:14:52','2026-08-03 10:11:52',0,NULL),(23,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'en','USD','password',NULL,NULL,0,NULL,'active',NULL,'Logis','logistic@gmail.com',NULL,NULL,NULL,NULL,NULL,1,NULL,'admin','$2y$12$uwjCN.If/tNUDiUDzChs9eNwoXCjuSk9LetN39UMA3y1HQluDm1UO',NULL,'2026-07-29 14:53:41','2026-08-03 06:50:11',0,NULL),(24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'en','USD','password',NULL,NULL,0,NULL,'active','2026-07-31 02:46:42','f','admin1@example.com',NULL,NULL,NULL,NULL,NULL,1,NULL,'admin','$2y$12$L7ikbSioMddr1ULz5PaEVODGea7/dXdxVdSo6ywTbVd6fmyp.dDIK','WKaF0RnzuXGtP9LD50vOFHt25Bloz27rNN8ljlRgmjoDkm1Pfhvx6fqSnwdX','2026-07-29 15:12:26','2026-08-03 06:50:11',0,NULL),(25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'km',NULL,NULL,NULL,NULL,'en','USD','password',NULL,NULL,0,NULL,'active',NULL,'Mary','mary@gmail.com',NULL,NULL,NULL,NULL,NULL,0,NULL,'customer','$2y$12$csKtKJdLjiOtq30Fwitx/.aT28DkyewznIVH22ZmmzOLsQHKnhZjW',NULL,'2026-08-03 10:26:58','2026-08-03 10:26:58',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-03 21:00:13
