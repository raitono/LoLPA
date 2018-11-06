-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.20-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5278
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for riot
DROP DATABASE IF EXISTS `riot`;
CREATE DATABASE IF NOT EXISTS `riot` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `riot`;

-- Dumping structure for table riot.champion
CREATE TABLE IF NOT EXISTS `champion` (
  `championId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`championId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='VERY incomplete until I do more with champions. Right now I only need basic info to identify them by their IDs.';

-- Dumping data for table riot.champion: ~141 rows (approximately)
/*!40000 ALTER TABLE `champion` DISABLE KEYS */;
/*!40000 ALTER TABLE `champion` ENABLE KEYS */;

-- Dumping structure for table riot.champion_tag
CREATE TABLE IF NOT EXISTS `champion_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_champion_tags_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.champion_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `champion_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `champion_tag` ENABLE KEYS */;

-- Dumping structure for table riot.delta_type
CREATE TABLE IF NOT EXISTS `delta_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Dumping data for table riot.delta_type: ~7 rows (approximately)
/*!40000 ALTER TABLE `delta_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `delta_type` ENABLE KEYS */;

-- Dumping structure for table riot.item
CREATE TABLE IF NOT EXISTS `item` (
  `itemId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  `goldSellsFor` int(11) NOT NULL,
  `goldTotal` int(11) NOT NULL,
  `goldBase` int(11) NOT NULL,
  `purchasable` bit(1) NOT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='VERY incomplete until I do more with items. Right now I only need basic info to identify them by their IDs.';

-- Dumping data for table riot.item: ~326 rows (approximately)
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping structure for table riot.match
CREATE TABLE IF NOT EXISTS `match` (
  `gameId` int(11) unsigned NOT NULL COMMENT 'Given by Riot API',
  `seasonId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `queueId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `mapId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `platformId` varchar(50) NOT NULL COMMENT 'Region. Given by Riot API',
  `gameVersion` varchar(50) NOT NULL COMMENT 'Patch number',
  `gameMode` varchar(50) NOT NULL,
  `gameType` varchar(50) NOT NULL,
  `gameDuration` int(11) NOT NULL,
  `gameCreation` datetime NOT NULL,
  PRIMARY KEY (`gameId`),
  KEY `FK_matches_seasonId` (`seasonId`),
  CONSTRAINT `FK_match_seasonId` FOREIGN KEY (`seasonId`) REFERENCES `season` (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.match: ~0 rows (approximately)
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
/*!40000 ALTER TABLE `match` ENABLE KEYS */;

-- Dumping structure for table riot.match_list
CREATE TABLE IF NOT EXISTS `match_list` (
  `summonerId` int(11) NOT NULL,
  `gameId` int(11) unsigned NOT NULL,
  `championId` int(11) NOT NULL,
  `lane` varchar(6) NOT NULL,
  `role` varchar(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`summonerId`,`gameId`),
  KEY `FK_matches_profileId` (`summonerId`),
  KEY `FK_matches_gameId` (`gameId`),
  KEY `FK_matches_championId` (`championId`),
  CONSTRAINT `FK_match_list_championId` FOREIGN KEY (`championId`) REFERENCES `champion` (`championId`),
  CONSTRAINT `FK_match_list_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_match_list_summonerId` FOREIGN KEY (`summonerId`) REFERENCES `summoner` (`summonerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.match_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `match_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_list` ENABLE KEYS */;

-- Dumping structure for table riot.participant
CREATE TABLE IF NOT EXISTS `participant` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `championId` int(11) NOT NULL,
  `spell1Id` int(11) NOT NULL,
  `spell2Id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `highestAchievedSeasonTier` varchar(50) NOT NULL,
  PRIMARY KEY (`gameId`,`participantId`),
  KEY `IX_participants_participantId` (`participantId`),
  KEY `FK_participants_championId` (`championId`),
  KEY `FK_participants_spell1Id` (`spell1Id`),
  KEY `FK_participants_spell2Id` (`spell2Id`),
  CONSTRAINT `FK_participants_championId` FOREIGN KEY (`championId`) REFERENCES `champion` (`championId`),
  CONSTRAINT `FK_participants_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participants_spell1Id` FOREIGN KEY (`spell1Id`) REFERENCES `spell` (`spellId`),
  CONSTRAINT `FK_participants_spell2Id` FOREIGN KEY (`spell2Id`) REFERENCES `spell` (`spellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;

-- Dumping structure for table riot.participant_stat
CREATE TABLE IF NOT EXISTS `participant_stat` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `win` bit(1) NOT NULL COMMENT 'For some reason, it''s a bit here.',
  `kills` int(11) NOT NULL,
  `deaths` int(11) NOT NULL,
  `assists` int(11) NOT NULL,
  `largestKillingSpree` int(11) NOT NULL,
  `killingSprees` int(11) NOT NULL,
  `largestMultiKill` int(11) NOT NULL,
  `doubleKills` int(11) NOT NULL,
  `tripleKills` int(11) NOT NULL,
  `quadraKills` int(11) NOT NULL,
  `pentaKills` int(11) NOT NULL,
  `unrealKills` int(11) NOT NULL COMMENT 'HexaKill?',
  `physicalDamageDealt` int(11) NOT NULL,
  `physicalDamageDealtToChampions` int(11) NOT NULL,
  `magicDamageDealt` int(11) NOT NULL,
  `magicDamageDealtToChampions` int(11) NOT NULL,
  `trueDamageDealt` int(11) NOT NULL,
  `trueDamageDealtToChampions` int(11) NOT NULL,
  `totalDamageDealtToChampions` int(11) NOT NULL,
  `damageDealtToObjectives` int(11) NOT NULL,
  `totalDamageDealt` int(11) NOT NULL,
  `totalUnitsHealed` int(11) NOT NULL,
  `totalHeal` int(11) NOT NULL,
  `largestCriticalStrike` int(11) NOT NULL,
  `totalMinionsKilled` int(11) NOT NULL,
  `neutralMinionsKilled` int(11) NOT NULL,
  `neutralMinionsKilledTeamJungle` int(11) NOT NULL,
  `neutralMinionsKilledEnemyJungle` int(11) NOT NULL,
  `sightWardsBoughtInGame` int(11) NOT NULL,
  `visionWardsBoughtInGame` int(11) NOT NULL,
  `wardsKilled` int(11) NOT NULL,
  `wardsPlaced` int(11) NOT NULL,
  `visionScore` int(11) NOT NULL,
  `objectivePlayerScore` int(11) NOT NULL,
  `combatPlayerScore` int(11) NOT NULL,
  `totalPlayerScore` int(11) NOT NULL,
  `totalScoreRank` int(11) NOT NULL,
  `altarsCaptured` int(11) NOT NULL,
  `teamObjective` int(11) NOT NULL,
  `totalTimeCrowdControlDealt` int(11) NOT NULL,
  `timeCCingOthers` int(11) NOT NULL,
  `longestTimeSpentLiving` int(11) NOT NULL,
  `turretKills` int(11) NOT NULL,
  `damageDealtToTurrets` int(11) NOT NULL,
  `inhibitorKills` int(11) NOT NULL,
  `firstTowerAssist` bit(1) NOT NULL,
  `firstTowerKill` bit(1) NOT NULL,
  `firstBloodAssist` bit(1) NOT NULL,
  `firstInhibitorKill` bit(1) NOT NULL,
  `firstInhibitorAssist` bit(1) NOT NULL,
  `firstBloodKill` bit(1) NOT NULL,
  `champLevel` int(11) NOT NULL,
  `nodeNeutralize` int(11) NOT NULL,
  `nodeNeutralizeAssist` int(11) NOT NULL,
  `nodeCapture` int(11) NOT NULL,
  `nodeCaptureAssist` int(11) NOT NULL,
  `altarsNeutralized` int(11) NOT NULL,
  `goldEarned` int(11) NOT NULL,
  `goldSpent` int(11) NOT NULL,
  `physicalDamageTaken` int(11) NOT NULL,
  `magicalDamageTaken` int(11) NOT NULL,
  `trueDamageTaken` int(11) NOT NULL,
  `totalDamageTaken` int(11) NOT NULL,
  `perkPrimaryStyle` int(11) NOT NULL,
  `perkSubStyle` int(11) NOT NULL,
  PRIMARY KEY (`participantId`,`gameId`),
  KEY `FK_participant_stats_participantId` (`participantId`),
  KEY `FK_participant_stats_gameId` (`gameId`),
  CONSTRAINT `FK_participant_stats_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participant_stats_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_stat` ENABLE KEYS */;

-- Dumping structure for table riot.participant_timeline
CREATE TABLE IF NOT EXISTS `participant_timeline` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `lane` varchar(6) NOT NULL,
  `role` varchar(11) NOT NULL,
  PRIMARY KEY (`participantId`,`gameId`),
  KEY `FK_participant_timelines_participantId` (`participantId`),
  KEY `FK_participant_timelines_gameId` (`gameId`),
  CONSTRAINT `FK_participant_timelines_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participant_timelines_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant_timeline: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_timeline` ENABLE KEYS */;

-- Dumping structure for table riot.participant_timeline_delta
CREATE TABLE IF NOT EXISTS `participant_timeline_delta` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `deltaTypeId` int(11) NOT NULL,
  `increment` varchar(7) NOT NULL COMMENT 'Values indicate minutes such as "0-10", "10-20". Length of 7 should cover anything that goes into the 100+ min range. God help anyone who plays more than 16.5 hours in one game.',
  `value` decimal(10,3) NOT NULL,
  PRIMARY KEY (`participantId`,`gameId`,`deltaTypeId`,`increment`),
  KEY `deltaTypeId` (`deltaTypeId`),
  KEY `FK_participant_timeline_delta_gameId` (`gameId`),
  CONSTRAINT `FK_participant_timeline_delta_deltaTypeId` FOREIGN KEY (`deltaTypeId`) REFERENCES `delta_type` (`id`),
  CONSTRAINT `FK_participant_timeline_delta_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participant_timeline_delta_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant_timeline_delta: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_timeline_delta` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_timeline_delta` ENABLE KEYS */;

-- Dumping structure for table riot.perk
CREATE TABLE IF NOT EXISTS `perk` (
  `perkId` varchar(4) NOT NULL COMMENT 'Given by Riot API. First 2 characters show style. 84XX is style 8400.',
  `styleId` varchar(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`perkId`),
  KEY `FK_perks_styleId` (`styleId`),
  CONSTRAINT `FK_perk_styleId` FOREIGN KEY (`styleId`) REFERENCES `perk_style` (`styleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Runes are called perks in the API and are a part of the participantDTO. They are not directly available from the API, so I am having to infer and figure them out on my own.';

-- Dumping data for table riot.perk: ~63 rows (approximately)
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk` ENABLE KEYS */;

-- Dumping structure for table riot.perk_style
CREATE TABLE IF NOT EXISTS `perk_style` (
  `styleId` varchar(4) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`styleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='These are the major paths for the runes.';

-- Dumping data for table riot.perk_style: ~5 rows (approximately)
/*!40000 ALTER TABLE `perk_style` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk_style` ENABLE KEYS */;

-- Dumping structure for table riot.season
CREATE TABLE IF NOT EXISTS `season` (
  `seasonId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `number` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.season: ~2 rows (approximately)
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` (`seasonId`, `number`, `startDate`, `endDate`) VALUES
	(10, 7, '2018-01-16 00:00:00', '2018-01-17 00:00:00'),
	(11, 8, '2018-11-04 00:00:00', NULL);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;

-- Dumping structure for table riot.spell
CREATE TABLE IF NOT EXISTS `spell` (
  `spellId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `version` varchar(10) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `key` varchar(50) NOT NULL,
  PRIMARY KEY (`spellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='summoner spells';

-- Dumping data for table riot.spell: ~0 rows (approximately)
/*!40000 ALTER TABLE `spell` DISABLE KEYS */;
/*!40000 ALTER TABLE `spell` ENABLE KEYS */;

-- Dumping structure for table riot.summoner
CREATE TABLE IF NOT EXISTS `summoner` (
  `summonerId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `accountId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `profileIconId` int(11) NOT NULL,
  `summonerLevel` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `revisionDate` datetime NOT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  PRIMARY KEY (`summonerId`,`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.summoner: ~0 rows (approximately)
/*!40000 ALTER TABLE `summoner` DISABLE KEYS */;
/*!40000 ALTER TABLE `summoner` ENABLE KEYS */;

-- Dumping structure for table riot.team_ban
CREATE TABLE IF NOT EXISTS `team_ban` (
  `gameId` int(11) unsigned NOT NULL,
  `teamId` int(11) NOT NULL,
  `championId` int(11) NOT NULL,
  `pickTurn` int(11) NOT NULL,
  PRIMARY KEY (`gameId`,`teamId`,`pickTurn`),
  CONSTRAINT `FK_team_ban_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Probably don''t need this, but Riot probably thought the same.';

-- Dumping data for table riot.team_ban: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_ban` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_ban` ENABLE KEYS */;

-- Dumping structure for table riot.team_stat
CREATE TABLE IF NOT EXISTS `team_stat` (
  `gameId` int(11) unsigned NOT NULL,
  `teamId` int(11) NOT NULL COMMENT '100 = Blue and 200 = Red',
  `win` varchar(4) NOT NULL COMMENT 'Either "Win" or "Fail"',
  `baronKills` int(11) NOT NULL,
  `riftHeraldKills` int(11) NOT NULL,
  `vilemawKills` int(11) NOT NULL,
  `inhibitorKills` int(11) NOT NULL,
  `towerKills` int(11) NOT NULL,
  `dragonKills` int(11) NOT NULL,
  `dominionVictoryScore` int(11) NOT NULL COMMENT 'R.I.P.',
  `firstDragon` bit(1) NOT NULL,
  `firstInhibitor` bit(1) NOT NULL,
  `firstRiftHerald` bit(1) NOT NULL,
  `firstBlood` bit(1) NOT NULL,
  `firstTower` bit(1) NOT NULL,
  PRIMARY KEY (`gameId`,`teamId`),
  CONSTRAINT `FK_team_stats_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.team_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_stat` ENABLE KEYS */;

-- Dumping structure for table riot.xref_champion_tag
CREATE TABLE IF NOT EXISTS `xref_champion_tag` (
  `championId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`championId`),
  UNIQUE KEY `UX_champion_tags_championId_tagId` (`championId`,`tagId`),
  KEY `FK_xref_champion_tags_tagId` (`tagId`),
  CONSTRAINT `FK_xref_champion_tags_championId` FOREIGN KEY (`championId`) REFERENCES `champion` (`championId`),
  CONSTRAINT `FK_xref_champion_tags_tagId` FOREIGN KEY (`tagId`) REFERENCES `champion_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table name sucks';

-- Dumping data for table riot.xref_champion_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_champion_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_champion_tag` ENABLE KEYS */;

-- Dumping structure for table riot.xref_participant_item
CREATE TABLE IF NOT EXISTS `xref_participant_item` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  PRIMARY KEY (`participantId`,`gameId`),
  KEY `FK_participant_items_participantId` (`participantId`),
  KEY `FK_xref_participant_item_gameId` (`gameId`),
  KEY `FK_xref_participant_item_itemId` (`itemId`),
  CONSTRAINT `FK_xref_participant_item_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_xref_participant_item_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Might not be strictly needed, just as with bans, but it breaks from the normalized structure if I leave them part of the participants_stats table.\r\n\r\nThinking about it deeper, it really is a many-many relationship, so deserves its own table.';

-- Dumping data for table riot.xref_participant_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_participant_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_participant_item` ENABLE KEYS */;

-- Dumping structure for table riot.xref_participant_perk
CREATE TABLE IF NOT EXISTS `xref_participant_perk` (
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `perkId` varchar(4) NOT NULL,
  `varId` int(11) NOT NULL COMMENT 'Every perk gets 3. Pulling these into their own table allows me to expand the amount of vars instead of adding more columns to the stats table if Riot ever decides to use more.',
  `description` varchar(50) DEFAULT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`gameId`,`participantId`),
  UNIQUE KEY `perkId_varId` (`participantId`,`perkId`,`varId`),
  KEY `FK_perkId` (`perkId`),
  CONSTRAINT `FK_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`),
  CONSTRAINT `FK_perkId` FOREIGN KEY (`perkId`) REFERENCES `perk` (`perkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.xref_participant_perk: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_participant_perk` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_participant_perk` ENABLE KEYS */;

-- Dumping structure for table riot.xref_summoner_game
CREATE TABLE IF NOT EXISTS `xref_summoner_game` (
  `summonerId` int(11) NOT NULL,
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  PRIMARY KEY (`summonerId`,`gameId`,`participantId`),
  UNIQUE KEY `UX_summonerId_gameId` (`participantId`,`summonerId`,`gameId`),
  KEY `FK_xref_summoner_game_gameId` (`gameId`),
  CONSTRAINT `FK_xref_summoner_game_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_xref_summoner_game_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.xref_summoner_game: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_summoner_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_summoner_game` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
