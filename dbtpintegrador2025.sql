-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 07-10-2025 a las 21:47:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbtpintegrador2025`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`Id`, `Nombre`) VALUES
(2, 'Diseño Gráfico'),
(1, 'Ingeniería en Sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `Id` int(11) NOT NULL,
  `IdAlumno` int(11) NOT NULL,
  `IdMateria` int(11) NOT NULL,
  `FechaAlta` datetime NOT NULL,
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(50) DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `UsuarioBaja` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`Id`, `IdAlumno`, `IdMateria`, `FechaAlta`, `UsuarioAlta`, `FechaModificacion`, `UsuarioModificacion`, `FechaBaja`, `UsuarioBaja`) VALUES
(1, 3, 1, '2025-06-20 17:31:28', 'admin', NULL, NULL, '2025-06-22 19:34:13', 'Lucía Torres'),
(2, 3, 2, '2025-06-21 23:03:40', '1', NULL, NULL, '2025-06-21 23:37:49', 'Ana Gómez'),
(3, 3, 2, '2025-06-21 23:04:51', 'Ana Gómez', NULL, NULL, '2025-06-21 23:37:49', 'Ana Gómez'),
(4, 3, 2, '2025-06-21 23:42:09', 'Ana Gómez', NULL, NULL, '2025-06-21 23:42:45', 'Ana Gómez'),
(6, 3, 1, '2025-06-22 03:59:50', 'Ana Gómez', NULL, NULL, '2025-06-22 19:34:13', 'Lucía Torres'),
(7, 11, 3, '2025-06-22 22:35:15', 'jimena', NULL, NULL, '2025-06-22 23:48:08', 'Ana Gómez'),
(9, 10, 3, '2025-06-22 23:16:58', 'Ana Gómez', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `IdCarrera` int(11) NOT NULL,
  `FechaAlta` datetime NOT NULL,
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(50) DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `UsuarioBaja` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`Id`, `Nombre`, `IdCarrera`, `FechaAlta`, `UsuarioAlta`, `FechaModificacion`, `UsuarioModificacion`, `FechaBaja`, `UsuarioBaja`) VALUES
(1, 'Bases de Datos', 1, '2025-06-20 17:30:27', 'admin', NULL, NULL, NULL, NULL),
(2, 'NTEC', 1, '2025-06-20 17:30:27', 'admin', '2025-06-22 01:52:52', '1', '2025-06-22 01:57:22', '1'),
(3, 'Taller de Programacion', 1, '2025-06-22 01:44:31', '1', NULL, NULL, NULL, NULL),
(4, 'Base de datos 2', 1, '2025-06-22 13:49:39', '10', '2025-06-22 13:58:09', '1', '2025-06-22 13:59:42', '1'),
(5, 'PRUEBA', 1, '2025-06-23 00:59:26', '1', NULL, NULL, NULL, NULL),
(6, 'prueba2', 2, '2025-06-23 01:01:00', '1', '2025-06-23 01:04:19', '1', '2025-06-23 01:08:55', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`Id`, `Nombre`) VALUES
(1, 'Administrador'),
(3, 'Alumno'),
(2, 'Coordinador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
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
  `UsuarioBaja` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id`, `Nombre`, `Mail`, `Usuario`, `Contrasena`, `IdRol`, `FechaAlta`, `UsuarioAlta`, `FechaModificacion`, `UsuarioModificacion`, `FechaBaja`, `UsuarioBaja`) VALUES
(1, 'Ana Gómez', 'ana@gmail.com', 'ana123', '$2b$10$EO62zZqDwsLlXiTsGXwRYevfKTq4WDI66qEtNyBJRK2lRiSg7V.K6', 1, '2025-06-20 17:30:18', 'admin', NULL, NULL, NULL, NULL),
(2, 'Carlos Pérez', 'carlos@gmail.com', 'carlosp', '$2b$10$XSm3SXxI7tvTFQeNpUO2n.BUMDGcuAG/8b2nHH2MnHUFvZPUgjrze', 2, '2025-06-20 17:30:18', 'admin', NULL, NULL, NULL, NULL),
(3, 'Lucía Torres', 'lucia@gmail.com', 'luciatorres', '$2b$10$YQIhQco0b18wcOF5zLxLHu.kICLA6urO9oLfX0i0x62qK.VNR8CpO', 3, '2025-06-20 17:30:18', 'admin', NULL, NULL, NULL, NULL),
(4, 'tania', 'tania@gmail.com', 'tantan', '$2b$10$lL6u82.Qa73uSE.RyJhRMuaCyXsNCkj68s5f/PcsR67XB4/CgbL2.', 1, '2025-06-21 00:23:27', '1', NULL, NULL, NULL, NULL),
(6, 'martincito', 'martin@gmail.com', 'martincito', '$2b$10$y/CylLpwwVT5aHt5qfnxYOMu7wEQbNdwOmtFU5hA8dzX2isTRkfKO', 3, '2025-06-21 14:48:33', '1', '2025-06-21 22:22:53', '1', '2025-06-21 22:39:47', '1'),
(7, 'tomate', 'tati@gmail.com', 'tati123', '$2b$10$13BJTTe/l.QdrWTVA3TtIehYZRUCsobKnr1d4NsRuaST93YA5W/vW', 3, '2025-06-22 03:47:06', 'Ana Gómez', '2025-06-22 03:53:43', 'Ana Gómez', '2025-06-22 03:55:07', 'Ana Gómez'),
(8, 'tom', 'tom@gmail.com', 'tomate', '$2b$10$UsidgbqQGwB2GZNzfwRQbOEMOhC8dpNfgvkY5dqBj.rlWi6A4OOvO', 3, '2025-06-22 13:18:27', 'Ana Gómez', NULL, NULL, '2025-06-22 13:20:19', 'Ana Gómez'),
(10, 'tomaas', 'tomaas@gmail.com', 'tomatiin', '$2b$10$YUp1/8qeswwIa2xQ20.ZfetFDu0NrLTYf5OsMbnxC8X9jPA6r/mpq', 3, '2025-06-22 13:21:10', 'Ana Gómez', NULL, NULL, NULL, NULL),
(11, 'jimena', 'jimena@gmail.com', 'jimenna', '$2b$10$dL6gl66StoyPd5QR8.tzfuTPTAH/IFlxRQVKW.6h9WCg1aYeeTvrO', 3, '2025-06-22 18:44:15', 'Ana Gómez', NULL, NULL, NULL, NULL),
(12, 'mari', 'mari@gmail.com', 'mari1234', '$2b$10$83VgF66c161L59pZu6qQ0e0QtswBYs01gUO3/Lf8HdDryfN2dmRIq', 3, '2025-06-23 00:04:58', 'Ana Gómez', NULL, NULL, NULL, NULL),
(14, 'ffff', 'pprueba@gmail.com', 'prueba', '$2b$10$YB93aHy/PkWobRE7ho/NyeRnc7ieJeqxPMGY0QLbPQviERa8sOtNS', 3, '2025-06-23 00:06:37', '1', '2025-06-23 02:05:37', '1', '2025-06-23 00:15:04', 'Ana Gómez'),
(16, 'tomaate', 'tomaate@gmail.com', 'tomaate', '$2b$10$sEQe2XaatQePajXfRMDcoeh9c1FiD/ja/eq5z83XZVN8YtV2V4rxS', 1, '2025-06-23 01:17:55', 'Carlos Pérez', NULL, NULL, NULL, NULL),
(17, 'coord', 'coord@gmail.com', 'coord', '$2b$10$o3oXJI0yDp62ONk7p437fOYOTr7LUu0xKDgjRfgdHqMdvdC8/v2Fm', 2, '2025-06-23 01:18:30', 'Ana Gómez', NULL, NULL, NULL, NULL),
(18, 'prueba3', 'prueba3@gmail.com', 'prueba1234', '$2b$10$BftRBvRm8PPVG9AZP4Cu9.SI7WrvKMXVGb6Az28AkTuZEQ6tqzPTW', 3, '2025-06-23 01:43:28', '1', NULL, NULL, '2025-06-23 01:43:47', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdAlumno` (`IdAlumno`),
  ADD KEY `IdMateria` (`IdMateria`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdCarrera` (`IdCarrera`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Mail` (`Mail`),
  ADD UNIQUE KEY `Usuario` (`Usuario`),
  ADD KEY `IdRol` (`IdRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`IdAlumno`) REFERENCES `usuario` (`Id`),
  ADD CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`IdMateria`) REFERENCES `materia` (`Id`);

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`IdCarrera`) REFERENCES `carrera` (`Id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
