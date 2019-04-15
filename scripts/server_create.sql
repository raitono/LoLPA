-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.20-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

-- Dumping structure for table riot.champion
CREATE TABLE IF NOT EXISTS `champion` (
  `championId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `version` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `partype` varchar(50) NOT NULL COMMENT 'Resource type',
  `hp` double NOT NULL,
  `hpperlevel` double NOT NULL,
  `mp` double NOT NULL COMMENT 'mana',
  `mpperlevel` double NOT NULL,
  `movespeed` double NOT NULL,
  `armor` double NOT NULL,
  `armorperlevel` double NOT NULL,
  `spellblock` double NOT NULL COMMENT 'magic resist',
  `spellblockperlevel` double NOT NULL,
  `attackrange` double NOT NULL,
  `hpregen` double NOT NULL,
  `hpregenperlevel` double NOT NULL,
  `mpregen` double NOT NULL,
  `mpregenperlevel` double NOT NULL,
  `crit` double NOT NULL,
  `critperlevel` double NOT NULL,
  `attackdamage` double NOT NULL,
  `attackdamageperlevel` double NOT NULL,
  `attackspeedperlevel` double NOT NULL,
  `attackspeed` double NOT NULL,
  PRIMARY KEY (`championId`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

