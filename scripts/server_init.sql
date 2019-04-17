-- Dumping structure for table riot.champions
CREATE TABLE IF NOT EXISTS `champions` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.champion_history
CREATE TABLE IF NOT EXISTS `champion_history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `historyDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(1) NOT NULL,
  `championId` int(11) NOT NULL COMMENT 'Given by Riot API',
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
  PRIMARY KEY (`historyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping structure for table riot.champion_tags
CREATE TABLE IF NOT EXISTS `champion_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table riot.champion_tags: ~6 rows (approximately)
INSERT INTO `champion_tags` (`id`, `name`) VALUES
	(1, 'Fighter'),
	(2, 'Mage'),
	(3, 'Marksman'),
	(4, 'Tank'),
	(5, 'Assassin'),
	(6, 'Support');

-- Dumping structure for table riot.delta_types
CREATE TABLE IF NOT EXISTS `delta_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UX_DeltaType_Name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.delta_types: ~7 rows (approximately)
INSERT INTO `delta_types` (`id`, `name`) VALUES
	(1, 'creepsPerMinDeltas'),
	(4, 'csDiffPerMinDeltas'),
	(7, 'damageTakenDiffPerMinDeltas'),
	(6, 'damageTakenPerMinDeltas'),
	(3, 'goldPerMinDeltas'),
	(5, 'xpDiffPerMinDeltas'),
	(2, 'xpPerMinDeltas');

-- Dumping structure for table riot.items
CREATE TABLE IF NOT EXISTS `items` (
  `itemId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  `version` varchar(10) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `colloq` varchar(2000) DEFAULT NULL COMMENT 'store search shortcut',
  `plaintext` varchar(2000) DEFAULT NULL COMMENT 'short description',
  `goldBase` int(11) NOT NULL,
  `purchasable` bit(1) NOT NULL,
  `goldTotal` int(11) NOT NULL,
  `goldSellsFor` int(11) NOT NULL,
  `depth` int(11) NOT NULL DEFAULT '1',
  `from` varchar(2000) DEFAULT NULL,
  `into` varchar(2000) DEFAULT NULL,
  `hideFromAll` bit(1) DEFAULT NULL,
  `consumed` bit(1) DEFAULT NULL,
  `consumeOnFull` bit(1) DEFAULT NULL,
  `requiredAlly` varchar(50) DEFAULT NULL,
  `requiredChampion` varchar(50) DEFAULT NULL,
  `specialRecipe` int(11) DEFAULT NULL,
  `stacks` int(11) DEFAULT NULL,
  `inStore` bit(1) DEFAULT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.item_history
CREATE TABLE IF NOT EXISTS `item_history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `historyDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(1) NOT NULL,
  `itemId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `colloq` varchar(2000) DEFAULT NULL COMMENT 'store search shortcut',
  `plaintext` varchar(2000) DEFAULT NULL COMMENT 'short description',
  `goldBase` int(11) NOT NULL,
  `purchasable` bit(1) NOT NULL,
  `goldTotal` int(11) NOT NULL,
  `goldSellsFor` int(11) NOT NULL,
  `depth` int(11) NOT NULL DEFAULT '1',
  `from` varchar(2000) DEFAULT NULL,
  `into` varchar(2000) DEFAULT NULL,
  `hideFromAll` bit(1) DEFAULT NULL,
  `consumed` bit(1) DEFAULT NULL,
  `consumeOnFull` bit(1) DEFAULT NULL,
  `requiredAlly` varchar(50) DEFAULT NULL,
  `requiredChampion` varchar(50) DEFAULT NULL,
  `specialRecipe` int(11) DEFAULT NULL,
  `stacks` int(11) DEFAULT NULL,
  `inStore` bit(1) DEFAULT NULL,
  PRIMARY KEY (`historyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping structure for table riot.item_stats
CREATE TABLE IF NOT EXISTS `item_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemId` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `version` varchar(10) NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `itemId_type` (`itemId`,`type`),
  CONSTRAINT `FK_item_stat_item` FOREIGN KEY (`itemId`) REFERENCES `items` (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.item_stat_history
CREATE TABLE IF NOT EXISTS `item_stat_history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `historyDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(1) NOT NULL,
  `itemId` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`historyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping structure for table riot.item_tag
CREATE TABLE IF NOT EXISTS `item_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=UTF8;

-- Dumping data for table riot.item_tags: ~30 rows (approximately)
INSERT INTO `item_tags` (`id`, `name`) VALUES
	(1, 'SpellBlock'),
	(2, 'Health'),
	(3, 'HealthRegen'),
	(4, 'Jungle'),
	(5, 'SpellDamage'),
	(6, 'Vision'),
	(7, 'Active'),
	(8, 'NonbootsMovement'),
	(9, 'Stealth'),
	(10, 'SpellVamp'),
	(11, 'CooldownReduction'),
	(12, 'Lane'),
	(13, 'Damage'),
	(14, 'Boots'),
	(15, 'Mana'),
	(16, 'ManaRegen'),
	(17, 'Armor'),
	(18, 'LifeSteal'),
	(19, 'GoldPer'),
	(20, 'MagicPenetration'),
	(21, 'Tenacity'),
	(22, 'ArmorPenetration'),
	(23, 'Slow'),
	(24, 'OnHit'),
	(25, 'Aura'),
	(26, 'Consumable'),
	(27, 'Bilgewater'),
	(28, 'AttackSpeed'),
	(29, 'CriticalStrike'),
	(30, 'Trinket');

-- Dumping structure for table riot.maps
CREATE TABLE IF NOT EXISTS `maps` (
  `mapId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `notes` varchar(50) NOT NULL,
  PRIMARY KEY (`mapId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.maps: ~14 rows (approximately)
INSERT INTO `maps` (`mapId`, `name`, `notes`) VALUES
	(1, 'Summoner\'s Rift', 'Original Summer variant'),
	(2, 'Summoner\'s Rift', 'Original Autumn variant'),
	(3, 'The Proving Grounds', 'Tutorial map'),
	(4, 'Twisted Treeline', 'Original version'),
	(8, 'The Crystal Scar', 'Dominion map'),
	(10, 'Twisted Treeline', 'Current version'),
	(11, 'Summoner\'s Rift', 'Current version'),
	(12, 'Howling Abyss', 'ARAM map'),
	(14, 'Butcher\'s Bidge', 'ARAM map'),
	(16, 'Cosmic Ruins', 'Dark Star: Singularity map'),
	(18, 'Valoran City Park', 'Star Guardian Invasion map'),
	(19, 'Substructure 43', 'PROJECT: Hunters map'),
	(20, 'Crash Site', 'Odyssey: Extraction map'),
	(21, 'Nexus Blitz', 'Nexus Blitz map');
	
-- Dumping structure for table riot.seasons
CREATE TABLE IF NOT EXISTS `seasons` (
  `seasonId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `number` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `isCurrent` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.seasons: ~4 rows (approximately)
INSERT INTO `seasons` (`seasonId`, `number`, `name`, `startDate`, `endDate`, `isCurrent`) VALUES
	(11, 8, 'Season 2018', '2018-01-16 00:00:00', '2018-11-12 23:59:59', 0),
	(12, 9, 'Preseason 2019', '2018-11-13 00:00:00', '2019-01-22 23:59:59', 0),
	(13, 9, 'Season 2019', '2019-01-23 00:00:00', NULL, 0),
	(14, 9, 'Test Season', '2019-01-23 00:00:00', NULL, 1);

-- Dumping structure for table riot.queues
CREATE TABLE IF NOT EXISTS `queues` (
  `queueId` int(11) NOT NULL,
  `mapId` int(11) DEFAULT NULL,
  `map` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
	PRIMARY KEY (`queueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.queues: ~46 rows (approximately)
INSERT INTO `queues` (`queueId`, `mapId`, `map`, `description`) VALUES
	(0, NULL, 'Custom games', NULL),
	(72, 12, 'Howling Abyss', '1v1 Snowdown Showdown games'),
	(73, 12, 'Howling Abyss', '2v2 Snowdown Showdown games'),
	(75, 11, 'Summoner\'s Rift', '6v6 Hexakill games'),
	(76, 11, 'Summoner\'s Rift', 'Ultra Rapid Fire games'),
	(78, 12, 'Howling Abyss', 'One For All: Mirror Mode games'),
	(83, 11, 'Summoner\'s Rift', 'Co-op vs AI Ultra Rapid Fire games'),
	(98, 4, 'Twisted Treeline', '6v6 Hexakill games'),
	(100, 14, 'Butcher\'s Bridge', '5v5 ARAM games'),
	(310, 11, 'Summoner\'s Rift', 'Nemesis games'),
	(313, 11, 'Summoner\'s Rift', 'Black Market Brawlers games'),
	(317, 8, 'Crystal Scar', 'Definitely Not Dominion games'),
	(325, 11, 'Summoner\'s Rift', 'All Random games'),
	(400, 11, 'Summoner\'s Rift', '5v5 Draft Pick games'),
	(420, 11, 'Summoner\'s Rift', '5v5 Ranked Solo games'),
	(430, 11, 'Summoner\'s Rift', '5v5 Blind Pick games'),
	(440, 11, 'Summoner\'s Rift', '5v5 Ranked Flex games'),
	(450, 12, 'Howling Abyss', '5v5 ARAM games'),
	(460, 4, 'Twisted Treeline', '3v3 Blind Pick games'),
	(470, 4, 'Twisted Treeline', '3v3 Ranked Flex games'),
	(600, 11, 'Summoner\'s Rift', 'Blood Hunt Assassin games'),
	(610, 16, 'Cosmic Ruins', 'Dark Star: Singularity games'),
	(700, 11, 'Summoner\'s Rift', 'Clash games'),
	(800, 4, 'Twisted Treeline', 'Co-op vs. AI Intermediate Bot games'),
	(810, 4, 'Twisted Treeline', 'Co-op vs. AI Intro Bot games'),
	(820, 4, 'Twisted Treeline', 'Co-op vs. AI Beginner Bot games'),
	(830, 11, 'Summoner\'s Rift', 'Co-op vs. AI Intro Bot games'),
	(840, 11, 'Summoner\'s Rift', 'Co-op vs. AI Beginner Bot games'),
	(850, 11, 'Summoner\'s Rift', 'Co-op vs. AI Intermediate Bot games'),
	(900, 11, 'Summoner\'s Rift', 'ARURF games'),
	(910, 8, 'Crystal Scar', 'Ascension games'),
	(920, 12, 'Howling Abyss', 'Legend of the Poro King games'),
	(940, 11, 'Summoner\'s Rift', 'Nexus Siege games'),
	(950, 11, 'Summoner\'s Rift', 'Doom Bots Voting games'),
	(960, 11, 'Summoner\'s Rift', 'Doom Bots Standard games'),
	(980, 18, 'Valoran City Park', 'Star Guardian Invasion: Normal games'),
	(990, 18, 'Valoran City Park', 'Star Guardian Invasion: Onslaught games'),
	(1000, 19, 'Overcharge', 'PROJECT: Hunters games'),
	(1010, 11, 'Summoner\'s Rift', 'Snow ARURF games'),
	(1020, 11, 'Summoner\'s Rift', 'One for All games'),
	(1030, 20, 'Crash Site', 'Odyssey Extraction: Intro games'),
	(1040, 20, 'Crash Site', 'Odyssey Extraction: Cadet games'),
	(1050, 20, 'Crash Site', 'Odyssey Extraction: Crewmember games'),
	(1060, 20, 'Crash Site', 'Odyssey Extraction: Captain games'),
	(1070, 20, 'Crash Site', 'Odyssey Extraction: Onslaught games'),
	(1200, 21, 'Nexus Blitz', 'Nexus Blitz games');

-- Dumping structure for table riot.matches
CREATE TABLE IF NOT EXISTS `matches` (
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
  INDEX `FK_matches_seasonId` (`seasonId`),
  INDEX `FK_match_queueId` (`queueId`),
  INDEX `FK_match_mapId` (`mapId`),
  CONSTRAINT `FK_match_mapId` FOREIGN KEY (`mapId`) REFERENCES `maps` (`mapId`),
  CONSTRAINT `FK_match_queueId` FOREIGN KEY (`queueId`) REFERENCES `queues` (`queueId`),
  CONSTRAINT `FK_match_seasonId` FOREIGN KEY (`seasonId`) REFERENCES `seasons` (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.summoners
CREATE TABLE IF NOT EXISTS `summoners` (
  `puuid` varchar(100) NOT NULL COMMENT 'Given by Riot API',
  `summonerId` varchar(100) NOT NULL COMMENT 'Given by Riot API',
  `accountId` varchar(100) NOT NULL COMMENT 'Given by Riot API',
  `profileIconId` int(11) NOT NULL,
  `summonerLevel` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `revisionDate` datetime NOT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  PRIMARY KEY (`puuid`),
  KEY `IX_summonerId_name_puuid` (`puuid`,`summonerId`,`accountId`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.summoner: ~1 rows (approximately)
INSERT INTO `summoners` (`puuid`, `summonerId`, `accountId`, `profileIconId`, `summonerLevel`, `name`, `revisionDate`, `lastUpdated`) VALUES
	('tIIKBBTZc3D6MxkYRVBpqcSCKB0DyjnnUpTK7MYOD4D4Iihn-yUm10a31i2ODO85oVVqoooaH-scdg', 'hn6fijTA1IzLeOS2f2FGqpqLewXIXWuFpSEJCIcI0tj6d8g', 'DYnXK8GUEx62B3PE7gvyyr9CuijhaEPKrLPffXjsyfmAMYc', 744, 144, 'Raitono', '2019-02-25 02:09:14', NULL);

-- Dumping structure for table riot.match_lists
CREATE TABLE IF NOT EXISTS `match_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `summonerPUUID` varchar(100) NOT NULL,
  `gameId` int(11) unsigned NOT NULL,
  `championId` int(11) NOT NULL,
  `lane` varchar(6) NOT NULL,
  `role` varchar(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_matches_gameId` (`gameId`),
  KEY `FK_matches_championId` (`championId`),
  KEY `FK_matches_PUUID` (`summonerPUUID`),
  CONSTRAINT `FK_match_list_championId` FOREIGN KEY (`championId`) REFERENCES `champions` (`championId`),
  CONSTRAINT `FK_match_list_gameId` FOREIGN KEY (`gameId`) REFERENCES `matches` (`gameId`),
  CONSTRAINT `FK_match_list_summonerPUUID` FOREIGN KEY (`summonerPUUID`) REFERENCES `summoners` (`puuid`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

-- Dumping structure for table riot.metadata
CREATE TABLE IF NOT EXISTS `metadata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Holds information that is useful but doesn''t necessarily fit into the data tables';

-- Dumping data for table riot.metadata: ~0 rows (approximately)
INSERT INTO `metadata` (`id`, `name`, `value`) VALUES
	(1, 'current_patch', '9.1.1');

-- Dumping structure for table riot.spells
CREATE TABLE IF NOT EXISTS `spells` (
  `spellId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  `key` varchar(50) NOT NULL,
  PRIMARY KEY (`spellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='summoner spells';

-- Dumping data for table riot.spells: ~21 rows (approximately)
INSERT INTO `spells` (`spellId`, `name`, `key`) VALUES
	(1, 'Cleanse', 'SummonerBoost'),
	(3, 'Exhaust', 'SummonerExhaust'),
	(4, 'Flash', 'SummonerFlash'),
	(6, 'Ghost', 'SummonerHaste'),
	(7, 'Heal', 'SummonerHeal'),
	(11, 'Smite', 'SummonerSmite'),
	(12, 'Teleport', 'SummonerTeleport'),
	(13, 'Clarity', 'SummonerMana'),
	(14, 'Ignite', 'SummonerDot'),
	(21, 'Barrier', 'SummonerBarrier'),
	(30, 'To the King!', 'SummonerPoroRecall'),
	(31, 'Poro Toss', 'SummonerPoroThrow'),
	(32, 'Mark', 'SummonerSnowball'),
	(33, 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect1'),
	(34, 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect2'),
	(35, 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect1'),
	(36, 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect2'),
	(39, 'Ultra (Rapidly Flung) Mark', 'SummonerSnowURFSnowball_Mark'),
	(50, 'Resuscitate', 'SummonerOdysseyRevive'),
	(51, 'Ghost', 'SummonerOdysseyGhost'),
	(52, 'Warp', 'SummonerOdysseyFlash');

-- Dumping structure for table riot.participants
CREATE TABLE IF NOT EXISTS `participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `accountId` varchar(100) NOT NULL,
  `championId` int(11) NOT NULL,
  `spell1Id` int(11) NOT NULL,
  `spell2Id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `lane` varchar(6) NOT NULL,
  `role` varchar(11) NOT NULL,
  `highestAchievedSeasonTier` varchar(50) NOT NULL DEFAULT 'UNRANKED',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_participantId` (`gameId`,`participantId`),
  KEY `IX_participants_participantId` (`participantId`),
  KEY `FK_participants_championId` (`championId`),
  KEY `FK_participants_spell1Id` (`spell1Id`),
  KEY `FK_participants_spell2Id` (`spell2Id`),
  CONSTRAINT `FK_participants_championId` FOREIGN KEY (`championId`) REFERENCES `champions` (`championId`),
  CONSTRAINT `FK_participants_gameId` FOREIGN KEY (`gameId`) REFERENCES `matches` (`gameId`),
  CONSTRAINT `FK_participants_spell1Id` FOREIGN KEY (`spell1Id`) REFERENCES `spells` (`spellId`),
  CONSTRAINT `FK_participants_spell2Id` FOREIGN KEY (`spell2Id`) REFERENCES `spells` (`spellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.participant_stats
CREATE TABLE IF NOT EXISTS `participant_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `statPerk0` int(11) NOT NULL,
  `statPerk1` int(11) NOT NULL,
  `statPerk2` int(11) NOT NULL,
  `damageSelfMitigated` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_participant_stats_participantId` (`participantId`),
  CONSTRAINT `FK_participant_stats_participantId` FOREIGN KEY (`participantId`) REFERENCES `participants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.participant_timeline_deltas
CREATE TABLE IF NOT EXISTS `participant_timeline_deltas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participantId` int(11) NOT NULL,
  `deltaTypeId` int(11) NOT NULL,
  `increment` varchar(7) NOT NULL COMMENT 'Values indicate minutes such as "0-10", "10-20". Length of 7 should cover anything that goes into the 100+ min range. God help anyone who plays more than 16.5 hours in one game.',
  `value` decimal(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `participantId_deltaTypeId_increment` (`participantId`,`deltaTypeId`,`increment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.perk_styles
CREATE TABLE IF NOT EXISTS `perk_styles` (
  `styleId` varchar(4) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`styleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='These are the major paths for the runes.';

-- Dumping data for table riot.perk_styles: ~5 rows (approximately)
INSERT INTO `perk_styles` (`styleId`, `name`) VALUES
	('8000', 'Precision'),
	('8100', 'Domination'),
	('8200', 'Sorcery'),
	('8300', 'Inspiration'),
	('8400', 'Resolve');

-- Dumping structure for table riot.perks
CREATE TABLE IF NOT EXISTS `perks` (
  `perkId` varchar(4) NOT NULL COMMENT 'Given by Riot API. First 2 characters show style. 84XX is style 8400.',
  `styleId` varchar(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`perkId`),
  KEY `FK_perks_styleId` (`styleId`),
  CONSTRAINT `FK_perk_styleId` FOREIGN KEY (`styleId`) REFERENCES `perk_styles` (`styleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Runes are called perks in the API and are a part of the participantDTO. They are not directly available from the API, so I am having to infer and figure them out on my own.';

-- Dumping data for table riot.perks: ~64 rows (approximately)
INSERT INTO `perks` (`perkId`, `styleId`, `name`) VALUES
	('8005', '8000', 'Press the Attack'),
	('8008', '8000', 'Lethal Tempo'),
	('8009', '8000', 'Presence of Mind'),
	('8010', '8000', 'Conqueror'),
	('8014', '8000', 'Coup de Grace'),
	('8017', '8000', 'Cut Down'),
	('8021', '8000', 'Fleet Footwork'),
	('8105', '8100', 'Relentless Hunter'),
	('8106', '8100', 'Ultimate Hunter'),
	('8112', '8100', 'Electrocute'),
	('8120', '8100', 'Ghost Poro'),
	('8124', '8100', 'Predator'),
	('8126', '8100', 'Cheap Shot'),
	('8128', '8100', 'Dark Harvest'),
	('8134', '8100', 'Ingenious Hunter'),
	('8135', '8100', 'Ravenous Hunter'),
	('8136', '8100', 'Zombie Ward'),
	('8138', '8100', 'Eyeball Collection'),
	('8139', '8100', 'Taste of Blood'),
	('8143', '8100', 'Sudden Impact'),
	('8210', '8200', 'Transcendence'),
	('8214', '8200', 'Summon Aery'),
	('8224', '8200', 'Nullifying Orb'),
	('8226', '8200', 'Manaflow Band'),
	('8229', '8200', 'Arcane Comet'),
	('8230', '8200', 'Phase Rush'),
	('8232', '8200', 'Waterwalking'),
	('8233', '8200', 'Absolute Focus'),
	('8234', '8200', 'Celerity'),
	('8236', '8200', 'Gathering Storm'),
	('8237', '8200', 'Scorch'),
	('8242', '8400', 'Unflinching'),
	('8275', '8200', 'Nimbus Cloak'),
	('8299', '8000', 'Last Stand'),
	('8304', '8300', 'Magical Footwear'),
	('8306', '8300', 'Hextech Flashtraption'),
	('8313', '8300', 'Perfect Timing'),
	('8316', '8300', 'Minion Dematerializer'),
	('8321', '8300', 'Future\'s Market'),
	('8345', '8300', 'Biscuit Delivery'),
	('8347', '8300', 'Cosmic Insight'),
	('8351', '8300', 'Glacial Augment'),
	('8352', '8300', 'Time Warp Tonic'),
	('8359', '8300', 'Kleptomancy'),
	('8360', '8300', 'Unsealed Spellbook'),
	('8401', '8400', 'Shield Bash'),
	('8410', '8300', 'Approach Velocity'),
	('8429', '8400', 'Conditioning'),
	('8437', '8400', 'Grasp of the Undying'),
	('8439', '8400', 'Aftershock'),
	('8444', '8400', 'Second Wind'),
	('8446', '8400', 'Demolish'),
	('8451', '8400', 'Overgrowth'),
	('8453', '8400', 'Revitalize'),
	('8463', '8400', 'Font of Life'),
	('8465', '8400', 'Guardian'),
	('8472', '8400', 'Chrysalis'),
	('8473', '8400', 'Bone Plating'),
	('9101', '8000', 'Overheal'),
	('9103', '8000', 'Legend: Bloodline'),
	('9104', '8000', 'Legend: Alacrity'),
	('9105', '8000', 'Legend: Tenacity'),
	('9111', '8000', 'Triumph'),
	('9923', '8100', 'Hail of Blades');

-- Dumping structure for table riot.team_bans
CREATE TABLE IF NOT EXISTS `team_bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `teamId` int(11) NOT NULL,
  `championId` int(11) NOT NULL,
  `pickTurn` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_teamId_pickTurn` (`gameId`,`teamId`,`pickTurn`),
  KEY `FK_team_ban_championId` (`championId`),
  CONSTRAINT `FK_team_ban_championId` FOREIGN KEY (`championId`) REFERENCES `champions` (`championId`),
  CONSTRAINT `FK_team_ban_gameId` FOREIGN KEY (`gameId`) REFERENCES `matches` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Probably don''t need this, but Riot probably thought the same.';

-- Dumping structure for table riot.team_stat
CREATE TABLE IF NOT EXISTS `team_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_teamId` (`gameId`,`teamId`),
  CONSTRAINT `FK_team_stats_gameId` FOREIGN KEY (`gameId`) REFERENCES `matches` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.xref_champion_tag
CREATE TABLE IF NOT EXISTS `xref_champion_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `championId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UX_champion_tags_championId_tagId` (`championId`,`tagId`),
  KEY `FK_xref_champion_tags_tagId` (`tagId`),
  CONSTRAINT `FK_xref_champion_tags_championId` FOREIGN KEY (`championId`) REFERENCES `champions` (`championId`),
  CONSTRAINT `FK_xref_champion_tags_tagId` FOREIGN KEY (`tagId`) REFERENCES `champion_tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.xref_items_maps
CREATE TABLE IF NOT EXISTS `xref_items_maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `itemId` int(11) NOT NULL,
  `mapId` int(11) NOT NULL,
  `enabled` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `itemId_mapId` (`itemId`,`mapId`),
  KEY `FK_xref_item_map_map` (`mapId`),
  CONSTRAINT `FK_xref_item_map_item` FOREIGN KEY (`itemId`) REFERENCES `items` (`itemId`),
  CONSTRAINT `FK_xref_item_map_map` FOREIGN KEY (`mapId`) REFERENCES `maps` (`mapId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.xref_item_map_history
CREATE TABLE IF NOT EXISTS `xref_item_map_history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `historyDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(1) NOT NULL,
  `itemId` int(11) NOT NULL,
  `mapId` int(11) NOT NULL,
  `enabled` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`historyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping structure for table riot.xref_items_tags
CREATE TABLE IF NOT EXISTS `xref_items_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `itemId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_xref_item_tag_item` (`itemId`),
  KEY `FK_xref_item_tag_tag` (`tagId`),
  CONSTRAINT `FK_xref_item_tag_item` FOREIGN KEY (`itemId`) REFERENCES `items` (`itemId`),
  CONSTRAINT `FK_xref_item_tag_tag` FOREIGN KEY (`tagId`) REFERENCES `item_tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table riot.xref_item_tag_history
CREATE TABLE IF NOT EXISTS `xref_item_tag_history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(10) NOT NULL,
  `historyDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(1) NOT NULL,
  `itemId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`historyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping structure for table riot.xref_participants_items
CREATE TABLE IF NOT EXISTS `xref_participants_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participantId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_participant_items_participantId` (`participantId`),
  KEY `FK_xref_participant_item_itemId` (`itemId`),
  CONSTRAINT `FK_xref_participant_item_itemId` FOREIGN KEY (`itemId`) REFERENCES `items` (`itemId`),
  CONSTRAINT `FK_xref_participant_item_participantId` FOREIGN KEY (`participantId`) REFERENCES `participants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Might not be strictly needed, just as with bans, but it breaks from the normalized structure if I leave them part of the participants_stats table.\r\n\r\nThinking about it deeper, it really is a many-many relationship, so deserves its own table.';

-- Dumping structure for table riot.xref_participants_perks
CREATE TABLE IF NOT EXISTS `xref_participants_perks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participantId` int(11) NOT NULL,
  `perkId` varchar(4) NOT NULL,
  `varId` int(11) NOT NULL COMMENT 'Every perk gets 3. Pulling these into their own table allows me to expand the amount of vars instead of adding more columns to the stats table if Riot ever decides to use more.',
  `description` varchar(50) DEFAULT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_participantId_perkId_varId` (`participantId`,`perkId`,`varId`),
  KEY `FK_perkId` (`perkId`),
  KEY `FK_participantId` (`participantId`),
  CONSTRAINT `FK_participantId` FOREIGN KEY (`participantId`) REFERENCES `participants` (`id`),
  CONSTRAINT `FK_perkId` FOREIGN KEY (`perkId`) REFERENCES `perks` (`perkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for trigger riot.champion_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `champions_after_insert` AFTER INSERT ON `champions` FOR EACH ROW BEGIN
	INSERT INTO champion_history(`version`, `action`, `championId`, `name`,
	`title`, `partype`, `hp`, `hpperlevel`, `mp`, `mpperlevel`, `movespeed`,
	`armor`, `armorperlevel`,`spellblock`, `spellblockperlevel`, `attackrange`,
	`hpregen`,`hpregenperlevel`, `mpregen`, `mpregenperlevel`, `crit`,
	`critperlevel`,`attackdamage`, `attackdamageperlevel`, `attackspeedperlevel`,
	`attackspeed`)
	VALUES (NEW.`version`, 'I', NEW.`championId`, NEW.`name`, NEW.`title`,
	NEW.`partype`, NEW.`hp`, NEW.`hpperlevel`, NEW.`mp`, NEW.`mpperlevel`,
	NEW.`movespeed`, NEW.`armor`, NEW.`armorperlevel`, NEW.`spellblock`,
	NEW.`spellblockperlevel`, NEW.`attackrange`, NEW.`hpregen`,
	NEW.`hpregenperlevel`, NEW.`mpregen`, NEW.`mpregenperlevel`, NEW.`crit`,
	NEW.`critperlevel`, NEW.`attackdamage`, NEW.`attackdamageperlevel`,
	NEW.`attackspeedperlevel`, NEW.`attackspeed`);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.champion_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `champions_after_update` AFTER UPDATE ON `champions` FOR EACH ROW BEGIN
	IF(NEW.name <> OLD.name OR NEW.title <> OLD.title OR
	NEW.partype <> OLD.partype OR NEW.hp <> OLD.hp OR
	NEW.hpperlevel <> OLD.hpperlevel OR NEW.mp <> OLD.mp OR
	NEW.mpperlevel <> OLD.mpperlevel OR NEW.movespeed <> OLD.movespeed OR
	NEW.armor <> OLD.armor OR NEW.armorperlevel <> OLD.armorperlevel OR
	NEW.spellblock <> OLD.spellblock OR
	NEW.spellblockperlevel <> OLD.spellblockperlevel OR
	NEW.attackrange <> OLD.attackrange OR NEW.hpregen <> OLD.hpregen OR
	NEW.hpregenperlevel <> OLD.hpregenperlevel OR NEW.mpregen <> OLD.mpregen OR
	NEW.mpregenperlevel <> OLD.mpregenperlevel OR NEW.crit <> OLD.crit OR
	NEW.critperlevel <> OLD.critperlevel OR NEW.attackdamage <> OLD.attackdamage
	OR NEW.attackdamageperlevel <> OLD.attackdamageperlevel OR
	NEW.attackspeedperlevel <> OLD.attackspeedperlevel OR
	NEW.attackspeed <> OLD.attackspeed
	) THEN
	INSERT INTO champion_history(`version`, `action`, `championId`, `name`,
	`title`, `partype`, `hp`, `hpperlevel`, `mp`, `mpperlevel`, `movespeed`,
	`armor`, `armorperlevel`,`spellblock`, `spellblockperlevel`, `attackrange`,
	`hpregen`,`hpregenperlevel`, `mpregen`, `mpregenperlevel`, `crit`,
	`critperlevel`,`attackdamage`, `attackdamageperlevel`, `attackspeedperlevel`,
	`attackspeed`)
	VALUES (NEW.`version`, 'U', NEW.`championId`, NEW.`name`, NEW.`title`,
	NEW.`partype`, NEW.`hp`, NEW.`hpperlevel`, NEW.`mp`, NEW.`mpperlevel`,
	NEW.`movespeed`, NEW.`armor`, NEW.`armorperlevel`, NEW.`spellblock`,
	NEW.`spellblockperlevel`, NEW.`attackrange`, NEW.`hpregen`,
	NEW.`hpregenperlevel`, NEW.`mpregen`, NEW.`mpregenperlevel`, NEW.`crit`,
	NEW.`critperlevel`, NEW.`attackdamage`, NEW.`attackdamageperlevel`,
	NEW.`attackspeedperlevel`, NEW.`attackspeed`);
	END IF;
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.item_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `items_after_insert` AFTER INSERT ON `items` FOR EACH ROW BEGIN
	INSERT INTO item_history(version, action, `itemId`, `name`, `description`,
	`colloq`, `plaintext`, `goldBase`, `purchasable`, `goldTotal`, `goldSellsFor`,
	`depth`, `from`, `into`, `hideFromAll`, `consumed`, `consumeOnFull`,
	`requiredAlly`, `requiredChampion`, `specialRecipe`, `stacks`, `inStore`)
	VALUES (NEW.version, 'I', NEW.`itemId`, NEW.`name`, NEW.`description`,
	NEW.`colloq`, NEW.`plaintext`, NEW.`goldBase`, NEW.`purchasable`,
	NEW.`goldTotal`, NEW.`goldSellsFor`, NEW.`depth`, NEW.`from`, NEW.`into`,
	NEW.`hideFromAll`, NEW.`consumed`, NEW.`consumeOnFull`, NEW.`requiredAlly`,
	NEW.`requiredChampion`, NEW.`specialRecipe`, NEW.`stacks`, NEW.`inStore`);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.item_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `items_after_update` AFTER UPDATE ON `items` FOR EACH ROW BEGIN
	IF(NEW.name <> OLD.name OR IFNULL(NEW.description, '') <> IFNULL(OLD.description, '') OR
		IFNULL(NEW.colloq, '') <> IFNULL(OLD.colloq, '') OR IFNULL(NEW.plaintext, '') <> IFNULL(OLD.plaintext, '') OR
		NEW.goldBase <> OLD.goldBase OR NEW.purchasable <> OLD.purchasable OR
		NEW.goldTotal <> OLD.goldTotal OR NEW.goldSellsFor <> OLD.goldSellsFor OR
		NEW.depth <> OLD.depth OR IFNULL(NEW.from, '') <> IFNULL(OLD.from, '') OR IFNULL(NEW.into, '') <> IFNULL(OLD.into, '') OR
		IFNULL(NEW.hideFromAll, '') <> IFNULL(OLD.hideFromAll, '') OR IFNULL(NEW.consumed, '') <> IFNULL(OLD.consumed, '') OR
		IFNULL(NEW.consumeOnFull, '') <> IFNULL(OLD.consumeOnFull, '') OR
		IFNULL(NEW.requiredAlly, '') <> IFNULL(OLD.requiredAlly, '') OR
		IFNULL(NEW.requiredChampion, '') <> IFNULL(OLD.requiredChampion, '') OR
		IFNULL(NEW.specialRecipe, '') <> IFNULL(OLD.specialRecipe, '') OR IFNULL(NEW.stacks, '') <> IFNULL(OLD.stacks, '') OR
		IFNULL(NEW.inStore, '') <> IFNULL(OLD.inStore, '')
	) THEN
	INSERT INTO item_history(version, action, `itemId`, `name`, `description`,
	`colloq`, `plaintext`, `goldBase`, `purchasable`, `goldTotal`, `goldSellsFor`,
	`depth`, `from`, `into`, `hideFromAll`, `consumed`, `consumeOnFull`,
	`requiredAlly`, `requiredChampion`, `specialRecipe`, `stacks`, `inStore`)
	VALUES (NEW.version, 'U', NEW.`itemId`, NEW.`name`, NEW.`description`,
	NEW.`colloq`, NEW.`plaintext`, NEW.`goldBase`, NEW.`purchasable`,
	NEW.`goldTotal`, NEW.`goldSellsFor`, NEW.`depth`, NEW.`from`, NEW.`into`,
	NEW.`hideFromAll`, NEW.`consumed`, NEW.`consumeOnFull`, NEW.`requiredAlly`,
	NEW.`requiredChampion`, NEW.`specialRecipe`, NEW.`stacks`, NEW.`inStore`);
	END IF;
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.item_stat_after_delete
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `item_stats_after_delete` AFTER DELETE ON `item_stats` FOR EACH ROW BEGIN
	DECLARE patch varchar(10);
	
	SELECT value INTO patch FROM metadata WHERE name = 'current_patch';
	
	INSERT INTO item_stat_history(`version`, `action`, `itemId`, `type`, `value`)
	VALUES(patch, 'D', OLD.itemId, OLD.type, OLD.value);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.item_stat_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `item_stats_after_insert` AFTER INSERT ON `item_stats` FOR EACH ROW BEGIN
	INSERT INTO item_stat_history(`version`, `action`, `itemId`, `type`, `value`)
	VALUES(NEW.version, 'I', NEW.itemId, NEW.type, NEW.value);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.item_stat_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `item_stats_after_update` AFTER UPDATE ON `item_stats` FOR EACH ROW BEGIN
	IF(NEW.value <> OLD.value) THEN
	INSERT INTO item_stat_history(`version`, `action`, `itemId`, `type`, `value`)
	VALUES(NEW.version, 'U', NEW.itemId, NEW.type, NEW.value);
	END IF;
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.xref_item_map_after_delete
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `xref_items_maps_after_delete` AFTER DELETE ON `xref_items_maps` FOR EACH ROW BEGIN
	DECLARE patch varchar(10);
	
	SELECT value INTO patch FROM metadata WHERE name = 'current_patch';
	
	INSERT INTO xref_item_map_history(`version`, `action`, `itemId`, `mapId`, `enabled`)
	VALUES (patch, 'D', OLD.`itemId`, OLD.`mapId`, OLD.`enabled`);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.xref_item_map_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `xref_items_maps_after_insert` AFTER INSERT ON `xref_items_maps` FOR EACH ROW BEGIN
	INSERT INTO xref_item_map_history(`version`, `action`, `itemId`, `mapId`, `enabled`)
	VALUES (NEW.`version`, 'I', NEW.`itemId`, NEW.`mapId`, NEW.`enabled`);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.xref_item_map_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `xref_items_maps_after_update` AFTER UPDATE ON `xref_items_maps` FOR EACH ROW BEGIN
	IF(NEW.enabled <> OLD.enabled) THEN
	INSERT INTO xref_item_map_history(`version`, `action`, `itemId`, `mapId`, `enabled`)
	VALUES (NEW.`version`, 'U', NEW.`itemId`, NEW.`mapId`, NEW.`enabled`);
	END IF;
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.xref_item_tag_after_delete
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `xref_items_tags_after_delete` AFTER DELETE ON `xref_items_tags` FOR EACH ROW BEGIN
	DECLARE patch varchar(10);
	
	SELECT value INTO patch FROM metadata WHERE name = 'current_patch';
	
	INSERT INTO xref_item_tag_history(`version`, `action`, `itemId`, `tagId`)
	VALUES (patch, 'D', OLD.itemId, OLD.tagId);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger riot.xref_item_tag_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
CREATE TRIGGER `xref_items_tags_after_insert` AFTER INSERT ON `xref_items_tags` FOR EACH ROW BEGIN
	INSERT INTO xref_item_tag_history(`version`, `action`, `itemId`, `tagId`)
	VALUES (NEW.version, 'I', NEW.itemId, NEW.tagId);
END;
SET SQL_MODE=@OLDTMP_SQL_MODE;