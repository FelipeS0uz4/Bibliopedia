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
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `idlivros` int NOT NULL AUTO_INCREMENT,
  `idAPI` varchar(45) NOT NULL,
  `livrosnome` varchar(200) NOT NULL,
  `livrosgenero` varchar(400) DEFAULT NULL,
  `livrosautor` varchar(400) DEFAULT NULL,
  `idUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idlivros`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `livros_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES (3,'NO27Dpc8bE8C','Joshua','[\'Fiction / General\', \'Fiction / Religious\', \'Fiction / Christian / Classic & Allegory\', \'Religion / Spirituality\']','[\'Joseph Girzone\']',11),(5,'ifJeBAAAQBAJ','None of the Above','[\'Comparative Religion\', \'Social Science\', \'Sociology of Religion\', \'Religion\', \'Religion, Politics & State\']','[\'Elie Mikhael Nasrallah\']',NULL),(6,'ifJeBAAAQBAJ','None of the Above','[\'Comparative Religion\', \'Social Science\', \'Sociology of Religion\', \'Religion\', \'Religion, Politics & State\']','[\'Elie Mikhael Nasrallah\']',NULL),(7,'ifJeBAAAQBAJ','None of the Above','[\'Comparative Religion\', \'Social Science\', \'Sociology of Religion\', \'Religion\', \'Religion, Politics & State\']','[\'Elie Mikhael Nasrallah\']',NULL),(8,'ifJeBAAAQBAJ','None of the Above','[\'Comparative Religion\', \'Social Science\', \'Sociology of Religion\', \'Religion\', \'Religion, Politics & State\']','[\'Elie Mikhael Nasrallah\']',NULL),(9,'ifJeBAAAQBAJ','None of the Above','[\'Sociology of Religion\', \'Comparative Religion\', \'Religion, Politics & State\', \'Religion\', \'Social Science\']','[\'Elie Mikhael Nasrallah\']',NULL),(10,'ifJeBAAAQBAJ','None of the Above','[\'Sociology of Religion\', \'Comparative Religion\', \'Religion, Politics & State\', \'Religion\', \'Social Science\']','[\'Elie Mikhael Nasrallah\']',NULL),(11,'ifJeBAAAQBAJ','None of the Above','[\'Sociology of Religion\', \'Comparative Religion\', \'Religion, Politics & State\', \'Religion\', \'Social Science\']','[\'Elie Mikhael Nasrallah\']',NULL),(12,'ifJeBAAAQBAJ','None of the Above','[\'Religion\', \'Comparative Religion\', \'Sociology of Religion\', \'Social Science\', \'Religion, Politics & State\']','[\'Elie Mikhael Nasrallah\']',41),(13,'ifJeBAAAQBAJ','None of the Above','[\'Social Science\', \'Religion\', \'Religion, Politics & State\', \'Sociology of Religion\', \'Comparative Religion\']','[\'Elie Mikhael Nasrallah\']',41),(14,'2pZnEAAAQBAJ','Wotakoi: Love is Hard for Otaku 6','[\'Manga\', \'General\', \'Comics & Graphic Novels\']','[\'Fujita\']',41),(15,'OtnMEAAAQBAJ','Wotakoi: Love Is Hard for Otaku Official Art Works (English)','[\'Manga\', \'General\', \'Comics & Graphic Novels\']','[\'Fujita\']',41),(16,'9IxJDwAAQBAJ','The Saga of Tanya the Evil, Vol. 3 (light novel)','[\'Fantasy\', \'Comics & Graphic Novels\', \'Light Novel\', \'Fiction\', \'Manga\', \'Historical\']','[\'Carlo Zen\']',41),(17,'MwfaDwAAQBAJ','A ciência de Harry Potter','[\'General\', \'Fantasy\', \'Fiction\', \'Science\']','[\'Mark Brake \', \'Jon Chase\']',41),(18,'46jbDAAAQBAJ','Harry Potter e a Criança Amaldiçoada, Partes Um e Dois (Edição Especial do Roteiro de Ensaio)','[\'Theater\', \'Playwriting\', \'General\', \'English, Irish, Scottish, Welsh\', \'Drama\', \'European\', \'Fantasy\', \'Contemporary\', \'Performing Arts\', \'Women Authors\', \'Juvenile Nonfiction\', \'Juvenile Fiction\', \'Fantasy & Magic\', \'Theater & Musicals\', \'Fiction\']','[\'J.K. Rowling\', \'John Tiffany\', \'Jack Thorne\']',32),(19,'72eIEAAAQBAJ','Hitler\'s Father','[\'Biography & Autobiography\', \'General\', \'Wars & Conflicts\', \'Historical\', \'Germany\', \'World War II\', \'Europe\', \'History\']','[\'Roman Sandgruber\']',32),(20,'72eIEAAAQBAJ','Hitler\'s Father','[\'Biography & Autobiography\', \'General\', \'Wars & Conflicts\', \'Historical\', \'Germany\', \'World War II\', \'Europe\', \'History\']','[\'Roman Sandgruber\']',32),(21,'3XbU1HEyfFkC','Hitler Youth, 1922-1945','[\'General\', \'World War II\', \'Wars & Conflicts\', \'History\']','[\'Jean-Denis G.G. Lepage\']',32),(22,'3XbU1HEyfFkC','Hitler Youth, 1922-1945','[\'General\', \'World War II\', \'Wars & Conflicts\', \'History\']','[\'Jean-Denis G.G. Lepage\']',32);
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22  2:48:42
