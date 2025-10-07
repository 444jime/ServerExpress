-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: dbtpintegrador2025
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdAlumno` int(11) NOT NULL,
  `IdMateria` int(11) NOT NULL,
  `FechaAlta` datetime NOT NULL,
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(50) DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `UsuarioBaja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdAlumno` (`IdAlumno`),
  KEY `IdMateria` (`IdMateria`),
  CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`IdAlumno`) REFERENCES `usuario` (`Id`),
  CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`IdMateria`) REFERENCES `materia` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `IdCarrera` int(11) NOT NULL,
  `FechaAlta` datetime NOT NULL,
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(50) DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `UsuarioBaja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdCarrera` (`IdCarrera`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`IdCarrera`) REFERENCES `carrera` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `IdRol` int(11) NOT NULL,
  `FechaAlta` datetime NOT NULL,
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(50) DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `UsuarioBaja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Mail` (`Mail`),
  UNIQUE KEY `Usuario` (`Usuario`),
  KEY `IdRol` (`IdRol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 22:22:55
