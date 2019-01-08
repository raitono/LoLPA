-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.20-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5282
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

-- Dumping data for table riot.champion: ~143 rows (approximately)
/*!40000 ALTER TABLE `champion` DISABLE KEYS */;
INSERT INTO `champion` (`championId`, `name`, `title`) VALUES
	(-1, 'None', 'None'),
	(1, 'Annie', 'the Dark Child'),
	(2, 'Olaf', 'the Berserker'),
	(3, 'Galio', 'the Colossus'),
	(4, 'Twisted Fate', 'the Card Master'),
	(5, 'Xin Zhao', 'the Seneschal of Demacia'),
	(6, 'Urgot', 'the Dreadnought'),
	(7, 'LeBlanc', 'the Deceiver'),
	(8, 'Vladimir', 'the Crimson Reaper'),
	(9, 'Fiddlesticks', 'the Harbinger of Doom'),
	(10, 'Kayle', 'The Judicator'),
	(11, 'Master Yi', 'the Wuju Bladesman'),
	(12, 'Alistar', 'the Minotaur'),
	(13, 'Ryze', 'the Rune Mage'),
	(14, 'Sion', 'The Undead Juggernaut'),
	(15, 'Sivir', 'the Battle Mistress'),
	(16, 'Soraka', 'the Starchild'),
	(17, 'Teemo', 'the Swift Scout'),
	(18, 'Tristana', 'the Yordle Gunner'),
	(19, 'Warwick', 'the Uncaged Wrath of Zaun'),
	(20, 'Nunu & Willump', 'the Boy and His Yeti'),
	(21, 'Miss Fortune', 'the Bounty Hunter'),
	(22, 'Ashe', 'the Frost Archer'),
	(23, 'Tryndamere', 'the Barbarian King'),
	(24, 'Jax', 'Grandmaster at Arms'),
	(25, 'Morgana', 'Fallen Angel'),
	(26, 'Zilean', 'the Chronokeeper'),
	(27, 'Singed', 'the Mad Chemist'),
	(28, 'Evelynn', 'Agony\'s Embrace'),
	(29, 'Twitch', 'the Plague Rat'),
	(30, 'Karthus', 'the Deathsinger'),
	(31, 'Cho\'Gath', 'the Terror of the Void'),
	(32, 'Amumu', 'the Sad Mummy'),
	(33, 'Rammus', 'the Armordillo'),
	(34, 'Anivia', 'the Cryophoenix'),
	(35, 'Shaco', 'the Demon Jester'),
	(36, 'Dr. Mundo', 'the Madman of Zaun'),
	(37, 'Sona', 'Maven of the Strings'),
	(38, 'Kassadin', 'the Void Walker'),
	(39, 'Irelia', 'the Blade Dancer'),
	(40, 'Janna', 'the Storm\'s Fury'),
	(41, 'Gangplank', 'the Saltwater Scourge'),
	(42, 'Corki', 'the Daring Bombardier'),
	(43, 'Karma', 'the Enlightened One'),
	(44, 'Taric', 'the Shield of Valoran'),
	(45, 'Veigar', 'the Tiny Master of Evil'),
	(48, 'Trundle', 'the Troll King'),
	(50, 'Swain', 'the Noxian Grand General'),
	(51, 'Caitlyn', 'the Sheriff of Piltover'),
	(53, 'Blitzcrank', 'the Great Steam Golem'),
	(54, 'Malphite', 'Shard of the Monolith'),
	(55, 'Katarina', 'the Sinister Blade'),
	(56, 'Nocturne', 'the Eternal Nightmare'),
	(57, 'Maokai', 'the Twisted Treant'),
	(58, 'Renekton', 'the Butcher of the Sands'),
	(59, 'Jarvan IV', 'the Exemplar of Demacia'),
	(60, 'Elise', 'the Spider Queen'),
	(61, 'Orianna', 'the Lady of Clockwork'),
	(62, 'Wukong', 'the Monkey King'),
	(63, 'Brand', 'the Burning Vengeance'),
	(64, 'Lee Sin', 'the Blind Monk'),
	(67, 'Vayne', 'the Night Hunter'),
	(68, 'Rumble', 'the Mechanized Menace'),
	(69, 'Cassiopeia', 'the Serpent\'s Embrace'),
	(72, 'Skarner', 'the Crystal Vanguard'),
	(74, 'Heimerdinger', 'the Revered Inventor'),
	(75, 'Nasus', 'the Curator of the Sands'),
	(76, 'Nidalee', 'the Bestial Huntress'),
	(77, 'Udyr', 'the Spirit Walker'),
	(78, 'Poppy', 'Keeper of the Hammer'),
	(79, 'Gragas', 'the Rabble Rouser'),
	(80, 'Pantheon', 'the Artisan of War'),
	(81, 'Ezreal', 'the Prodigal Explorer'),
	(82, 'Mordekaiser', 'the Iron Revenant'),
	(83, 'Yorick', 'Shepherd of Souls'),
	(84, 'Akali', 'the Rogue Assassin'),
	(85, 'Kennen', 'the Heart of the Tempest'),
	(86, 'Garen', 'The Might of Demacia'),
	(89, 'Leona', 'the Radiant Dawn'),
	(90, 'Malzahar', 'the Prophet of the Void'),
	(91, 'Talon', 'the Blade\'s Shadow'),
	(92, 'Riven', 'the Exile'),
	(96, 'Kog\'Maw', 'the Mouth of the Abyss'),
	(98, 'Shen', 'the Eye of Twilight'),
	(99, 'Lux', 'the Lady of Luminosity'),
	(101, 'Xerath', 'the Magus Ascendant'),
	(102, 'Shyvana', 'the Half-Dragon'),
	(103, 'Ahri', 'the Nine-Tailed Fox'),
	(104, 'Graves', 'the Outlaw'),
	(105, 'Fizz', 'the Tidal Trickster'),
	(106, 'Volibear', 'the Thunder\'s Roar'),
	(107, 'Rengar', 'the Pridestalker'),
	(110, 'Varus', 'the Arrow of Retribution'),
	(111, 'Nautilus', 'the Titan of the Depths'),
	(112, 'Viktor', 'the Machine Herald'),
	(113, 'Sejuani', 'Fury of the North'),
	(114, 'Fiora', 'the Grand Duelist'),
	(115, 'Ziggs', 'the Hexplosives Expert'),
	(117, 'Lulu', 'the Fae Sorceress'),
	(119, 'Draven', 'the Glorious Executioner'),
	(120, 'Hecarim', 'the Shadow of War'),
	(121, 'Kha\'Zix', 'the Voidreaver'),
	(122, 'Darius', 'the Hand of Noxus'),
	(126, 'Jayce', 'the Defender of Tomorrow'),
	(127, 'Lissandra', 'the Ice Witch'),
	(131, 'Diana', 'Scorn of the Moon'),
	(133, 'Quinn', 'Demacia\'s Wings'),
	(134, 'Syndra', 'the Dark Sovereign'),
	(136, 'Aurelion Sol', 'The Star Forger'),
	(141, 'Kayn', 'the Shadow Reaper'),
	(142, 'Zoe', 'the Aspect of Twilight'),
	(143, 'Zyra', 'Rise of the Thorns'),
	(145, 'Kai\'Sa', 'Daughter of the Void'),
	(150, 'Gnar', 'the Missing Link'),
	(154, 'Zac', 'the Secret Weapon'),
	(157, 'Yasuo', 'the Unforgiven'),
	(161, 'Vel\'Koz', 'the Eye of the Void'),
	(163, 'Taliyah', 'the Stoneweaver'),
	(164, 'Camille', 'the Steel Shadow'),
	(201, 'Braum', 'the Heart of the Freljord'),
	(202, 'Jhin', 'the Virtuoso'),
	(203, 'Kindred', 'The Eternal Hunters'),
	(222, 'Jinx', 'the Loose Cannon'),
	(223, 'Tahm Kench', 'the River King'),
	(236, 'Lucian', 'the Purifier'),
	(238, 'Zed', 'the Master of Shadows'),
	(240, 'Kled', 'the Cantankerous Cavalier'),
	(245, 'Ekko', 'the Boy Who Shattered Time'),
	(254, 'Vi', 'the Piltover Enforcer'),
	(266, 'Aatrox', 'the Darkin Blade'),
	(267, 'Nami', 'the Tidecaller'),
	(268, 'Azir', 'the Emperor of the Sands'),
	(412, 'Thresh', 'the Chain Warden'),
	(420, 'Illaoi', 'the Kraken Priestess'),
	(421, 'Rek\'Sai', 'the Void Burrower'),
	(427, 'Ivern', 'the Green Father'),
	(429, 'Kalista', 'the Spear of Vengeance'),
	(432, 'Bard', 'the Wandering Caretaker'),
	(497, 'Rakan', 'The Charmer'),
	(498, 'Xayah', 'the Rebel'),
	(516, 'Ornn', 'The Fire below the Mountain'),
	(518, 'Neeko', 'the Curious Chameleon'),
	(555, 'Pyke', 'the Bloodharbor Ripper');
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
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UX_DeltaType_Name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.delta_type: ~7 rows (approximately)
/*!40000 ALTER TABLE `delta_type` DISABLE KEYS */;
INSERT INTO `delta_type` (`id`, `name`) VALUES
	(1, 'creepsPerMinDeltas'),
	(4, 'csDiffPerMinDeltas'),
	(7, 'damageTakenDiffPerMinDeltas'),
	(6, 'damageTakenPerMinDeltas'),
	(3, 'goldPerMinDeltas'),
	(5, 'xpDiffPerMinDeltas'),
	(2, 'xpPerMinDeltas');
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

-- Dumping data for table riot.item: ~317 rows (approximately)
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`itemId`, `name`, `goldSellsFor`, `goldTotal`, `goldBase`, `purchasable`) VALUES
	(0, 'None', 0, 0, 0, b'0'),
	(1001, 'Boots of Speed', 210, 300, 300, b'1'),
	(1004, 'Faerie Charm', 88, 125, 125, b'1'),
	(1006, 'Rejuvenation Bead', 105, 150, 150, b'1'),
	(1011, 'Giant\'s Belt', 700, 1000, 600, b'1'),
	(1026, 'Blasting Wand', 595, 850, 850, b'1'),
	(1027, 'Sapphire Crystal', 245, 350, 350, b'1'),
	(1028, 'Ruby Crystal', 280, 400, 400, b'1'),
	(1029, 'Cloth Armor', 210, 300, 300, b'1'),
	(1031, 'Chain Vest', 560, 800, 500, b'1'),
	(1033, 'Null-Magic Mantle', 315, 450, 450, b'1'),
	(1036, 'Long Sword', 245, 350, 350, b'1'),
	(1037, 'Pickaxe', 613, 875, 875, b'1'),
	(1038, 'B. F. Sword', 910, 1300, 1300, b'1'),
	(1039, 'Hunter\'s Talisman', 245, 350, 350, b'1'),
	(1041, 'Hunter\'s Machete', 245, 350, 350, b'1'),
	(1042, 'Dagger', 210, 300, 300, b'1'),
	(1043, 'Recurve Bow', 700, 1000, 400, b'1'),
	(1051, 'Brawler\'s Gloves', 280, 400, 400, b'1'),
	(1052, 'Amplifying Tome', 305, 435, 435, b'1'),
	(1053, 'Vampiric Scepter', 630, 900, 550, b'1'),
	(1054, 'Doran\'s Shield', 180, 450, 450, b'1'),
	(1055, 'Doran\'s Blade', 180, 450, 450, b'1'),
	(1056, 'Doran\'s Ring', 160, 400, 400, b'1'),
	(1057, 'Negatron Cloak', 504, 720, 270, b'1'),
	(1058, 'Needlessly Large Rod', 875, 1250, 1250, b'1'),
	(1059, 'Space Vampiric Scepter', 630, 900, 550, b'1'),
	(1082, 'The Dark Seal', 245, 350, 350, b'1'),
	(1083, 'Cull', 180, 450, 450, b'1'),
	(1400, 'Enchantment: Warrior', 1838, 2625, 525, b'1'),
	(1401, 'Enchantment: Cinderhulk', 1750, 2500, 600, b'1'),
	(1402, 'Enchantment: Runic Echoes', 1838, 2625, 375, b'1'),
	(1412, 'Enchantment: Warrior', 1838, 2625, 525, b'1'),
	(1413, 'Enchantment: Cinderhulk', 1750, 2500, 600, b'1'),
	(1414, 'Enchantment: Runic Echoes', 1838, 2625, 375, b'1'),
	(1416, 'Enchantment: Bloodrazor', 1838, 2625, 625, b'1'),
	(1419, 'Enchantment: Bloodrazor', 1838, 2625, 625, b'1'),
	(2003, 'Health Potion', 20, 50, 50, b'1'),
	(2004, 'Mana Potion', 12, 30, 30, b'0'),
	(2009, 'Total Biscuit of Rejuvenation', 0, 0, 0, b'0'),
	(2010, 'Total Biscuit of Everlasting Will', 30, 75, 75, b'0'),
	(2011, 'Elixir Of Skill', 0, 0, 0, b'0'),
	(2012, 'Looted Biscuit of Rejuvenation', 30, 75, 75, b'0'),
	(2013, 'Looted Oracle\'s Extract', 24, 60, 60, b'0'),
	(2015, 'Kircheis Shard', 560, 800, 500, b'1'),
	(2031, 'Refillable Potion', 60, 150, 150, b'1'),
	(2032, 'Hunter\'s Potion', 160, 400, 250, b'1'),
	(2033, 'Corrupting Potion', 200, 500, 350, b'1'),
	(2047, 'Oracle\'s Extract', 120, 300, 300, b'1'),
	(2050, 'Explorer\'s Ward', 0, 0, 0, b'0'),
	(2051, 'Guardian\'s Horn', 380, 950, 950, b'1'),
	(2052, 'Poro-Snax', 0, 0, 0, b'0'),
	(2053, 'Raptor Cloak', 630, 900, 450, b'1'),
	(2054, 'Diet Poro-Snax', 0, 0, 0, b'0'),
	(2055, 'Control Ward', 30, 75, 75, b'1'),
	(2056, 'Pilfered Stealth Ward', 24, 60, 60, b'0'),
	(2057, 'Peering Farsight Ward', 24, 60, 60, b'0'),
	(2058, 'Travel Size Elixir of Iron', 32, 80, 80, b'0'),
	(2059, 'Travel Size Elixir of Sorcery', 32, 80, 80, b'0'),
	(2060, 'Travel Size Elixir of Wrath', 32, 80, 80, b'0'),
	(2061, 'Pilfered Health Potion', 16, 40, 40, b'0'),
	(2062, 'Pilfered Potion of Rouge', 32, 80, 80, b'0'),
	(2065, 'Shurelya\'s Reverie', 1575, 2250, 475, b'1'),
	(2138, 'Elixir of Iron', 200, 500, 500, b'1'),
	(2139, 'Elixir of Sorcery', 200, 500, 500, b'1'),
	(2140, 'Elixir of Wrath', 200, 500, 500, b'1'),
	(2319, 'Sly Sack of Gold', 65, 65, 65, b'0'),
	(2403, 'Minion Dematerializer', 0, 0, 0, b'0'),
	(2419, 'Commencing Stopwatch', 0, 0, 0, b'0'),
	(2420, 'Stopwatch', 240, 600, 600, b'1'),
	(2421, 'Broken Stopwatch', 240, 600, 600, b'1'),
	(2422, 'Slightly Magical Boots', 210, 300, 300, b'0'),
	(2423, 'Stopwatch', 240, 600, 600, b'0'),
	(2424, 'Broken Stopwatch', 240, 600, 600, b'0'),
	(3001, 'Abyssal Mask', 2100, 3000, 1180, b'1'),
	(3003, 'Archangel\'s Staff', 2240, 3200, 1050, b'1'),
	(3004, 'Manamune', 1680, 2400, 675, b'1'),
	(3005, 'Atma\'s Reckoning', 2030, 2900, 925, b'1'),
	(3006, 'Berserker\'s Greaves', 770, 1100, 500, b'1'),
	(3007, 'Archangel\'s Staff (Quick Charge)', 2240, 3200, 1050, b'1'),
	(3008, 'Manamune (Quick Charge)', 1680, 2400, 675, b'1'),
	(3009, 'Boots of Swiftness', 630, 900, 600, b'1'),
	(3010, 'Catalyst of Aeons', 770, 1100, 350, b'1'),
	(3020, 'Sorcerer\'s Shoes', 770, 1100, 800, b'1'),
	(3022, 'Frozen Mallet', 2170, 3100, 900, b'1'),
	(3024, 'Glacial Shroud', 630, 900, 250, b'1'),
	(3025, 'Iceborn Gauntlet', 1890, 2700, 750, b'1'),
	(3026, 'Guardian Angel', 1120, 2800, 100, b'1'),
	(3027, 'Rod of Ages', 1890, 2700, 750, b'1'),
	(3028, 'Chalice of Harmony', 560, 800, 100, b'1'),
	(3029, 'Rod of Ages (Quick Charge)', 1890, 2700, 750, b'1'),
	(3030, 'Hextech GLP-800', 1960, 2800, 450, b'1'),
	(3031, 'Infinity Edge', 2380, 3400, 1225, b'1'),
	(3033, 'Mortal Reminder', 1960, 2800, 700, b'1'),
	(3035, 'Last Whisper', 910, 1300, 950, b'1'),
	(3036, 'Lord Dominik\'s Regards', 1960, 2800, 625, b'1'),
	(3040, 'Seraph\'s Embrace', 2240, 3200, 3200, b'0'),
	(3041, 'Mejai\'s Soulstealer', 980, 1400, 1050, b'1'),
	(3042, 'Muramana', 1680, 2400, 2400, b'0'),
	(3043, 'Muramana', 1680, 2400, 2400, b'0'),
	(3044, 'Phage', 875, 1250, 500, b'1'),
	(3046, 'Phantom Dancer', 1890, 2700, 800, b'1'),
	(3047, 'Ninja Tabi', 770, 1100, 500, b'1'),
	(3048, 'Seraph\'s Embrace', 2240, 3200, 3200, b'0'),
	(3050, 'Zeke\'s Convergence', 1575, 2250, 250, b'1'),
	(3052, 'Jaurim\'s Fist', 840, 1200, 450, b'1'),
	(3053, 'Sterak\'s Gage', 2240, 3200, 725, b'1'),
	(3056, 'Ohmwrecker', 1855, 2650, 950, b'1'),
	(3057, 'Sheen', 735, 1050, 700, b'1'),
	(3065, 'Spirit Visage', 1960, 2800, 800, b'1'),
	(3067, 'Kindlegem', 560, 800, 400, b'1'),
	(3068, 'Sunfire Cape', 2030, 2900, 800, b'1'),
	(3069, 'Remnant of the Ascended', 600, 1500, 250, b'1'),
	(3070, 'Tear of the Goddess', 595, 850, 375, b'1'),
	(3071, 'The Black Cleaver', 2100, 3000, 950, b'1'),
	(3072, 'The Bloodthirster', 2450, 3500, 950, b'1'),
	(3073, 'Tear of the Goddess (Quick Charge)', 595, 850, 375, b'1'),
	(3074, 'Ravenous Hydra', 2450, 3500, 525, b'1'),
	(3075, 'Thornmail', 2030, 2900, 500, b'1'),
	(3076, 'Bramble Vest', 700, 1000, 400, b'1'),
	(3077, 'Tiamat', 840, 1200, 350, b'1'),
	(3078, 'Trinity Force', 2613, 3733, 333, b'1'),
	(3080, 'Space Bloodthirster', 2310, 3300, 750, b'1'),
	(3082, 'Warden\'s Mail', 700, 1000, 400, b'1'),
	(3083, 'Warmog\'s Armor', 1995, 2850, 400, b'1'),
	(3084, 'Overlord\'s Bloodmail', 1785, 2550, 900, b'1'),
	(3085, 'Runaan\'s Hurricane', 1960, 2800, 900, b'1'),
	(3086, 'Zeal', 910, 1300, 600, b'1'),
	(3087, 'Statikk Shiv', 1960, 2800, 700, b'1'),
	(3089, 'Rabadon\'s Deathcap', 2520, 3600, 1100, b'1'),
	(3090, 'Wooglet\'s Witchcap', 2380, 3400, 450, b'1'),
	(3091, 'Wit\'s End', 1680, 2400, 380, b'1'),
	(3092, 'Remnant of the Watchers', 720, 1800, 550, b'1'),
	(3094, 'Rapid Firecannon', 1960, 2800, 700, b'1'),
	(3095, 'Stormrazor', 1960, 2800, 500, b'1'),
	(3096, 'Nomad\'s Medallion', 340, 850, 300, b'1'),
	(3097, 'Targon\'s Brace', 340, 850, 300, b'1'),
	(3098, 'Frostfang', 340, 850, 325, b'1'),
	(3100, 'Lich Bane', 2240, 3200, 450, b'1'),
	(3101, 'Stinger', 770, 1100, 500, b'1'),
	(3102, 'Banshee\'s Veil', 2100, 3000, 800, b'1'),
	(3104, 'Lord Van Damm\'s Pillager', 2100, 3000, 700, b'1'),
	(3105, 'Aegis of the Legion', 770, 1100, 350, b'1'),
	(3107, 'Redemption', 1470, 2100, 650, b'1'),
	(3108, 'Fiendish Codex', 630, 900, 465, b'1'),
	(3109, 'Knight\'s Vow', 1540, 2200, 600, b'1'),
	(3110, 'Frozen Heart', 1890, 2700, 800, b'1'),
	(3111, 'Mercury\'s Treads', 770, 1100, 350, b'1'),
	(3112, 'Guardian\'s Orb', 380, 950, 950, b'1'),
	(3113, 'Aether Wisp', 595, 850, 415, b'1'),
	(3114, 'Forbidden Idol', 560, 800, 550, b'1'),
	(3115, 'Nashor\'s Tooth', 2100, 3000, 1000, b'1'),
	(3116, 'Rylai\'s Crystal Scepter', 1820, 2600, 915, b'1'),
	(3117, 'Boots of Mobility', 630, 900, 600, b'1'),
	(3118, 'Space Knight\'s Vow', 1540, 2200, 600, b'1'),
	(3122, 'Wicked Hatchet', 840, 1200, 450, b'1'),
	(3123, 'Executioner\'s Calling', 560, 800, 450, b'1'),
	(3124, 'Guinsoo\'s Rageblade', 2170, 3100, 790, b'1'),
	(3128, 'Deathfire Grasp', 2100, 3000, 850, b'1'),
	(3131, 'Sword of the Divine', 1750, 2500, 800, b'1'),
	(3133, 'Caulfield\'s Warhammer', 770, 1100, 400, b'1'),
	(3134, 'Serrated Dirk', 770, 1100, 400, b'1'),
	(3135, 'Void Staff', 1855, 2650, 1365, b'1'),
	(3136, 'Haunting Guise', 1050, 1500, 665, b'1'),
	(3137, 'Dervish Blade', 1890, 2700, 300, b'1'),
	(3139, 'Mercurial Scimitar', 2380, 3400, 325, b'1'),
	(3140, 'Quicksilver Sash', 910, 1300, 850, b'1'),
	(3142, 'Youmuu\'s Ghostblade', 2030, 2900, 700, b'1'),
	(3143, 'Randuin\'s Omen', 2030, 2900, 900, b'1'),
	(3144, 'Bilgewater Cutlass', 1050, 1500, 250, b'1'),
	(3145, 'Hextech Revolver', 735, 1050, 180, b'1'),
	(3146, 'Hextech Gunblade', 2380, 3400, 850, b'1'),
	(3147, 'Duskblade of Draktharr', 2030, 2900, 700, b'1'),
	(3148, 'Space Hextech Gunblade', 2380, 3400, 850, b'1'),
	(3149, 'Space Blade of the Ruined King', 2240, 3200, 700, b'1'),
	(3151, 'Liandry\'s Torment', 2170, 3100, 750, b'1'),
	(3152, 'Hextech Protobelt-01', 1750, 2500, 650, b'1'),
	(3153, 'Blade of the Ruined King', 2240, 3200, 700, b'1'),
	(3154, 'Wriggle\'s Lantern', 1155, 1650, 100, b'1'),
	(3155, 'Hexdrinker', 910, 1300, 500, b'1'),
	(3156, 'Maw of Malmortius', 2275, 3250, 850, b'1'),
	(3157, 'Zhonya\'s Hourglass', 2030, 2900, 300, b'1'),
	(3158, 'Ionian Boots of Lucidity', 630, 900, 600, b'1'),
	(3161, 'Spear of Shojin', 2030, 2900, 800, b'1'),
	(3162, 'Space Bilgewater Cutlass', 1050, 1500, 250, b'1'),
	(3163, 'Space Maw of Malmortius', 2275, 3250, 850, b'1'),
	(3165, 'Morellonomicon', 2100, 3000, 650, b'1'),
	(3170, 'Moonflair Spellblade', 1680, 2400, 580, b'1'),
	(3172, 'Zephyr', 1960, 2800, 900, b'1'),
	(3173, 'Space Boots of Lucidity', 630, 900, 600, b'1'),
	(3174, 'Athene\'s Unholy Grail', 1470, 2100, 400, b'1'),
	(3175, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3181, 'Sanguine Blade', 1680, 2400, 625, b'1'),
	(3184, 'Guardian\'s Hammer', 380, 950, 950, b'1'),
	(3187, 'Arcane Sweeper', 1435, 2050, 350, b'1'),
	(3190, 'Locket of the Iron Solari', 1540, 2200, 650, b'1'),
	(3191, 'Seeker\'s Armguard', 770, 1100, 65, b'1'),
	(3193, 'Gargoyle Stoneplate', 1750, 2500, 380, b'1'),
	(3194, 'Adaptive Helm', 1960, 2800, 1000, b'1'),
	(3196, 'The Hex Core mk-1', 805, 1150, 1150, b'1'),
	(3197, 'The Hex Core mk-2', 1505, 2150, 1000, b'1'),
	(3198, 'Perfect Hex Core', 2100, 3000, 850, b'1'),
	(3200, 'Prototype Hex Core', 0, 0, 0, b'0'),
	(3211, 'Spectre\'s Cowl', 840, 1200, 350, b'1'),
	(3222, 'Mikael\'s Crucible', 1470, 2100, 500, b'1'),
	(3230, 'Space Ravenous Hydra', 2450, 3500, 525, b'1'),
	(3231, 'Space Mercurial Scimitar', 2380, 3400, 325, b'1'),
	(3252, 'Poacher\'s Dirk', 350, 500, 150, b'1'),
	(3285, 'Luden\'s Echo', 2240, 3200, 1050, b'1'),
	(3301, 'Ancient Coin', 160, 400, 400, b'1'),
	(3302, 'Relic Shield', 160, 400, 400, b'1'),
	(3303, 'Spellthief\'s Edge', 160, 400, 400, b'1'),
	(3304, 'Timeworn Ancient Coin', 160, 400, 400, b'1'),
	(3305, 'Timeworn Nomad\'s Medallion', 340, 850, 300, b'1'),
	(3306, 'Timeworn Talisman of Ascension', 880, 2200, 450, b'1'),
	(3307, 'Timeworn Relic Shield', 160, 400, 400, b'1'),
	(3308, 'Timeworn Targon\'s Brace', 340, 850, 300, b'1'),
	(3309, 'Timeworn Face of the Mountain', 840, 2100, 450, b'1'),
	(3310, 'Timeworn Spellthief\'s Edge', 160, 400, 400, b'1'),
	(3311, 'Timeworn Frostfang', 340, 850, 325, b'1'),
	(3312, 'Timeworn Frost Queen\'s Claim', 880, 2200, 500, b'1'),
	(3340, 'Warding Totem (Trinket)', 0, 0, 0, b'1'),
	(3345, 'Soul Anchor (Trinket)', 0, 0, 0, b'0'),
	(3348, 'Arcane Sweeper', 0, 0, 0, b'0'),
	(3361, 'Greater Stealth Totem (Trinket)', 175, 250, 250, b'0'),
	(3362, 'Greater Vision Totem (Trinket)', 175, 250, 250, b'0'),
	(3363, 'Farsight Alteration', 0, 0, 0, b'1'),
	(3364, 'Oracle Lens', 0, 0, 0, b'1'),
	(3371, 'Molten Edge', 3080, 4400, 1000, b'1'),
	(3373, 'Forgefire Cape', 2730, 3900, 1000, b'1'),
	(3374, 'Rabadon\'s Deathcrown', 3220, 4600, 1000, b'1'),
	(3379, 'Infernal Mask', 2800, 4000, 1000, b'1'),
	(3380, 'The Obsidian Cleaver', 2800, 4000, 1000, b'1'),
	(3382, 'Salvation', 1820, 2600, 500, b'1'),
	(3383, 'Circlet of the Iron Solari', 1890, 2700, 500, b'1'),
	(3384, 'Trinity Fusion', 3313, 4733, 1000, b'1'),
	(3385, 'Wooglet\'s Witchcrown', 3115, 4450, 1050, b'1'),
	(3386, 'Zhonya\'s Paradox', 2730, 3900, 1000, b'1'),
	(3400, '\'Your Cut\'', 0, 0, 0, b'0'),
	(3401, 'Remnant of the Aspect', 720, 1800, 550, b'1'),
	(3410, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3416, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3422, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3455, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3460, 'Golden Transcendence', 0, 0, 0, b'0'),
	(3461, 'Golden Transcendence (Disabled)', 0, 0, 0, b'0'),
	(3462, 'Seer Stone (Trinket)', 0, 0, 0, b'0'),
	(3504, 'Ardent Censer', 1610, 2300, 650, b'1'),
	(3508, 'Essence Reaver', 2100, 3000, 250, b'1'),
	(3512, 'Zz\'Rot Portal', 1890, 2700, 1080, b'1'),
	(3513, 'Eye of the Herald', 0, 0, 0, b'0'),
	(3514, 'Eye of the Herald', 0, 0, 0, b'0'),
	(3520, 'Ghost Poro', 0, 0, 0, b'0'),
	(3599, 'The Black Spear', 0, 0, 0, b'1'),
	(3630, 'Siege Teleport', 7, 10, 10, b'0'),
	(3631, 'Siege Ballista', 0, 0, 0, b'1'),
	(3633, 'Siege Teleport', 7, 10, 10, b'0'),
	(3634, 'Tower: Beam of Ruination', 0, 0, 0, b'1'),
	(3635, 'Port Pad', 0, 0, 0, b'1'),
	(3636, 'Tower: Storm Bulwark', 0, 0, 0, b'1'),
	(3637, 'Nexus Siege: Siege Weapon Slot', 7, 10, 10, b'0'),
	(3640, 'Flash Zone', 0, 0, 0, b'1'),
	(3641, 'Vanguard Banner', 0, 0, 0, b'1'),
	(3642, 'Siege Refund', 0, 0, 0, b'1'),
	(3643, 'Entropy Field', 0, 0, 0, b'1'),
	(3645, 'Seer Stone (Trinket)', 0, 0, 0, b'0'),
	(3647, 'Shield Totem', 0, 0, 0, b'1'),
	(3648, 'Siege Teleport (Inactive)', 0, 0, 0, b'0'),
	(3649, 'Siege Sight Warder', 0, 0, 0, b'0'),
	(3671, 'Enchantment: Warrior', 1138, 1625, 525, b'1'),
	(3672, 'Enchantment: Cinderhulk', 998, 1425, 525, b'1'),
	(3673, 'Enchantment: Runic Echoes', 1138, 1625, 340, b'1'),
	(3675, 'Enchantment: Bloodrazor', 1138, 1625, 625, b'1'),
	(3680, 'Frosted Snax', 0, 0, 0, b'1'),
	(3681, 'Super Spicy Snax', 0, 0, 0, b'1'),
	(3682, 'Espresso Snax', 0, 0, 0, b'1'),
	(3683, 'Rainbow Snax Party Pack!', 0, 0, 0, b'1'),
	(3690, 'Cosmic Shackle', 0, 0, 0, b'1'),
	(3691, 'Singularity Lantern', 0, 0, 0, b'1'),
	(3692, 'Dark Matter Scythe', 0, 0, 0, b'1'),
	(3693, 'Gravity Boots', 0, 0, 0, b'1'),
	(3694, 'Cloak of Stars', 0, 0, 0, b'1'),
	(3695, 'Dark Star Sigil', 0, 0, 0, b'1'),
	(3706, 'Stalker\'s Blade', 700, 1000, 300, b'1'),
	(3715, 'Skirmisher\'s Sabre', 700, 1000, 300, b'1'),
	(3742, 'Dead Man\'s Plate', 2030, 2900, 1100, b'1'),
	(3748, 'Titanic Hydra', 2450, 3500, 700, b'1'),
	(3751, 'Bami\'s Cinder', 630, 900, 500, b'1'),
	(3800, 'Righteous Glory', 1855, 2650, 1100, b'1'),
	(3801, 'Crystalline Bracer', 455, 650, 100, b'1'),
	(3802, 'Lost Chapter', 910, 1300, 80, b'1'),
	(3812, 'Death\'s Dance', 2450, 3500, 625, b'1'),
	(3813, 'Space Death\'s Dance', 2450, 3500, 625, b'1'),
	(3814, 'Edge of Night', 2100, 3000, 625, b'1'),
	(3901, 'Fire at Will', 0, 0, 0, b'1'),
	(3902, 'Death\'s Daughter', 0, 0, 0, b'1'),
	(3903, 'Raise Morale', 0, 0, 0, b'1'),
	(3905, 'Twin Shadows', 1680, 2400, 650, b'1'),
	(3907, 'Spellbinder', 2030, 2900, 800, b'1'),
	(3916, 'Oblivion Orb', 1050, 1500, 665, b'1'),
	(4001, 'Ghostwalkers (Melee Only)', 700, 1000, 700, b'1'),
	(4003, 'Lifeline', 1050, 1500, 550, b'1'),
	(4004, 'Spectral Cutlass', 2100, 3000, 400, b'1'),
	(4101, 'Pridestalker\'s Blade', 315, 450, 450, b'1'),
	(4102, 'Enchantment: Warrior', 1838, 2625, 1075, b'1'),
	(4103, 'Enchantment: Cinderhulk', 1838, 2625, 1275, b'1'),
	(4104, 'Enchantment: Runic Echoes', 1838, 2625, 925, b'1'),
	(4105, 'Enchantment: Bloodrazor', 1838, 2625, 1175, b'1'),
	(4201, 'Doran\'s Lost Shield', 180, 450, 450, b'1'),
	(4202, 'Doran\'s Lost Blade', 180, 450, 450, b'1'),
	(4203, 'Doran\'s Lost Ring', 160, 400, 400, b'1'),
	(4204, 'Doran\'s Lost Idol', 160, 400, 400, b'1'),
	(4301, 'Philosopher\'s Medallion', 180, 450, 450, b'1'),
	(4302, 'Heart of Targon', 160, 400, 400, b'1'),
	(4401, 'Force of Nature', 2030, 2900, 1160, b'1'),
	(4402, 'Innervating Locket', 1960, 2800, 600, b'1'),
	(4403, 'Stat-Stick of Stoicism', 5444, 7777, 1127, b'1');
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
  CONSTRAINT `FK_match_list_championId` FOREIGN KEY (`championId`) REFERENCES `champion` (`championId`),
  CONSTRAINT `FK_match_list_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_match_list_summonerPUUID` FOREIGN KEY (`summonerPUUID`) REFERENCES `summoner` (`puuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.match_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `match_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_list` ENABLE KEYS */;

-- Dumping structure for table riot.participant
CREATE TABLE IF NOT EXISTS `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `accountId` varchar(100) NOT NULL,
  `championId` int(11) NOT NULL,
  `spell1Id` int(11) NOT NULL,
  `spell2Id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `highestAchievedSeasonTier` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_participantId` (`gameId`,`participantId`),
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
  PRIMARY KEY (`id`),
  KEY `FK_participant_stats_participantId` (`participantId`),
  CONSTRAINT `FK_participant_stats_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_stat` ENABLE KEYS */;

-- Dumping structure for table riot.participant_timeline
CREATE TABLE IF NOT EXISTS `participant_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participantId` int(11) NOT NULL,
  `lane` varchar(6) NOT NULL,
  `role` varchar(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_participant_timelines_participantId` (`participantId`),
  CONSTRAINT `FK_participant_timelines_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.participant_timeline: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_timeline` ENABLE KEYS */;

-- Dumping structure for table riot.participant_timeline_delta
CREATE TABLE IF NOT EXISTS `participant_timeline_delta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participantId` int(11) NOT NULL,
  `deltaTypeId` int(11) NOT NULL,
  `increment` varchar(7) NOT NULL COMMENT 'Values indicate minutes such as "0-10", "10-20". Length of 7 should cover anything that goes into the 100+ min range. God help anyone who plays more than 16.5 hours in one game.',
  `value` decimal(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `participantId_deltaTypeId_increment` (`participantId`,`deltaTypeId`,`increment`)
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

-- Dumping data for table riot.perk: ~64 rows (approximately)
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
INSERT INTO `perk` (`perkId`, `styleId`, `name`) VALUES
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
/*!40000 ALTER TABLE `perk` ENABLE KEYS */;

-- Dumping structure for table riot.perk_style
CREATE TABLE IF NOT EXISTS `perk_style` (
  `styleId` varchar(4) NOT NULL COMMENT 'Given by Riot API',
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`styleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='These are the major paths for the runes.';

-- Dumping data for table riot.perk_style: ~5 rows (approximately)
/*!40000 ALTER TABLE `perk_style` DISABLE KEYS */;
INSERT INTO `perk_style` (`styleId`, `name`) VALUES
	('8000', 'Precision'),
	('8100', 'Domination'),
	('8200', 'Sorcery'),
	('8300', 'Inspiration'),
	('8400', 'Resolve');
/*!40000 ALTER TABLE `perk_style` ENABLE KEYS */;

-- Dumping structure for table riot.season
CREATE TABLE IF NOT EXISTS `season` (
  `seasonId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `number` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `isCurrent` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.season: ~3 rows (approximately)
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` (`seasonId`, `number`, `name`, `startDate`, `endDate`, `isCurrent`) VALUES
	(11, 8, 'Season 2018', '2018-01-16 00:00:00', '2018-11-12 23:59:59', 0),
	(12, 9, 'Preseason 2019', '2018-11-13 00:00:00', NULL, 0),
	(13, 9, 'Season 2019', '2019-01-06 00:00:00', NULL, 1);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;

-- Dumping structure for table riot.spell
CREATE TABLE IF NOT EXISTS `spell` (
  `spellId` int(11) NOT NULL COMMENT 'Given by Riot API',
  `version` varchar(10) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `key` varchar(50) NOT NULL,
  PRIMARY KEY (`spellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='summoner spells';

-- Dumping data for table riot.spell: ~21 rows (approximately)
/*!40000 ALTER TABLE `spell` DISABLE KEYS */;
INSERT INTO `spell` (`spellId`, `version`, `name`, `key`) VALUES
	(1, '8.24.1', 'Cleanse', 'SummonerBoost'),
	(3, '8.24.1', 'Exhaust', 'SummonerExhaust'),
	(4, '8.24.1', 'Flash', 'SummonerFlash'),
	(6, '8.24.1', 'Ghost', 'SummonerHaste'),
	(7, '8.24.1', 'Heal', 'SummonerHeal'),
	(11, '8.24.1', 'Smite', 'SummonerSmite'),
	(12, '8.24.1', 'Teleport', 'SummonerTeleport'),
	(13, '8.24.1', 'Clarity', 'SummonerMana'),
	(14, '8.24.1', 'Ignite', 'SummonerDot'),
	(21, '8.24.1', 'Barrier', 'SummonerBarrier'),
	(30, '8.24.1', 'To the King!', 'SummonerPoroRecall'),
	(31, '8.24.1', 'Poro Toss', 'SummonerPoroThrow'),
	(32, '8.24.1', 'Mark', 'SummonerSnowball'),
	(33, '8.24.1', 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect1'),
	(34, '8.24.1', 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect2'),
	(35, '8.24.1', 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect1'),
	(36, '8.24.1', 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect2'),
	(39, '8.24.1', 'Ultra (Rapidly Flung) Mark', 'SummonerSnowURFSnowball_Mark'),
	(50, '8.24.1', 'Resuscitate', 'SummonerOdysseyRevive'),
	(51, '8.24.1', 'Ghost', 'SummonerOdysseyGhost'),
	(52, '8.24.1', 'Warp', 'SummonerOdysseyFlash');
/*!40000 ALTER TABLE `spell` ENABLE KEYS */;

-- Dumping structure for table riot.summoner
CREATE TABLE IF NOT EXISTS `summoner` (
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

-- Dumping data for table riot.summoner: ~0 rows (approximately)
/*!40000 ALTER TABLE `summoner` DISABLE KEYS */;
/*!40000 ALTER TABLE `summoner` ENABLE KEYS */;

-- Dumping structure for table riot.team_ban
CREATE TABLE IF NOT EXISTS `team_ban` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `teamId` int(11) NOT NULL,
  `championId` int(11) NOT NULL,
  `pickTurn` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_teamId_pickTurn` (`gameId`,`teamId`,`pickTurn`),
  KEY `FK_team_ban_championId` (`championId`),
  CONSTRAINT `FK_team_ban_championId` FOREIGN KEY (`championId`) REFERENCES `champion` (`championId`),
  CONSTRAINT `FK_team_ban_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Probably don''t need this, but Riot probably thought the same.';

-- Dumping data for table riot.team_ban: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_ban` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_ban` ENABLE KEYS */;

-- Dumping structure for table riot.team_stat
CREATE TABLE IF NOT EXISTS `team_stat` (
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
  CONSTRAINT `FK_team_stats_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.team_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_stat` ENABLE KEYS */;

-- Dumping structure for table riot.xref_champion_tag
CREATE TABLE IF NOT EXISTS `xref_champion_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `championId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_participant_items_participantId` (`participantId`),
  KEY `FK_xref_participant_item_gameId` (`gameId`),
  KEY `FK_xref_participant_item_itemId` (`itemId`),
  CONSTRAINT `FK_xref_participant_item_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_xref_participant_item_itemId` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`),
  CONSTRAINT `FK_xref_participant_item_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Might not be strictly needed, just as with bans, but it breaks from the normalized structure if I leave them part of the participants_stats table.\r\n\r\nThinking about it deeper, it really is a many-many relationship, so deserves its own table.';

-- Dumping data for table riot.xref_participant_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_participant_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_participant_item` ENABLE KEYS */;

-- Dumping structure for table riot.xref_participant_perk
CREATE TABLE IF NOT EXISTS `xref_participant_perk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameId` int(11) unsigned NOT NULL,
  `participantId` int(11) NOT NULL,
  `perkId` varchar(4) NOT NULL,
  `varId` int(11) NOT NULL COMMENT 'Every perk gets 3. Pulling these into their own table allows me to expand the amount of vars instead of adding more columns to the stats table if Riot ever decides to use more.',
  `description` varchar(50) DEFAULT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameId_participantId_perkId_varId` (`gameId`,`participantId`,`perkId`,`varId`),
  KEY `FK_perkId` (`perkId`),
  KEY `FK_participantId` (`participantId`),
  CONSTRAINT `FK_gameId` FOREIGN KEY (`gameId`) REFERENCES `match` (`gameId`),
  CONSTRAINT `FK_participantId` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantId`),
  CONSTRAINT `FK_perkId` FOREIGN KEY (`perkId`) REFERENCES `perk` (`perkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table riot.xref_participant_perk: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_participant_perk` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_participant_perk` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
