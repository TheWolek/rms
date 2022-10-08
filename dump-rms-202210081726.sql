-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 51.83.128.108    Database: rms
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `assembleStationWork`
--

DROP TABLE IF EXISTS `assembleStationWork`;
/*!50001 DROP VIEW IF EXISTS `assembleStationWork`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `assembleStationWork` (
  `dishId` tinyint NOT NULL,
  `displayName` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `dishStatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `dish_categories`
--

DROP TABLE IF EXISTS `dish_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dish_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_displayName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_categories`
--

LOCK TABLES `dish_categories` WRITE;
/*!40000 ALTER TABLE `dish_categories` DISABLE KEYS */;
INSERT INTO `dish_categories` VALUES (1,'burgers'),(2,'fries'),(3,'drinks'),(4,'burger set');
/*!40000 ALTER TABLE `dish_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dishes` (
  `dishId` int NOT NULL AUTO_INCREMENT,
  `displayName` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `typesOfActivity` json DEFAULT NULL,
  `bunddleItems` json DEFAULT NULL,
  `isBunddle` tinyint NOT NULL,
  `available` tinyint NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`dishId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes`
--

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES (1,'cheeseburger',10,'[\"grill\", \"assemble\"]',NULL,0,1,1),(2,'small fires',5,'[\"fries\"]',NULL,0,1,2),(3,'large fries',8,'[\"fries\"]',NULL,0,1,2),(4,'small coke',5,'[\"drink\"]',NULL,0,1,3),(5,'large coke',8,'[\"drink\"]',NULL,0,1,3),(6,'cheesebuger small set',18,NULL,'[1, 2, 4]',1,1,4),(7,'hamburger',12,'[\"grill\", \"assemble\"]',NULL,0,1,1),(8,'bigMac',14,'[\"grill\", \"assemble\"]',NULL,0,1,1);
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishesInOrders`
--

DROP TABLE IF EXISTS `dishesInOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dishesInOrders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dishId` int NOT NULL,
  `orderId` int NOT NULL,
  `dishStatus` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishesInOrders`
--

LOCK TABLES `dishesInOrders` WRITE;
/*!40000 ALTER TABLE `dishesInOrders` DISABLE KEYS */;
/*!40000 ALTER TABLE `dishesInOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `drinkStationWork`
--

DROP TABLE IF EXISTS `drinkStationWork`;
/*!50001 DROP VIEW IF EXISTS `drinkStationWork`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `drinkStationWork` (
  `dishId` tinyint NOT NULL,
  `displayName` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `dishStatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `friesStationWork`
--

DROP TABLE IF EXISTS `friesStationWork`;
/*!50001 DROP VIEW IF EXISTS `friesStationWork`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `friesStationWork` (
  `dishId` tinyint NOT NULL,
  `displayName` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `dishStatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `grillStationWork`
--

DROP TABLE IF EXISTS `grillStationWork`;
/*!50001 DROP VIEW IF EXISTS `grillStationWork`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `grillStationWork` (
  `dishId` tinyint NOT NULL,
  `displayName` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `dishStatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `displayOrderId` int DEFAULT NULL,
  `paymentMethod` int NOT NULL,
  `takeAway` tinyint NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isClosed` tinyint NOT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (24,1,1,0,'done',1),(25,2,1,0,'done',1),(27,4,1,0,'done',1),(28,1,1,0,'done',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'rms'
--

--
-- Final view structure for view `assembleStationWork`
--

/*!50001 DROP TABLE IF EXISTS `assembleStationWork`*/;
/*!50001 DROP VIEW IF EXISTS `assembleStationWork`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dpp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `assembleStationWork` AS select `d`.`dishId` AS `dishId`,`d`.`displayName` AS `displayName`,`dio`.`id` AS `id`,`dio`.`dishStatus` AS `dishStatus` from (`dishesInOrders` `dio` join `dishes` `d` on((`dio`.`dishId` = `d`.`dishId`))) where ((json_value(`d`.`typesOfActivity`, '$' returning char(512)) like '%assemble%') and (`dio`.`dishStatus` = 'rdyToPck')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `drinkStationWork`
--

/*!50001 DROP TABLE IF EXISTS `drinkStationWork`*/;
/*!50001 DROP VIEW IF EXISTS `drinkStationWork`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dpp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `drinkStationWork` AS select `d`.`dishId` AS `dishId`,`d`.`displayName` AS `displayName`,`dio`.`id` AS `id`,`dio`.`dishStatus` AS `dishStatus` from (`dishesInOrders` `dio` join `dishes` `d` on((`dio`.`dishId` = `d`.`dishId`))) where ((json_value(`d`.`typesOfActivity`, '$' returning char(512)) like '%drink%') and ((`dio`.`dishStatus` = 'new') or (`dio`.`dishStatus` = 'inProg'))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `friesStationWork`
--

/*!50001 DROP TABLE IF EXISTS `friesStationWork`*/;
/*!50001 DROP VIEW IF EXISTS `friesStationWork`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dpp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `friesStationWork` AS select `d`.`dishId` AS `dishId`,`d`.`displayName` AS `displayName`,`dio`.`id` AS `id`,`dio`.`dishStatus` AS `dishStatus` from (`dishesInOrders` `dio` join `dishes` `d` on((`dio`.`dishId` = `d`.`dishId`))) where ((json_value(`d`.`typesOfActivity`, '$' returning char(512)) like '%fries%') and ((`dio`.`dishStatus` = 'new') or (`dio`.`dishStatus` = 'inProg'))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `grillStationWork`
--

/*!50001 DROP TABLE IF EXISTS `grillStationWork`*/;
/*!50001 DROP VIEW IF EXISTS `grillStationWork`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dpp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `grillStationWork` AS select `d`.`dishId` AS `dishId`,`d`.`displayName` AS `displayName`,`dio`.`id` AS `id`,`dio`.`dishStatus` AS `dishStatus` from (`dishesInOrders` `dio` join `dishes` `d` on((`dio`.`dishId` = `d`.`dishId`))) where ((json_value(`d`.`typesOfActivity`, '$' returning char(512)) like '%grill%') and ((`dio`.`dishStatus` = 'new') or (`dio`.`dishStatus` = 'inProg'))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-08 17:26:34
