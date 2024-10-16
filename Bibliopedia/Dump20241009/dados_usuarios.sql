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
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (11,'Lai','jose@gmail.com','pbkdf2:sha256:600000$atQz3quOGIQgKBki$8f86c1cae94470d5af0609d50909e6149364309938127569873e2fbb6c1d6fcb',NULL),(13,'David','david@gmail.com','pbkdf2:sha256:600000$ZQkyWnUVTScIW3aN$b164234fc4dd8b9243669ba0f9a8b6988460d703c46a1ac52864b130fc3a280a',NULL),(14,'Teste2','teste@gmail.com','pbkdf2:sha256:600000$EzuVGxtiGPKmCbfF$d82eb4bcad22112810aba72bca195d2b71f9924ef2d65f3b6bb3491fc97ab192',NULL),(18,'Teste5','test5e@gmail.com','pbkdf2:sha256:600000$Oy4JPBbWJQtA7Njz$0b075c0f1db9bd2d20bcf0bd465df89d99ef0fa304656947f18cb621a75899cd',NULL),(19,'Felipe Souza','felipe@gmail.com','pbkdf2:sha256:600000$ChV51Z5XdgnfA1R0$e9c65882cf5160f6da607a493ddd139fb30b0138762ec93cb95ae78f40c34371',NULL),(20,'Luiz','luiz@gmail.com','pbkdf2:sha256:600000$5bEAh3e7S5zWoJpk$fafcd62e90c44e813097e33760f89c9b64ebce899d7e021fdde8019c3ed7cf76',NULL),(21,'testando','felipeSo@gmail.com','pbkdf2:sha256:600000$vEZwDxNM2ZxWmbFa$1fdf6bcb95e298babbf110336b21cd636b410a0f52f5d078e386926bca7806c0',NULL),(29,'Teste15','teste15@gmail.com','pbkdf2:sha256:600000$2GcULbnvBnwNRk8e$dc1c53c831a0df19d3896562b6692e55070fc0e566935a03f2774bcde10699ee',NULL),(30,'TesteImagem','Imagem@gmail.com','pbkdf2:sha256:600000$PyAV9RP3gd66cSke$c46b56e8f0f99cbe194b4404f05f3999f1608878d1b5484c78925b61928b3fbc',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'),(31,'Exgeass','Exgeass@gmail.com','pbkdf2:sha256:600000$mOMby6q5qy2ppFLm$7c48d7e7c5029e2690ce7737e8b43a6d2d3e4a82072fcd190c8637c7948e0fd5',_binary 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg');
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

-- Dump completed on 2024-10-16 14:06:10
