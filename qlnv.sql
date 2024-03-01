-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 01, 2024 at 07:36 AM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlnv`
--

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `MACV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENCV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MLUONG` int NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`MACV`, `TENCV`, `MLUONG`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
('NV', 'Nhanvien', 9000000, 'active', 0, NULL, NULL, NULL),
('TK', 'TruongKhoa', 12000000, 'active', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dean`
--

CREATE TABLE `dean` (
  `MADA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENDA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DDIEM_DA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MAKHOA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NGAYBD` date NOT NULL,
  `NGAYKT` date DEFAULT NULL,
  `IMAGE` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dean`
--

INSERT INTO `dean` (`MADA`, `TENDA`, `DDIEM_DA`, `MAKHOA`, `NGAYBD`, `NGAYKT`, `IMAGE`, `slug`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
('0001', 'Dao tao 1', 'Tp.HCM', 'KHOAA', '2023-02-08', NULL, NULL, NULL, 'active', 0, NULL, NULL, '2024-02-26'),
('0002', 'Dao tao 2', 'HN', 'KHOAC', '2022-02-01', '2024-03-01', NULL, NULL, 'inactive', 0, NULL, NULL, '2024-03-01'),
('0003', 'Dao tao 3', 'Tp.HCM', 'KHOAA', '2024-02-07', '2024-03-01', '/uploads/1709107587800-769634304-z4945350392437_8130d89cb196cefc989639dca4829575.jpg', '0003-dao-tao-3-1708930608866', 'inactive', 0, NULL, '2024-02-26', '2024-03-01');

-- --------------------------------------------------------

--
-- Table structure for table `diadiemphg`
--

CREATE TABLE `diadiemphg` (
  `MAKHOA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DIADIEM` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `IMAGE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `STT` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diadiemphg`
--

INSERT INTO `diadiemphg` (`MAKHOA`, `DIADIEM`, `IMAGE`, `slug`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`, `status`, `STT`) VALUES
('KHOAA', '123/456 Quận 5 Tp.HCM', '/uploads/1708931128689-946717135-1.jpg', '', 0, NULL, NULL, '2024-02-26', 'active', 1),
('KHOAC', '678/91011 Quận Nam Từ Liên HN', '/uploads/1708931128689-946717135-1.jpg', '', 0, NULL, NULL, '2024-02-26', 'active', 1);

-- --------------------------------------------------------

--
-- Table structure for table `khoa`
--

CREATE TABLE `khoa` (
  `MAKHOA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENKHOA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TRPHG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NGNC` date DEFAULT NULL,
  `NGTL` date NOT NULL,
  `IMAGE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khoa`
--

INSERT INTO `khoa` (`MAKHOA`, `TENKHOA`, `TRPHG`, `NGNC`, `NGTL`, `IMAGE`, `slug`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
('KHOAA', 'KHOA TEN A', '0001', '2024-02-12', '2014-02-20', '/uploads/1708932152943-891041516-1.jpg', '', 'active', 0, NULL, NULL, '2024-02-26'),
('KHOAB', 'KHOA TEN B', '0002', '2024-02-08', '2014-02-18', '/uploads/1708931128689-946717135-1.jpg', '', 'inactive', 0, NULL, NULL, '2024-02-26'),
('KHOAC', 'KHOA TEN C', '0003', '2024-02-08', '2014-02-18', '/uploads/1709107568466-147953268-bai_2.png', '', 'active', 0, NULL, NULL, '2024-02-28'),
('KHOAD', 'KHOA TEN D3', '0001', '2024-02-08', '2014-02-18', '/uploads/1708851070840-848049186-1.jpg', '', 'active', 0, NULL, NULL, '2024-02-26');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MANV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `HONV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENLOT` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENNV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NGSINH` date NOT NULL,
  `PHAI` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DCHI` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MLUONG` int NOT NULL,
  `MA_NQL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `MAKHOA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `IMAGE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `VAOLAM` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MANV`, `HONV`, `TENLOT`, `TENNV`, `NGSINH`, `PHAI`, `DCHI`, `MLUONG`, `MA_NQL`, `MAKHOA`, `IMAGE`, `deleted`, `deletedAt`, `slug`, `status`, `createdAt`, `updatedAt`, `VAOLAM`) VALUES
('0001', 'Nguyen', 'Van', 'A', '2000-02-14', 'Nam', 'TP.HCM', 14000000, NULL, 'KHOAB', '/uploads/employee.png', 0, NULL, '', 'inactive', NULL, '2024-03-01', NULL),
('0002', 'Nguyen', 'Van', 'B', '2000-02-14', 'Nữ', 'TP.HCM', 9000000, NULL, 'KHOAA', '/uploads/employee.png', 0, NULL, '', 'active', NULL, '2024-02-17', NULL),
('0003', 'Nguyen', 'Van', 'C', '2000-02-14', 'Nữ', 'TP.HCM', 12000000, NULL, 'KHOAB', '/uploads/employee.png', 0, NULL, '', 'active', NULL, '2024-02-17', NULL),
('0004', 'Nguyen', 'Van', 'D', '2002-02-04', 'Nam', 'TP.HCM', 15000000, NULL, 'KHOAA', '/uploads/employee.png', 0, NULL, '', 'active', NULL, '2024-02-17', NULL),
('0005', 'Nguyen', 'Van', 'E3', '2000-02-14', 'Nữ', 'TP.HCM', 9000000, ' ', 'KHOAA', '/uploads/1708931101764-941188775-1.jpg', 0, NULL, '', 'active', NULL, '2024-02-26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `phancong`
--

CREATE TABLE `phancong` (
  `MANV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MADA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `THOIGIAN` date DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`MACV`);

--
-- Indexes for table `dean`
--
ALTER TABLE `dean`
  ADD PRIMARY KEY (`MADA`),
  ADD KEY `FK_DA_MAKHOA` (`MAKHOA`);

--
-- Indexes for table `diadiemphg`
--
ALTER TABLE `diadiemphg`
  ADD PRIMARY KEY (`MAKHOA`,`DIADIEM`),
  ADD KEY `STT` (`STT`);

--
-- Indexes for table `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`MAKHOA`),
  ADD KEY `FK_KHOA_TRPHG` (`TRPHG`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MANV`,`MAKHOA`),
  ADD KEY `FK_NV_MAKHOA` (`MAKHOA`);

--
-- Indexes for table `phancong`
--
ALTER TABLE `phancong`
  ADD PRIMARY KEY (`MANV`,`MADA`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dean`
--
ALTER TABLE `dean`
  ADD CONSTRAINT `FK_DA_MAKHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `diadiemphg`
--
ALTER TABLE `diadiemphg`
  ADD CONSTRAINT `FK_DDPHG_MAKHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `khoa`
--
ALTER TABLE `khoa`
  ADD CONSTRAINT `FK_KHOA_TRPHG` FOREIGN KEY (`TRPHG`) REFERENCES `nhanvien` (`MANV`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `FK_NV_MAKHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
