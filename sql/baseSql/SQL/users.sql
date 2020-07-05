/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost
 Source Database       : anker

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : utf-8

 Date: 08/13/2019 01:06:05 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `accountid` int(11) DEFAULT NULL,
  `uname` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `regtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `gold` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', '10001', 'huangxifeng', '0', '0', '2019-08-13 00:36:15', '100'), ('2', '10001', 'hxf01_cur', '1', '10', '2019-08-13 00:36:18', '233'), ('3', '10002', 'hxf02', '2', '10', '2019-08-13 00:36:20', '4324'), ('4', '10002', 'anker_cur', '3', '90', '2019-08-13 00:36:22', '56'), ('17', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('18', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('19', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('20', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('21', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('22', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('23', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('24', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('25', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('26', null, 'TOM_cur', null, null, '2019-08-13 00:16:06', null), ('27', '10004', 'anker', null, null, null, null);
COMMIT;

-- ----------------------------
--  Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `tr_emp_insert`;
delimiter ;;
CREATE TRIGGER `tr_emp_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
	INSERT INTO oplog(uid, uname, action, optime) VALUES(NEW.uid, NEW.uname, "INSERT", now());
END
 ;;
delimiter ;
DROP TRIGGER IF EXISTS `tr_emp_delete`;
delimiter ;;
CREATE TRIGGER `tr_emp_delete` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
            INSERT INTO oplog(uid, uname, action, optime, old_value) VALUES(OLD.uid, OLD.uname, 'DELETE', now(), OLD.gold);
        END
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
