-- MySQL dump 10.13  Distrib 8.3.0, for Linux (aarch64)
--
-- Host: localhost    Database: bank
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auths`
--

DROP TABLE IF EXISTS `auths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auths` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` float NOT NULL DEFAULT '0',
  `profilePublicId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cccd` varchar(255) DEFAULT NULL,
  `isAdmin` int DEFAULT NULL,
  `homeAddress` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailVerificationToken` varchar(255) DEFAULT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetExpires` datetime NOT NULL DEFAULT '2024-05-07 05:00:05',
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `auths_phone` (`phone`),
  UNIQUE KEY `auths_email` (`email`),
  UNIQUE KEY `auths_email_verification_token` (`emailVerificationToken`),
  KEY `auths_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES ('0feed943-0c4f-4c01-833b-80b4a33fb89a','Golda72','kXdxxLQpEkqBtVw',0,'c7d42591-01f0-4daa-9fa9-2f7cc0ceb259','Icie49@hotmail.com','488.721.4295 x6151','989981491010',0,'13226 Woodland Road','https://avatars.githubusercontent.com/u/11630697','29bba38cdd8022e7442dd56ed2f5c1fa50f2084f',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('114caa09-88e9-4559-828e-ec3c6b1176fd','Lucile.Veum','HdD03PItf1a951k',0,'933315f3-4daa-4476-b747-9e876dfefec7','Jaylan.Dooley71@gmail.com','(334) 496-9529 x8970','393932161117',0,'43686 Tremblay Ridge','https://avatars.githubusercontent.com/u/192520','e5e6c9514ca277ce0421a4702b55a38a7af269de',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('551ec8fe-767b-4122-84e0-171f258fbc7d','Laverne.Harvey','bDdwAsfU76xR3z7',0,'5aad62e0-8283-4423-ade4-1baa0759a6b3','Melba90@gmail.com','1-718-201-8776 x5257','938604762142',0,'928 Bay Street','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/822.jpg','31184682c5679bcba741a5abd83cafc4bae59939',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('64afb48f-6339-4631-8e1d-dbcfcc3ec121','Jason.Runolfsson59','MILiYQWCz3Sy7aC',0,'92895e07-f2e1-44b6-bd77-a6091d7089c1','Otis_Mayer@hotmail.com','496-586-8547','397105441940',0,'362 W North Street','https://avatars.githubusercontent.com/u/15518899','eb7e2d0065321366fc1aac8cbef250628845a725',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('7f504727-75d0-4074-b85f-c032291b976c','test2','$2a$10$LygZ8iKhTlzEORMZmMlKWO97g8BAW6zDRb.LvGylqtUuy2PlCI0..',0,'334172b6-07b2-4ba5-be77-cf0b98d2f804','test2@gmail.com','0938555506','0938555506',0,'quan 12','http://res.cloudinary.com/dg3fsapzu/image/upload/v1720332081/bank/u7mgf0z9hiszbddqgeto.jpg','247a8c9a5172aa86883d15c98729b0ff673cd822',0,'2024-07-07 06:01:21',NULL,'2024-07-07 05:42:06','2024-07-07 06:01:21'),('80101396-273b-4637-9b17-b39fdf9c1540','quan0401','$2a$10$wpw.ZIPWu4RyPzY2p9Q4lOSB9GtMLHBINxYcCe.QnA6QLw0tXc0rK',0,'2d7da422-e45f-47c7-a569-08acdeac5d82','dongminhquan2004@gmail.com','09385055050','079027608',1,'q12 HCM','http://res.cloudinary.com/dg3fsapzu/image/upload/v1717566384/bank/qflzb8ty7wo3vqtdemvv.jpg','71994cd48e30a6fff70b933a5e445e4c869e6856',1,'2024-06-05 05:46:24',NULL,'2024-06-05 04:55:19','2024-06-05 05:46:24'),('83ece86a-018d-43b8-b422-a5f78b61fc91','test0401','$2a$10$77nsoCa6Jh9M8rqw4/10/.tPQ.BeC9ZbKA..o/vv0jrZmW/4cSTTi',0,'57f22928-18fb-4f05-aa3c-b98ad0ca493f','test@gmail.com','09385555505','079204027608',0,'52 Nguyen Van Cu, Long Bien, Ha Noi','http://res.cloudinary.com/dg3fsapzu/image/upload/v1717681780/bank/aa44ka8favua6knxplbk.jpg','aaede32543225b0825b5ed97762693577b4aa68b',0,'2024-06-06 13:49:41',NULL,'2024-06-06 07:31:23','2024-06-06 13:49:41'),('8b53dcee-b575-4d36-9ef8-fb83b027f200','Mckenna9','2hUGI0UiLTAaHKW',0,'c9c9f1d2-7180-46ae-a9ab-fe47ca6d88c5','Annamarie.Homenick@hotmail.com','1-797-405-9819 x1454','510746255747',0,'104 Pietro Points','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/569.jpg','b0141d4c96c7af4cf9fc922160f429b214aeb22f',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('a51893a9-44ba-423b-bd8f-a10f6247dda0','Skylar.Boyle','t126SGpvSDnZbas',0,'0e67e83b-b40f-4290-a332-c6b40f425f55','Ova_Wilkinson@yahoo.com','(408) 316-7647 x481','458728979647',0,'961 Cross Lane','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/754.jpg','87c9649d1a165a3b714fba73bb7e88efcc329af5',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('e5a06b6b-af1f-4b40-b4b6-7b58a262948d','Samson.Krajcik42','fbVv3Ab5Lb6lJHA',0,'deaa8893-784e-4b6b-810a-f70b5a6fd5a0','Unique.Hoppe72@hotmail.com','(817) 983-0494','712866295934',0,'555 Church Street','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1180.jpg','d84446a37a2e7876b5c38426b000616925c5a14d',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('e7ce16e7-c658-4959-82df-326ad8c46900','Michael.Prohaska22','sJmxXjK2dKW0Rql',0,'48ea6362-bf1d-4b8d-a2fd-ac41222e002a','Eloisa.Kilback@hotmail.com','906.618.6356 x3806','101125886479',0,'966 Lindgren Expressway','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/218.jpg','b657030fb14d9eb3ca6d2879e9de73271883cbbd',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('fb8073c1-eb71-4da1-8152-fef889ad0db1','Lou_Little','IDOmMloif93TvVe',0,'c8c4dc52-7d62-4c76-9a1a-f0a41db45dc3','Judson18@hotmail.com','995-252-6943','519015948656',0,'259 Ash Close','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/142.jpg','032e5bdc59679254e9d27d0ed8627d6b65f02fc4',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32'),('fbce35e0-da09-4d28-b31e-db254991906e','Richard.Simonis17','WzNEgS0CBRgYlnC',0,'a309d200-eb6d-4023-ba84-2d06b33c925d','Celestino.Kiehn@hotmail.com','1-880-996-4444','273335057164',0,'812 Muller View','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1209.jpg','fee725cb8fe2a5c7ee6d887628328717a9111389',0,'2024-07-02 10:17:32',NULL,'2024-07-02 10:17:20','2024-07-02 10:17:32');
/*!40000 ALTER TABLE `auths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankAccounts`
--

DROP TABLE IF EXISTS `bankAccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankAccounts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `accountHolder` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `ownerAddress` varchar(255) DEFAULT NULL,
  `ownerContact` varchar(255) DEFAULT NULL,
  `accountType` varchar(255) DEFAULT NULL,
  `currency` varchar(255) NOT NULL DEFAULT 'VND',
  `branch` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankAccounts`
--

LOCK TABLES `bankAccounts` WRITE;
/*!40000 ALTER TABLE `bankAccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankAccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation_participants`
--

DROP TABLE IF EXISTS `conversation_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation_participants` (
  `conversationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` enum('member','admin') DEFAULT 'member',
  `notificationsEnabled` tinyint(1) DEFAULT '1',
  `addedAt` datetime DEFAULT NULL,
  `addedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`conversationId`,`userId`),
  KEY `addedBy` (`addedBy`),
  KEY `conversation_participants_conversation_id` (`conversationId`),
  KEY `conversation_participants_user_id` (`userId`),
  CONSTRAINT `conversation_participants_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`),
  CONSTRAINT `conversation_participants_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `auths` (`id`),
  CONSTRAINT `conversation_participants_ibfk_3` FOREIGN KEY (`addedBy`) REFERENCES `auths` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation_participants`
--

LOCK TABLES `conversation_participants` WRITE;
/*!40000 ALTER TABLE `conversation_participants` DISABLE KEYS */;
INSERT INTO `conversation_participants` VALUES ('d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','member',1,'2024-07-06 17:54:48',NULL),('d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','83ece86a-018d-43b8-b422-a5f78b61fc91','member',1,'2024-07-06 17:54:48',NULL),('fe675188-7902-4573-b533-f0e726604129','7f504727-75d0-4074-b85f-c032291b976c','member',1,'2024-07-07 07:09:49',NULL),('fe675188-7902-4573-b533-f0e726604129','80101396-273b-4637-9b17-b39fdf9c1540','member',1,'2024-07-07 07:09:49',NULL);
/*!40000 ALTER TABLE `conversation_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('private','group') DEFAULT 'private',
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES ('d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','private',NULL,NULL,NULL,'2024-07-06 17:54:48','2024-07-06 17:54:48'),('fe675188-7902-4573-b533-f0e726604129','private',NULL,NULL,NULL,'2024-07-07 07:09:49','2024-07-07 07:09:49');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_statuses`
--

DROP TABLE IF EXISTS `message_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_statuses` (
  `messageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('sent','delivered','read','deleted') DEFAULT 'sent',
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`messageId`,`userId`),
  UNIQUE KEY `message_statuses_userId_messageId_unique` (`messageId`,`userId`),
  KEY `message_statuses_message_id` (`messageId`),
  KEY `message_statuses_user_id` (`userId`),
  CONSTRAINT `message_statuses_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_statuses_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `auths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_statuses`
--

LOCK TABLES `message_statuses` WRITE;
/*!40000 ALTER TABLE `message_statuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `conversationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `messageText` text,
  `messageType` enum('text','image','video','file','link','audio') DEFAULT 'text',
  `mediaUrl` varchar(255) DEFAULT NULL,
  `status` enum('sent','delivered','read','deleted') DEFAULT 'sent',
  `sentAt` datetime DEFAULT NULL,
  `editedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conversationId` (`conversationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `auths` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('0a1ed711-e93c-4350-addd-3dc2455774be','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','83ece86a-018d-43b8-b422-a5f78b61fc91','hi from test','text',NULL,'sent','2024-07-07 05:57:06',NULL,NULL,'2024-07-07 05:57:06','2024-07-07 05:57:06'),('13319993-5597-4493-8bc8-240b7a6a486c','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi','text',NULL,'sent','2024-07-07 05:52:40',NULL,NULL,'2024-07-07 05:52:40','2024-07-07 05:52:40'),('15bc80b8-42db-4e4c-a00a-ca9ea9d0e78f','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi from quan0401 3','text',NULL,'sent','2024-07-07 05:56:54',NULL,NULL,'2024-07-07 05:56:54','2024-07-07 05:56:54'),('2e80ba69-8b92-4010-906d-dcffa73e3d4e','fe675188-7902-4573-b533-f0e726604129','80101396-273b-4637-9b17-b39fdf9c1540','hi test2 im quan0401, what do you need','text',NULL,'sent','2024-07-07 07:19:30',NULL,NULL,'2024-07-07 07:19:30','2024-07-07 07:19:30'),('5962590d-f4f7-4244-89dc-f6c9c1fd59dd','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi from quan0401 1','text',NULL,'sent','2024-07-07 05:56:15',NULL,NULL,'2024-07-07 05:56:15','2024-07-07 05:56:15'),('678c984f-fa8a-4a5a-886b-82f496193074','fe675188-7902-4573-b533-f0e726604129','7f504727-75d0-4074-b85f-c032291b976c','Connected with admin','text',NULL,'sent','2024-07-07 07:09:49',NULL,NULL,'2024-07-07 07:09:49','2024-07-07 07:09:49'),('bfc0e2e6-e104-498f-86d3-f31856822bba','fe675188-7902-4573-b533-f0e726604129','7f504727-75d0-4074-b85f-c032291b976c','i dont know bro','text',NULL,'sent','2024-07-07 07:19:37',NULL,NULL,'2024-07-07 07:19:37','2024-07-07 07:19:37'),('cc15c093-726d-41f2-b5fb-fd8b0f1245f1','fe675188-7902-4573-b533-f0e726604129','80101396-273b-4637-9b17-b39fdf9c1540','what do you mean you dont know bro','text',NULL,'sent','2024-07-07 07:19:47',NULL,NULL,'2024-07-07 07:19:47','2024-07-07 07:19:47'),('d66f6b9d-2c68-4b32-90cf-bf9b588710b3','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi from quan0401 4','text',NULL,'sent','2024-07-07 06:57:34',NULL,NULL,'2024-07-07 06:57:34','2024-07-07 06:57:34'),('d6a12427-7ba3-4d6e-a5d1-3488e1571c80','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','Hello, this is a test message!','text',NULL,'sent','2024-07-06 17:54:48',NULL,NULL,'2024-07-06 17:54:48','2024-07-06 17:54:48'),('dd12355e-b0d6-48cc-a183-e27287247111','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi from quan 0401 2','text',NULL,'sent','2024-07-07 05:56:27',NULL,NULL,'2024-07-07 05:56:27','2024-07-07 05:56:27'),('e4923cad-ff75-4dfe-8c9b-ebc64c29f32e','d2cbd9a5-aa87-430c-bf7d-64d9bb3b865c','80101396-273b-4637-9b17-b39fdf9c1540','hi from quan0401','text',NULL,'sent','2024-07-07 05:55:48',NULL,NULL,'2024-07-07 05:55:48','2024-07-07 05:55:48');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savingPlans`
--

DROP TABLE IF EXISTS `savingPlans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savingPlans` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `termPeriod` int NOT NULL,
  `minimumBalance` float NOT NULL,
  `maximumBalance` float NOT NULL,
  `minimumEachTransaction` float NOT NULL,
  `maximumEachTransaction` float DEFAULT NULL,
  `interestRate` float NOT NULL,
  `interestRateBeforeDueDate` float NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `basicDescription` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `currency` varchar(255) NOT NULL DEFAULT 'VND',
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savingPlans`
--

LOCK TABLES `savingPlans` WRITE;
/*!40000 ALTER TABLE `savingPlans` DISABLE KEYS */;
INSERT INTO `savingPlans` VALUES ('26f947d0-180e-4d45-866c-4ab799f339d7',3,10000,1000000000,50000,1000000000,5,1,'3 month saving package','3 month saving package is a saving plan for 3 months. Bringing attractive profit for the customers in the short period of time.','Flexible saving plan.',1,'2024-05-07 00:00:00',NULL,'VND','#007BFF','2024-06-05 07:16:04','2024-06-05 07:16:04',0),('5f51d137-c9e5-4a9b-a680-d42c8686e296',5,50000,50000000,50000,1000000,9,1,'High Interest Saving','High Interest Saving Plan for everyone','High Interest ',1,'2024-07-02 05:42:52','2024-07-02 05:42:52','VND','#5d5952','2024-07-02 05:43:04','2024-07-02 05:43:04',0),('80f54ea3-29e2-43e9-8d88-457ce207e685',0,10000,1000000000,50000,1000000000,0.5,1,'No due date saving package','No due date month saving package is the most versitile a saving plan. Bringing attractive profit for the customers in the short period of time.','Most Flexible',1,'2024-05-07 00:00:00',NULL,'VND','#00C49F','2024-06-05 07:21:00','2024-06-05 07:21:00',0),('a924c8f7-a8ce-4dab-8b48-9ec349baedde',12,50000,50000000,50000,1000000,4,1,'High Interest Saving','High Interest Saving Plan for everyone','High Interest ',1,'2024-07-02 05:43:23','2024-07-02 05:43:23','VND','#ebb08c','2024-07-02 05:43:59','2024-07-02 05:43:59',0),('b98b3aee-3001-4128-a7b1-3ecca8776ce6',1,10000,1000000000,50000,1000000000,4.7,1,'1 month saving package','1 month saving package is a saving plan for 1 months. Bringing attractive profit for the customers in the short period of time.','Should use',1,'2024-05-07 00:00:00',NULL,'VND','#8884d8','2024-06-05 07:17:18','2024-06-05 07:17:18',0),('cfeaccd8-0559-4a33-b2e1-88a03b4024b9',6,10000,1000000000,50,1000000000,5.5,1,'5 month saving package','5 month saving package is a saving plan for 5 months. Bringing attractive profit for the customers in the short period of time.','Attractive interest rate.',1,'2024-05-07 00:00:00',NULL,'VND','#FFBB28','2024-06-05 07:13:35','2024-06-05 07:13:35',0);
/*!40000 ALTER TABLE `savingPlans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240705055015-add-hasWithdraw-to-transactions.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bankAccountId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `savingPlanId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount` float NOT NULL,
  `isSuccessful` tinyint NOT NULL,
  `transactionDate` datetime NOT NULL,
  `scheduledDate` datetime DEFAULT NULL,
  `transactionType` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hasWithdrawn` tinyint(1) NOT NULL DEFAULT '0',
  `withDrawFromId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `withDrawId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `auths` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('01b627df-9c56-43dd-a4de-d3c3e7f25afa','80101396-273b-4637-9b17-b39fdf9c1540','momo','cfeaccd8-0559-4a33-b2e1-88a03b4024b9',100000,1,'2024-07-02 02:32:31',NULL,1,'2024-07-02 02:32:32','2024-07-05 09:07:20',1,'','d1934d4d-72f5-4c77-9271-9e62900602d7'),('0fc19215-69a5-441b-b4fc-f6df379c0751','80101396-273b-4637-9b17-b39fdf9c1540','momo','5f51d137-c9e5-4a9b-a680-d42c8686e296',100000,1,'2024-07-05 09:28:26',NULL,-1,'2024-07-05 09:28:26','2024-07-05 09:28:26',0,'2a7fa085-7af7-497c-9bfa-a7b481abe626',NULL),('2a7fa085-7af7-497c-9bfa-a7b481abe626','80101396-273b-4637-9b17-b39fdf9c1540','momo','5f51d137-c9e5-4a9b-a680-d42c8686e296',100000,1,'2024-07-05 09:28:17',NULL,1,'2024-07-05 09:28:18','2024-07-05 09:28:26',1,NULL,'0fc19215-69a5-441b-b4fc-f6df379c0751'),('38bcdf19-4402-4f3f-8acd-81d0b7136fcd','80101396-273b-4637-9b17-b39fdf9c1540','momo','cfeaccd8-0559-4a33-b2e1-88a03b4024b9',10000,1,'2024-07-02 04:42:10',NULL,1,'2024-07-02 04:42:10','2024-07-02 04:42:10',0,NULL,NULL),('49da804a-4b8a-47e1-9f39-85f639a9eb58','80101396-273b-4637-9b17-b39fdf9c1540','momo','b98b3aee-3001-4128-a7b1-3ecca8776ce6',100000,1,'2024-07-02 04:41:54',NULL,1,'2024-07-02 04:41:54','2024-07-02 04:41:54',0,NULL,NULL),('5cadaad6-f6d7-4265-ac72-ced6761269fe','80101396-273b-4637-9b17-b39fdf9c1540','momo','26f947d0-180e-4d45-866c-4ab799f339d7',100000,1,'2024-07-05 09:20:37',NULL,-1,'2024-07-05 09:20:37','2024-07-05 09:20:37',0,'9c3707ec-5e8e-4a7b-be5d-bf5f2f3fc4a1',NULL),('7e0eaa49-1ce3-433f-af5c-cc0231939cfd','80101396-273b-4637-9b17-b39fdf9c1540','momo','b98b3aee-3001-4128-a7b1-3ecca8776ce6',1000000,1,'2024-06-11 12:52:39',NULL,1,'2024-06-11 12:52:39','2024-06-11 12:53:00',0,NULL,NULL),('9992d991-3f81-4345-8797-1cc55389c2ec','80101396-273b-4637-9b17-b39fdf9c1540','momo','b98b3aee-3001-4128-a7b1-3ecca8776ce6',50000,1,'2024-07-02 05:24:55',NULL,1,'2024-07-02 05:24:55','2024-07-02 05:24:55',0,NULL,NULL),('9c3707ec-5e8e-4a7b-be5d-bf5f2f3fc4a1','80101396-273b-4637-9b17-b39fdf9c1540','momo','26f947d0-180e-4d45-866c-4ab799f339d7',100000,1,'2024-07-02 04:33:09',NULL,1,'2024-07-02 04:33:10','2024-07-05 09:20:37',1,NULL,'5cadaad6-f6d7-4265-ac72-ced6761269fe'),('ca612154-1463-4414-b098-07afd07b7e62','80101396-273b-4637-9b17-b39fdf9c1540','momo','26f947d0-180e-4d45-866c-4ab799f339d7',50000,1,'2024-07-05 09:25:35',NULL,-1,'2024-07-05 09:25:35','2024-07-05 09:25:35',0,'ff3a0674-e72f-4cc1-ba40-d8e293d36e8c',NULL),('d1934d4d-72f5-4c77-9271-9e62900602d7','80101396-273b-4637-9b17-b39fdf9c1540','momo','cfeaccd8-0559-4a33-b2e1-88a03b4024b9',100000,1,'2024-07-05 09:07:20',NULL,-1,'2024-07-05 09:07:20','2024-07-05 09:07:20',0,'01b627df-9c56-43dd-a4de-d3c3e7f25afa',NULL),('f853fca6-6cc6-4b51-8eaa-23f6760f8c32','80101396-273b-4637-9b17-b39fdf9c1540','momo','80f54ea3-29e2-43e9-8d88-457ce207e685',102296,1,'2024-07-06 12:58:07',NULL,1,'2024-07-06 12:57:30','2024-07-06 12:58:07',0,NULL,NULL),('fa1c611a-a3c8-47d0-990b-9a9194d49ba4','80101396-273b-4637-9b17-b39fdf9c1540','momo','26f947d0-180e-4d45-866c-4ab799f339d7',151417,1,'2024-07-06 04:06:19',NULL,1,'2024-04-05 16:26:55','2024-07-06 04:06:19',0,NULL,NULL),('ff3a0674-e72f-4cc1-ba40-d8e293d36e8c','80101396-273b-4637-9b17-b39fdf9c1540','momo','26f947d0-180e-4d45-866c-4ab799f339d7',50000,1,'2024-07-05 09:25:25',NULL,1,'2024-07-05 09:25:26','2024-07-05 09:25:35',1,NULL,'ca612154-1463-4414-b098-07afd07b7e62');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userSavings`
--

DROP TABLE IF EXISTS `userSavings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userSavings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `savingPlanId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `totalAmount` float NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2024-06-11 05:18:52',
  `currency` varchar(255) NOT NULL DEFAULT 'VND',
  `targetAmount` float DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`userId`,`savingPlanId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userSavings`
--

LOCK TABLES `userSavings` WRITE;
/*!40000 ALTER TABLE `userSavings` DISABLE KEYS */;
INSERT INTO `userSavings` VALUES ('518122da-a79f-4119-8e32-2c24874d6b10','80101396-273b-4637-9b17-b39fdf9c1540','5f51d137-c9e5-4a9b-a680-d42c8686e296',0,'2024-07-05 09:05:55','VND',NULL,'2024-07-05 09:28:26',2),('56abd8c4-aa11-4cc7-9a3b-be7f625d28c6','80101396-273b-4637-9b17-b39fdf9c1540','26f947d0-180e-4d45-866c-4ab799f339d7',151417,'2024-07-01 17:05:01','VND',NULL,'2024-07-06 04:06:19',16),('8caf4d9e-c0f4-4b95-ab38-56cde38796fe','80101396-273b-4637-9b17-b39fdf9c1540','cfeaccd8-0559-4a33-b2e1-88a03b4024b9',10000,'2024-07-01 17:05:01','VND',NULL,'2024-07-05 09:07:20',3),('e3c720ca-4185-4dab-ad69-26c9ebeb50b3','80101396-273b-4637-9b17-b39fdf9c1540','b98b3aee-3001-4128-a7b1-3ecca8776ce6',1150000,'2024-06-11 08:25:08','VND',NULL,'2024-07-02 05:24:55',3),('e695abd7-8b13-4db9-b60b-36b8de1702d3','80101396-273b-4637-9b17-b39fdf9c1540','80f54ea3-29e2-43e9-8d88-457ce207e685',102296,'2024-07-06 12:56:42','VND',NULL,'2024-07-06 12:58:07',2);
/*!40000 ALTER TABLE `userSavings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-07  7:31:11
