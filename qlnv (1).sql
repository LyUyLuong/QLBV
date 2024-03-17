-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2024 at 09:20 AM
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
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `MANV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`MANV`, `email`, `password`, `token`, `role_id`, `status`, `deleted`) VALUES
('0002', 'vananguyen@gmail.com', '9cbf8a4dcb8e30682b927f352d6559a0', 'IXA83Y4cPdv0Tn1ApcIzqeBKdFNaWx', 'ROLE0001', 'active', 0),
('0003', 'tranvanb@gmail.com', 'Oo5L9QxdQG', 'u7w2nKoVj7yuqZTPx6Ry6LmMjVExh1', 'ROLE0001', 'active', 0),
('0004', 'haovanc@gmail.com', 'whm4hc6lm2', 'w94vagk8IiOVJAlb7iXEmp1JXHBM0k', 'ROLE0001', 'active', 0),
('0005', 'nguyenquocthai@gmail.com', 'SzJJCCWyfL', 'EcCxmB1kjEZL2ttR5q7xDAtjnLqNTO', 'ROLE0001', 'active', 0),
('0006', 'whydoyouknow@icemail.club', '9cbf8a4dcb8e30682b927f352d6559a0', 'u66V3mDKycEuYQ3AGFdYtuRoPDhKz7', 'ROLE0003', 'active', 1),
('7gkp', 'admin@gmail.com', '9cbf8a4dcb8e30682b927f352d6559a0', 'ZnkguhECT8pmZ2DqFTXnhQGTik2Lkt', 'ROLE0003', 'inactive', 0),
('8sqL', '123@gmail.com', '9cbf8a4dcb8e30682b927f352d6559a0', 'XXYYrOg8Q440ps0xJYfhDIc3L1QvDz', 'ROLE0003', 'inactive', 0),
('ADMIN', 'lyuyluonglienhe@gmail.com', '9cbf8a4dcb8e30682b927f352d6559a0', 'L1go680SPew055KLIcRKwTOobFMGJb', 'ROLE0003', 'active', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `MANV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`MANV`, `role_id`) VALUES
('0006', ''),
('0002', 'ROLE0001'),
('0003', 'ROLE0001'),
('0004', 'ROLE0001'),
('0005', 'ROLE0001'),
('0006', 'ROLE0003'),
('7gkp', 'ROLE0003'),
('8sqL', 'ROLE0003');

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
  `updatedAt` date DEFAULT NULL,
  `desc` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dean`
--

INSERT INTO `dean` (`MADA`, `TENDA`, `DDIEM_DA`, `MAKHOA`, `NGAYBD`, `NGAYKT`, `IMAGE`, `slug`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`, `desc`) VALUES
('0001', 'Trị Liệu Bằng Giả Dược', 'TP>HCM', 'KHOA0002', '2022-04-13', NULL, '/uploads/1710323028318-504404522-da1.jpg', '0001-tri-lieu-bang-gia-duoc-1710323028338', 'active', 0, '2024-03-14', '2024-03-13', '2024-03-14', '<p>Kh&aacute;m ph&aacute; <strong>sự kỳ diệu</strong> của trị liệu bằng giả dược: sự kết hợp tinh tế giữa <span style=\"color: rgb(186, 55, 42);\"><strong><em>khoa học</em></strong></span> v&agrave; <span style=\"color: rgb(224, 62, 45);\"><em><strong>nghệ thuật</strong></em></span> để cải thiện sức khỏe v&agrave; tinh thần của bạn. H&atilde;y trải nghiệm sự phục hồi v&agrave; c&acirc;n bằng trong từng liệu ph&aacute;p. Chăm s&oacute;c sức khỏe to&agrave;n diện, đem lại niềm vui v&agrave; sự h&agrave;i l&ograve;ng cho cuộc sống của bạn</p>'),
('0002', 'Môi trường sống và sức khỏe', 'Hà Nội', 'KHOA0001', '1991-04-05', NULL, '/uploads/1710323217809-174670800-kham-suc-khoe-cho-tre-em-tai-khoa-nhi.jpg', '0002-moi-truong-song-va-suc-khoe-1710323217821', 'active', 0, NULL, '2024-03-13', '2024-03-13', '<p><span style=\"font-size: 14pt;\">Đề &aacute;n Khoa Nhi: Tạo m&ocirc;i trường chăm s&oacute;c sức khỏe an to&agrave;n v&agrave; chu đ&aacute;o cho trẻ em. Kết hợp kiến thức y học hiện đại v&agrave; t&igrave;nh cảm, ch&uacute;ng t&ocirc;i cam kết đem lại sự ph&aacute;t triển to&agrave;n diện cho thế hệ mai sau. Với đội ngũ y b&aacute;c sĩ tận t&acirc;m, ch&uacute;ng t&ocirc;i x&acirc;y dựng nền tảng cho sự khởi đầu vững chắc v&agrave; hạnh ph&uacute;c của trẻ em.</span></p>'),
('0003', 'Tăng cường hệ thống quản lý và hoạt động của bệnh viện để tăng hiệu suất và giảm thời gian chờ đợi cho bệnh nhân.', 'Hà Nội', 'KHOA0001', '2020-03-08', NULL, '/uploads/1710398045335-233257419-benh-vien175.jpg', '0003-tang-cuong-he-thong-quan-ly-va-hoat-djong-cua-benh-vien-dje-tang-hieu-suat-va-giam-thoi-gian-cho-djoi-cho-benh-nhan.-1710398045371', 'active', 0, NULL, '2024-03-14', '2024-03-14', '<ol>\r\n<li>\r\n<p><strong>Kế hoạch T&agrave;i ch&iacute;nh:</strong> X&aacute;c định nguồn vốn cần thiết để x&acirc;y dựng v&agrave; vận h&agrave;nh bệnh viện, bao gồm chi ph&iacute; đầu tư ban đầu, chi ph&iacute; vận h&agrave;nh h&agrave;ng năm, v&agrave; dự kiến thu nhập từ c&aacute;c nguồn kh&aacute;c nhau.</p>\r\n</li>\r\n<li>\r\n<p><strong>Kế hoạch Triển khai:</strong> Liệt k&ecirc; c&aacute;c bước cụ thể để triển khai dự &aacute;n, bao gồm lịch tr&igrave;nh, c&aacute;c bước cần thực hiện, v&agrave; ph&acirc;n c&ocirc;ng tr&aacute;ch nhiệm.</p>\r\n</li>\r\n<li>\r\n<p><strong>Rủi ro v&agrave; Biện ph&aacute;p ph&ograve;ng ngừa:</strong> Ph&acirc;n t&iacute;ch c&aacute;c rủi ro c&oacute; thể ph&aacute;t sinh trong qu&aacute; tr&igrave;nh triển khai v&agrave; vận h&agrave;nh bệnh viện, v&agrave; đề xuất c&aacute;c biện ph&aacute;p để giảm thiểu rủi ro.</p>\r\n</li>\r\n<li>\r\n<p><strong>Hiệu quả v&agrave; Đ&aacute;nh gi&aacute;:</strong> X&aacute;c định c&aacute;c chỉ số hiệu quả v&agrave; ti&ecirc;u ch&iacute; đ&aacute;nh gi&aacute; để đo lường th&agrave;nh c&ocirc;ng của dự &aacute;n, bao gồm cả mục ti&ecirc;u ngắn hạn v&agrave; d&agrave;i hạn.</p>\r\n</li>\r\n<li>\r\n<p><strong>T&iacute;nh bền vững:</strong> Đề xuất c&aacute;c biện ph&aacute;p để đảm bảo sự bền vững của bệnh viện sau khi hoạt động</p>\r\n</li>\r\n</ol>');

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
('KHOA0001', '123 Đường Trần Hưng Đạo, Quận 1, Thành phố Hồ Chí Minh', '/uploads/1710322583225-747772665-test.png', '123-TrHungDao-Q1-TPHCM', 0, NULL, NULL, NULL, 'active', 1),
('KHOA0002', '456 Đường Nguyễn Thị Minh Khai, Quận 3, Thành phố Hồ Chí Minh', '/uploads/1710324024144-602775640-benh-vien.jpg', 'khoa0002-456-djuong-nguyen-thi-minh-khai-quan-3-thanh-pho-ho-chi-minh-1710324024163', 0, NULL, '2024-03-13', '2024-03-13', 'active', 3),
('KHOA0004', '789 Đường Lê Lợi, Quận Bình Thạnh, Thành phố Hồ Chí Minh', '/uploads/1710400635205-537596637-BV-DKKV Cu Chi.jpg', 'khoa0004-789-djuong-le-loi-quan-binh-thanh-thanh-pho-ho-chi-minh-1710400635228', 0, NULL, '2024-03-14', '2024-03-14', 'active', 5);

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
  `updatedAt` date DEFAULT NULL,
  `KHOA_CHA` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khoa`
--

INSERT INTO `khoa` (`MAKHOA`, `TENKHOA`, `TRPHG`, `NGNC`, `NGTL`, `IMAGE`, `slug`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`, `KHOA_CHA`) VALUES
('KHOA0000', 'Ban Điều Hành', NULL, '2000-03-14', '1995-02-23', '/uploads/1710382147795-521971024-man-with-the-inscription-admin-icon-outline-style-vector.jpg', 'khoa0000-ban-djieu-hanh-1710382147813', 'inactive', 1, NULL, '2024-03-14', '2024-03-14', NULL),
('KHOA0001', 'Khoa Nhi', NULL, NULL, '1995-06-07', '/uploads/1710320790450-323706035-test.png', 'khoa0001-khoa-nhi-1710320790519', 'active', 0, NULL, '2024-03-13', '2024-03-13', NULL),
('KHOA0002', 'Khoa Thần Kinh', NULL, NULL, '1995-01-23', '/uploads/1710322583225-747772665-test.png', 'khoa0002-khoa-than-kinh-1710322583283', 'active', 0, NULL, '2024-03-13', '2024-03-13', NULL),
('KHOA0004', 'Khoa Dinh Dưỡng', NULL, NULL, '2000-06-03', '/uploads/1710382687816-945194521-Clinician-holding-an-apple-jpg.webp', 'khoa0004-khoa-dinh-duong-1710382687848', 'active', 0, NULL, '2024-03-14', '2024-03-14', 'KHOA0001'),
('KHOA0006', 'Khoa Ngoại', NULL, NULL, '2008-05-25', '/uploads/1710405888553-627050929-images.jpg', 'khoa0006-khoa-ngoai-1710405739364', 'active', 0, NULL, '2024-03-14', '2024-03-14', NULL),
('kHOANOISOI', 'Khoa Nội Soi', NULL, NULL, '2024-03-18', '/uploads/1710405909944-418381632-BV-DKKV Cu Chi.jpg', 'khoa0005-khoa-noi-soi-1710405487922', 'active', 0, NULL, NULL, '2024-03-14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MANV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `HONV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENLOT` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TENNV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NGSINH` date NOT NULL,
  `PHAI` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DCHI` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
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

INSERT INTO `nhanvien` (`MANV`, `HONV`, `TENLOT`, `TENNV`, `email`, `NGSINH`, `PHAI`, `DCHI`, `MA_NQL`, `MAKHOA`, `IMAGE`, `deleted`, `deletedAt`, `slug`, `status`, `createdAt`, `updatedAt`, `VAOLAM`) VALUES
('0002', 'Nguyễn ', 'Văn', 'A', 'vananguyen@gmail.com', '2000-07-06', 'Nam', 'TP.HCM', NULL, 'KHOA0001', '/uploads/1710320847068-727190025-employee.png', 0, NULL, 'nguyen-van-a-1710320847076', 'active', '2024-03-13', '2024-03-14', '2024-03-13'),
('0003', 'Trần', 'Văn', 'B', 'tranvanb@gmail.com', '2000-07-02', 'Nam', 'TP.HCM', NULL, 'KHOA0001', '/uploads/1710322404511-413110801-employee.png', 0, NULL, 'tran-van-b-1710322404529', 'active', '2024-03-13', '2024-03-14', '2024-03-13'),
('0004', 'Hạo', 'Văn', 'C', 'haovanc@gmail.com', '1996-02-23', 'Nam', 'TP.HCM', NULL, 'KHOA0002', '/uploads/1710322727496-146611511-employee.png', 0, NULL, 'hao-van-c-1710322727519', 'active', '2024-03-13', '2024-03-14', '2024-03-13'),
('0005', 'Nguyễn', 'Quốc', 'E', 'nguyenquocthai@gmail.com', '2003-04-11', 'Nam', 'Hà Nội', NULL, 'KHOA0001', '/uploads/1710383628352-729993060-employee.png', 0, NULL, 'nguyen-quoc-e-1710383628370', 'active', '2024-03-14', '2024-03-14', '2024-03-14'),
('0006', 'Admin', 'Admin', 'Admin', 'admin@gmail.com', '0001-01-01', 'Nam', 'TP.HCM', NULL, 'KHOA0001', '/uploads/1710407102204-789520374-employee.png', 1, NULL, 'admin-admin-admin-1710407102314', 'inactive', '2024-03-14', '2024-03-14', '2024-03-14'),
('7gkp', 'test', 'test', 'test', 'test@gmail.com', '0001-01-01', 'Nam', 'TP.HCM', NULL, 'KHOA0001', '/uploads/1710407210771-795376902-employee.png', 1, NULL, 'test-test-test-1713407210825', 'inactive', '2024-03-14', '2024-03-14', '2024-03-14'),
('8sqL', '123', '123', '123', '123@gmail.com', '2000-01-01', 'Nam', 'TP.HCM', NULL, 'KHOA0001', '/uploads/1710407270333-358954231-employee.png', 1, NULL, '123-123-123-1710407270345', 'inactive', '2024-03-14', '2024-03-14', '2024-03-14'),
('ADMIN', 'Lý', 'Uy', 'Lương', 'lyuyluonglienhe@gmail.com', '2002-02-04', 'Nam', 'TP.HCM', NULL, 'KHOA0000', '/uploads/1710320847068-727190025-employee.png', 1, NULL, '', 'inactive', NULL, NULL, NULL);

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
-- Dumping data for table `phancong`
--

INSERT INTO `phancong` (`MANV`, `MADA`, `THOIGIAN`, `status`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
('0002', '0003', NULL, 'active', 0, NULL, '2024-03-14', '2024-03-14'),
('0003', '0003', NULL, 'active', 0, NULL, '2024-03-14', '2024-03-14'),
('0004', '0001', NULL, 'active', 0, NULL, '2024-03-14', '2024-03-14'),
('0005', '0003', NULL, 'active', 0, NULL, '2024-03-14', '2024-03-14');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MLUONG` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `permissions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `deleted` tinyint(1) NOT NULL,
  `deletedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `title`, `MLUONG`, `description`, `permissions`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
('ROLE0001', 'Nhân viên', 9000000, 'Đây là nhóm dành cho nhân viên', 'employee-category_view,project-category_view,location-category_view,department-category_view', 0, NULL, '2024-03-05', '2024-03-10'),
('ROLE0002', 'Trưởng khoa', 12000000, 'Đây là nhóm dành cho trưởng khoa', 'employee-category_view,employee-category_create,employee-category_edit,project-category_view,project-category_create,project-category_edit,location-category_view,location-category_create,location-category_edit,department-category_view,department-category_create,department-category_edit', 0, NULL, '2024-03-06', '2024-03-10'),
('ROLE0003', 'Quản trị phần mềm', 0, 'Đây là nhóm dành cho quản trị viên', 'employee-category_view,employee-category_create,employee-category_edit,employee-category_delete,project-category_view,project-category_create,project-category_edit,project-category_delete,location-category_view,location-category_create,location-category_edit,location-category_delete,department-category_view,department-category_create,department-category_edit,department-category_delete,roles_view,roles_create,roles_edit,roles_delete,roles_permissions,accounts_view,accounts_create,accounts_edit,accounts_delete', 0, NULL, '2024-03-06', '2024-03-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`MANV`),
  ADD KEY `FK_ACCOUNT_Role_id` (`role_id`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`MANV`,`role_id`),
  ADD KEY `FK_CHUCVU_role_id` (`role_id`);

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
  ADD KEY `FK_KHOA_TRPHG` (`TRPHG`),
  ADD KEY `FK_KHOA_KHOA_CHA` (`KHOA_CHA`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MANV`,`MAKHOA`),
  ADD KEY `FK_NV_MAKHOA` (`MAKHOA`),
  ADD KEY `FK_NV_MA_NQL` (`MA_NQL`);

--
-- Indexes for table `phancong`
--
ALTER TABLE `phancong`
  ADD PRIMARY KEY (`MANV`,`MADA`),
  ADD KEY `FK_PHANCONG_MADA` (`MADA`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `FK_ACCOUNT_Role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FK_ACCOUNTS_MANV` FOREIGN KEY (`MANV`) REFERENCES `nhanvien` (`MANV`);

--
-- Constraints for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD CONSTRAINT `FK_CHUCVU_MANV` FOREIGN KEY (`MANV`) REFERENCES `nhanvien` (`MANV`);

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
  ADD CONSTRAINT `FK_KHOA_KHOA_CHA` FOREIGN KEY (`KHOA_CHA`) REFERENCES `khoa` (`MAKHOA`),
  ADD CONSTRAINT `FK_KHOA_TRPHG` FOREIGN KEY (`TRPHG`) REFERENCES `nhanvien` (`MANV`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `FK_NV_MA_NQL` FOREIGN KEY (`MA_NQL`) REFERENCES `nhanvien` (`MANV`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_NV_MAKHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `phancong`
--
ALTER TABLE `phancong`
  ADD CONSTRAINT `FK_PHANCONG_MADA` FOREIGN KEY (`MADA`) REFERENCES `dean` (`MADA`),
  ADD CONSTRAINT `FK_PHANCONG_MANV` FOREIGN KEY (`MANV`) REFERENCES `nhanvien` (`MANV`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
