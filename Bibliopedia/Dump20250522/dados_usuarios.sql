-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dados
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `NomeUsuario` varchar(45) DEFAULT NULL,
  `EmailUsuario` varchar(45) DEFAULT NULL,
  `SenhaUsuario` varchar(450) DEFAULT NULL,
  `ImagemUsuario` longblob,
  `StatusUsuario` tinyint(1) DEFAULT '0',
  `TypeClient` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (11,'Lai','jose@gmail.com','pbkdf2:sha256:600000$atQz3quOGIQgKBki$8f86c1cae94470d5af0609d50909e6149364309938127569873e2fbb6c1d6fcb',NULL,NULL,''),(13,'David','david@gmail.com','pbkdf2:sha256:600000$ZQkyWnUVTScIW3aN$b164234fc4dd8b9243669ba0f9a8b6988460d703c46a1ac52864b130fc3a280a',NULL,NULL,''),(14,'Teste2','teste@gmail.com','pbkdf2:sha256:600000$EzuVGxtiGPKmCbfF$d82eb4bcad22112810aba72bca195d2b71f9924ef2d65f3b6bb3491fc97ab192',NULL,NULL,''),(18,'Teste5','test5e@gmail.com','pbkdf2:sha256:600000$Oy4JPBbWJQtA7Njz$0b075c0f1db9bd2d20bcf0bd465df89d99ef0fa304656947f18cb621a75899cd',NULL,NULL,''),(19,'Felipe Souza','felipe@gmail.com','pbkdf2:sha256:600000$ChV51Z5XdgnfA1R0$e9c65882cf5160f6da607a493ddd139fb30b0138762ec93cb95ae78f40c34371',NULL,NULL,''),(20,'Luiz','luiz@gmail.com','pbkdf2:sha256:600000$5bEAh3e7S5zWoJpk$fafcd62e90c44e813097e33760f89c9b64ebce899d7e021fdde8019c3ed7cf76',NULL,NULL,''),(21,'testando','felipeSo@gmail.com','pbkdf2:sha256:600000$vEZwDxNM2ZxWmbFa$1fdf6bcb95e298babbf110336b21cd636b410a0f52f5d078e386926bca7806c0',NULL,NULL,''),(29,'Teste15','teste15@gmail.com','pbkdf2:sha256:600000$2GcULbnvBnwNRk8e$dc1c53c831a0df19d3896562b6692e55070fc0e566935a03f2774bcde10699ee',NULL,NULL,''),(30,'TesteImagem','Imagem@gmail.com','pbkdf2:sha256:600000$PyAV9RP3gd66cSke$c46b56e8f0f99cbe194b4404f05f3999f1608878d1b5484c78925b61928b3fbc',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',NULL,''),(31,'Exgeass','Exgeass@gmail.com','pbkdf2:sha256:600000$mOMby6q5qy2ppFLm$7c48d7e7c5029e2690ce7737e8b43a6d2d3e4a82072fcd190c8637c7948e0fd5',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',NULL,''),(32,'Felipe Souza','felipespanichi@gmail.com','pbkdf2:sha256:600000$HAfZHzE10BiiigZM$6dbf970237d39afda3aa795fe65f20ae7c93d4aea68c5138ff10dfebf25138e0',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',NULL,''),(33,'FelipeSo','fefe@gmail.com.br','pbkdf2:sha256:1000000$HbJDoQuvAIKa6WEe$0e56d36806e8525f5c9b0224b3c493f929ff0ac17777874435ee6db9101f875c',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',NULL,''),(34,'teste20','teste20@gmail.com','pbkdf2:sha256:1000000$905SbL4XBxfo9VvF$ea91c0cf532874d09054f8eeab612972768b855f8236a9b6146740a57be9bf4b',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',NULL,''),(35,'TesteEmail','trocamix17@gmail.com','pbkdf2:sha256:1000000$HcFCGVfTKb8lJf3j$9738f4657e9d616de8a562a0a94bf0c3c1ef691882266c2a3d8b578cd89fc86e',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',0,''),(40,'TesteEmail5','felipepanichii@gmail.com','pbkdf2:sha256:1000000$pigX78QcN4ME32Cl$075e720caa0abd758c5dd0eb40a40ef708e4a1311f9deda5f25348b2f8d7e961',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',1,''),(41,'Felipe Souza (Teste)','bibliopedia413@gmail.com','pbkdf2:sha256:1000000$HoiRHRoRN1c83nJN$47ecdcbc94e2237fc72c40eafecd51324c72626f6937a11106ae2aa1593f8a6e',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',1,''),(42,'Felipe Souza Panichi','felipe.panichi@aluno.faculdadeimpacta.com.br','pbkdf2:sha256:1000000$DXt3WqsaGOz88oeD$ef4f9a16dde85b8b1bba48332dab46238264b6cb852080dc664bf3aeff84a6a9',_binary 'https://lh3.googleusercontent.com/a/ACg8ocKa9IfLZqB0QGgCSYZShAGeFfqQW0A9LN3kPWqn42_LCqpJJQ=s96-c',1,'');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22  2:48:41
