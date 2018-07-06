-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.20-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5280
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for riot
CREATE DATABASE IF NOT EXISTS `riot` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `riot`;

-- Dumping data for table riot.champion: ~139 rows (approximately)
/*!40000 ALTER TABLE `champion` DISABLE KEYS */;
INSERT INTO `champion` (`id`, `name`, `title`) VALUES
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
	(20, 'Nunu', 'the Yeti Rider'),
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
	(39, 'Irelia', 'the Will of the Blades'),
	(40, 'Janna', 'the Storm\'s Fury'),
	(41, 'Gangplank', 'the Saltwater Scourge'),
	(42, 'Corki', 'the Daring Bombardier'),
	(43, 'Karma', 'the Enlightened One'),
	(44, 'Taric', 'the Shield of Valoran'),
	(45, 'Veigar', 'the Tiny Master of Evil'),
	(48, 'Trundle', 'the Troll King'),
	(50, 'Swain', 'the Master Tactician'),
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
	(84, 'Akali', 'the Fist of Shadow'),
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
	(516, 'Ornn', 'The Fire below the Mountain');
/*!40000 ALTER TABLE `champion` ENABLE KEYS */;

-- Dumping data for table riot.champion_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `champion_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `champion_tag` ENABLE KEYS */;

-- Dumping data for table riot.item: ~284 rows (approximately)
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`id`, `name`, `goldSellsFor`, `goldTotal`, `goldBase`, `purchasable`) VALUES
	(1001, 'Boots of Speed', 210, 300, 300, b'1'),
	(1004, 'Faerie Charm', 88, 125, 125, b'1'),
	(1006, 'Rejuvenation Bead', 105, 150, 150, b'1'),
	(1011, 'Giant\'s Belt', 700, 1000, 600, b'1'),
	(1018, 'Cloak of Agility', 560, 800, 800, b'1'),
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
	(1082, 'The Dark Seal', 245, 350, 350, b'1'),
	(1083, 'Cull', 180, 450, 450, b'1'),
	(1400, 'Enchantment: Warrior', 1838, 2625, 525, b'1'),
	(1401, 'Enchantment: Cinderhulk', 1750, 2500, 600, b'1'),
	(1402, 'Enchantment: Runic Echoes', 1838, 2625, 340, b'1'),
	(1408, 'Enchantment: Warrior', 1838, 2625, 525, b'1'),
	(1409, 'Enchantment: Cinderhulk', 1750, 2500, 600, b'1'),
	(1410, 'Enchantment: Runic Echoes', 1838, 2625, 340, b'1'),
	(1412, 'Enchantment: Warrior', 1838, 2625, 525, b'1'),
	(1413, 'Enchantment: Cinderhulk', 1750, 2500, 600, b'1'),
	(1414, 'Enchantment: Runic Echoes', 1838, 2625, 340, b'1'),
	(1416, 'Enchantment: Bloodrazor', 1838, 2625, 625, b'1'),
	(1418, 'Enchantment: Bloodrazor', 1838, 2625, 625, b'1'),
	(1419, 'Enchantment: Bloodrazor', 1838, 2625, 625, b'1'),
	(2003, 'Health Potion', 20, 50, 50, b'1'),
	(2004, 'Mana Potion', 12, 30, 30, b'0'),
	(2009, 'Total Biscuit of Rejuvenation', 0, 0, 0, b'0'),
	(2010, 'Total Biscuit of Everlasting Will', 30, 75, 75, b'0'),
	(2011, 'Elixir Of Skill', 48, 120, 120, b'0'),
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
	(3001, 'Abyssal Mask', 2030, 2900, 1080, b'1'),
	(3003, 'Archangel\'s Staff', 2170, 3100, 1100, b'1'),
	(3004, 'Manamune', 1680, 2400, 775, b'1'),
	(3006, 'Berserker\'s Greaves', 770, 1100, 500, b'1'),
	(3007, 'Archangel\'s Staff (Quick Charge)', 2163, 3090, 1090, b'1'),
	(3008, 'Manamune (Quick Charge)', 1680, 2400, 775, b'1'),
	(3009, 'Boots of Swiftness', 630, 900, 600, b'1'),
	(3010, 'Catalyst of Aeons', 770, 1100, 350, b'1'),
	(3020, 'Sorcerer\'s Shoes', 770, 1100, 800, b'1'),
	(3022, 'Frozen Mallet', 2170, 3100, 900, b'1'),
	(3024, 'Glacial Shroud', 630, 900, 250, b'1'),
	(3025, 'Iceborn Gauntlet', 1890, 2700, 750, b'1'),
	(3026, 'Guardian Angel', 960, 2400, 200, b'1'),
	(3027, 'Rod of Ages', 1890, 2700, 750, b'1'),
	(3028, 'Chalice of Harmony', 560, 800, 100, b'1'),
	(3029, 'Rod of Ages (Quick Charge)', 1890, 2700, 750, b'1'),
	(3030, 'Hextech GLP-800', 2100, 3000, 850, b'1'),
	(3031, 'Infinity Edge', 2380, 3400, 425, b'1'),
	(3033, 'Mortal Reminder', 1820, 2600, 500, b'1'),
	(3034, 'Giant Slayer', 700, 1000, 650, b'1'),
	(3035, 'Last Whisper', 910, 1300, 950, b'1'),
	(3036, 'Lord Dominik\'s Regards', 1820, 2600, 300, b'1'),
	(3040, 'Seraph\'s Embrace', 0, 0, 0, b'0'),
	(3041, 'Mejai\'s Soulstealer', 980, 1400, 1050, b'1'),
	(3042, 'Muramana', 0, 0, 0, b'0'),
	(3043, 'Muramana', 0, 0, 0, b'0'),
	(3044, 'Phage', 875, 1250, 500, b'1'),
	(3046, 'Phantom Dancer', 1820, 2600, 800, b'1'),
	(3047, 'Ninja Tabi', 770, 1100, 500, b'1'),
	(3048, 'Seraph\'s Embrace', 0, 0, 0, b'0'),
	(3050, 'Zeke\'s Convergence', 1575, 2250, 250, b'1'),
	(3052, 'Jaurim\'s Fist', 840, 1200, 450, b'1'),
	(3053, 'Sterak\'s Gage', 2240, 3200, 725, b'1'),
	(3056, 'Ohmwrecker', 1855, 2650, 950, b'1'),
	(3057, 'Sheen', 735, 1050, 700, b'1'),
	(3060, 'Banner of Command', 1540, 2200, 200, b'1'),
	(3065, 'Spirit Visage', 1960, 2800, 800, b'1'),
	(3067, 'Kindlegem', 560, 800, 400, b'1'),
	(3068, 'Sunfire Cape', 2030, 2900, 800, b'1'),
	(3069, 'Remnant of the Ascended', 600, 1500, 250, b'1'),
	(3070, 'Tear of the Goddess', 525, 750, 275, b'1'),
	(3071, 'The Black Cleaver', 2100, 3000, 950, b'1'),
	(3072, 'The Bloodthirster', 2590, 3700, 1150, b'1'),
	(3073, 'Tear of the Goddess (Quick Charge)', 525, 750, 275, b'1'),
	(3074, 'Ravenous Hydra', 2450, 3500, 525, b'1'),
	(3075, 'Thornmail', 2030, 2900, 500, b'1'),
	(3076, 'Bramble Vest', 700, 1000, 400, b'1'),
	(3077, 'Tiamat', 840, 1200, 350, b'1'),
	(3078, 'Trinity Force', 2613, 3733, 333, b'1'),
	(3082, 'Warden\'s Mail', 700, 1000, 400, b'1'),
	(3083, 'Warmog\'s Armor', 1995, 2850, 400, b'1'),
	(3084, 'Overlord\'s Bloodmail', 1785, 2550, 900, b'1'),
	(3085, 'Runaan\'s Hurricane', 1820, 2600, 800, b'1'),
	(3086, 'Zeal', 840, 1200, 500, b'1'),
	(3087, 'Statikk Shiv', 1820, 2600, 600, b'1'),
	(3089, 'Rabadon\'s Deathcap', 2660, 3800, 1265, b'1'),
	(3090, 'Wooglet\'s Witchcap', 2450, 3500, 450, b'1'),
	(3091, 'Wit\'s End', 1750, 2500, 480, b'1'),
	(3092, 'Remnant of the Watchers', 720, 1800, 550, b'1'),
	(3094, 'Rapid Firecannon', 1820, 2600, 600, b'1'),
	(3096, 'Nomad\'s Medallion', 340, 850, 350, b'1'),
	(3097, 'Targon\'s Brace', 340, 850, 350, b'1'),
	(3098, 'Frostfang', 340, 850, 375, b'1'),
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
	(3122, 'Wicked Hatchet', 840, 1200, 450, b'1'),
	(3123, 'Executioner\'s Calling', 560, 800, 450, b'1'),
	(3124, 'Guinsoo\'s Rageblade', 2520, 3600, 875, b'1'),
	(3133, 'Caulfield\'s Warhammer', 770, 1100, 400, b'1'),
	(3134, 'Serrated Dirk', 770, 1100, 400, b'1'),
	(3135, 'Void Staff', 1855, 2650, 1365, b'1'),
	(3136, 'Haunting Guise', 1050, 1500, 665, b'1'),
	(3137, 'Dervish Blade', 1890, 2700, 300, b'1'),
	(3139, 'Mercurial Scimitar', 2520, 3600, 525, b'1'),
	(3140, 'Quicksilver Sash', 910, 1300, 850, b'1'),
	(3142, 'Youmuu\'s Ghostblade', 2030, 2900, 700, b'1'),
	(3143, 'Randuin\'s Omen', 2030, 2900, 900, b'1'),
	(3144, 'Bilgewater Cutlass', 1050, 1500, 250, b'1'),
	(3145, 'Hextech Revolver', 735, 1050, 180, b'1'),
	(3146, 'Hextech Gunblade', 2380, 3400, 850, b'1'),
	(3147, 'Duskblade of Draktharr', 2030, 2900, 700, b'1'),
	(3151, 'Liandry\'s Torment', 2170, 3100, 750, b'1'),
	(3152, 'Hextech Protobelt-01', 1750, 2500, 650, b'1'),
	(3153, 'Blade of the Ruined King', 2380, 3400, 900, b'1'),
	(3155, 'Hexdrinker', 910, 1300, 500, b'1'),
	(3156, 'Maw of Malmortius', 2275, 3250, 850, b'1'),
	(3157, 'Zhonya\'s Hourglass', 2030, 2900, 200, b'1'),
	(3158, 'Ionian Boots of Lucidity', 630, 900, 600, b'1'),
	(3165, 'Morellonomicon', 2030, 2900, 665, b'1'),
	(3170, 'Moonflair Spellblade', 1750, 2500, 580, b'1'),
	(3174, 'Athene\'s Unholy Grail', 1470, 2100, 400, b'1'),
	(3175, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3181, 'Sanguine Blade', 1680, 2400, 625, b'1'),
	(3184, 'Guardian\'s Hammer', 380, 950, 950, b'1'),
	(3185, 'The Lightbringer', 1645, 2350, 350, b'1'),
	(3187, 'Arcane Sweeper', 1435, 2050, 350, b'1'),
	(3190, 'Locket of the Iron Solari', 1540, 2200, 650, b'1'),
	(3191, 'Seeker\'s Armguard', 840, 1200, 165, b'1'),
	(3193, 'Gargoyle Stoneplate', 1750, 2500, 380, b'1'),
	(3194, 'Adaptive Helm', 1960, 2800, 1000, b'1'),
	(3196, 'The Hex Core mk-1', 875, 1250, 1250, b'1'),
	(3197, 'The Hex Core mk-2', 1575, 2250, 1000, b'1'),
	(3198, 'Perfect Hex Core', 2100, 3000, 750, b'1'),
	(3200, 'Prototype Hex Core', 0, 0, 0, b'0'),
	(3211, 'Spectre\'s Cowl', 840, 1200, 350, b'1'),
	(3222, 'Mikael\'s Crucible', 1470, 2100, 500, b'1'),
	(3252, 'Poacher\'s Dirk', 350, 500, 150, b'1'),
	(3285, 'Luden\'s Echo', 2240, 3200, 1100, b'1'),
	(3301, 'Ancient Coin', 140, 350, 350, b'1'),
	(3302, 'Relic Shield', 140, 350, 350, b'1'),
	(3303, 'Spellthief\'s Edge', 140, 350, 350, b'1'),
	(3304, 'Timeworn Ancient Coin', 140, 350, 350, b'1'),
	(3305, 'Timeworn Nomad\'s Medallion', 340, 850, 350, b'1'),
	(3306, 'Timeworn Talisman of Ascension', 880, 2200, 450, b'1'),
	(3307, 'Timeworn Relic Shield', 140, 350, 350, b'1'),
	(3308, 'Timeworn Targon\'s Brace', 340, 850, 350, b'1'),
	(3309, 'Timeworn Face of the Mountain', 880, 2200, 550, b'1'),
	(3310, 'Timeworn Spellthief\'s Edge', 140, 350, 350, b'1'),
	(3311, 'Timeworn Frostfang', 340, 850, 375, b'1'),
	(3312, 'Timeworn Frost Queen\'s Claim', 880, 2200, 500, b'1'),
	(3340, 'Warding Totem (Trinket)', 0, 0, 0, b'1'),
	(3341, 'Sweeping Lens (Trinket)', 0, 0, 0, b'1'),
	(3345, 'Soul Anchor (Trinket)', 0, 0, 0, b'0'),
	(3348, 'Arcane Sweeper', 0, 0, 0, b'0'),
	(3361, 'Greater Stealth Totem (Trinket)', 175, 250, 250, b'0'),
	(3362, 'Greater Vision Totem (Trinket)', 175, 250, 250, b'0'),
	(3363, 'Farsight Alteration', 0, 0, 0, b'1'),
	(3364, 'Oracle Alteration', 0, 0, 0, b'1'),
	(3371, 'Molten Edge', 3080, 4400, 1000, b'1'),
	(3373, 'Forgefire Cape', 2730, 3900, 1000, b'1'),
	(3374, 'Rabadon\'s Deathcrown', 3360, 4800, 1000, b'1'),
	(3379, 'Infernal Mask', 2730, 3900, 1000, b'1'),
	(3380, 'The Obsidian Cleaver', 2800, 4000, 1000, b'1'),
	(3382, 'Salvation', 1820, 2600, 500, b'1'),
	(3383, 'Circlet of the Iron Solari', 1890, 2700, 500, b'1'),
	(3384, 'Trinity Fusion', 3313, 4733, 1000, b'1'),
	(3385, 'Wooglet\'s Witchcrown', 3185, 4550, 1050, b'1'),
	(3386, 'Zhonya\'s Paradox', 2730, 3900, 1000, b'1'),
	(3401, 'Remnant of the Aspect', 760, 1900, 650, b'1'),
	(3410, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3416, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3422, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3455, 'Head of Kha\'Zix', 0, 0, 0, b'0'),
	(3460, 'Golden Transcendence', 0, 0, 0, b'0'),
	(3461, 'Golden Transcendence (Disabled)', 0, 0, 0, b'0'),
	(3462, 'Seer Stone (Trinket)', 0, 0, 0, b'0'),
	(3504, 'Ardent Censer', 1610, 2300, 650, b'1'),
	(3508, 'Essence Reaver', 2380, 3400, 200, b'1'),
	(3512, 'Zz\'Rot Portal', 1890, 2700, 1080, b'1'),
	(3513, 'Eye of the Herald', 0, 0, 0, b'0'),
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
	(3711, 'Tracker\'s Knife', 700, 1000, 300, b'1'),
	(3715, 'Skirmisher\'s Sabre', 700, 1000, 300, b'1'),
	(3742, 'Dead Man\'s Plate', 2030, 2900, 1100, b'1'),
	(3748, 'Titanic Hydra', 2450, 3500, 700, b'1'),
	(3751, 'Bami\'s Cinder', 630, 900, 500, b'1'),
	(3800, 'Righteous Glory', 1855, 2650, 1100, b'1'),
	(3801, 'Crystalline Bracer', 455, 650, 100, b'1'),
	(3802, 'Lost Chapter', 630, 900, 115, b'1'),
	(3812, 'Death\'s Dance', 2450, 3500, 625, b'1'),
	(3814, 'Edge of Night', 2170, 3100, 725, b'1'),
	(3901, 'Fire at Will', 0, 0, 0, b'1'),
	(3902, 'Death\'s Daughter', 0, 0, 0, b'1'),
	(3903, 'Raise Morale', 0, 0, 0, b'1');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping data for table riot.match: ~0 rows (approximately)
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
/*!40000 ALTER TABLE `match` ENABLE KEYS */;

-- Dumping data for table riot.match_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `match_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_list` ENABLE KEYS */;

-- Dumping data for table riot.participant: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;

-- Dumping data for table riot.participant_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_stat` ENABLE KEYS */;

-- Dumping data for table riot.participant_timeline: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_timeline` ENABLE KEYS */;

-- Dumping data for table riot.participant_timeline_delta: ~0 rows (approximately)
/*!40000 ALTER TABLE `participant_timeline_delta` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant_timeline_delta` ENABLE KEYS */;

-- Dumping data for table riot.perk: ~0 rows (approximately)
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk` ENABLE KEYS */;

-- Dumping data for table riot.perk_style: ~0 rows (approximately)
/*!40000 ALTER TABLE `perk_style` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk_style` ENABLE KEYS */;

-- Dumping data for table riot.perk_var: ~0 rows (approximately)
/*!40000 ALTER TABLE `perk_var` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk_var` ENABLE KEYS */;

-- Dumping data for table riot.season: ~0 rows (approximately)
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` (`seasonId`, `number`, `startDate`, `endDate`) VALUES
	(11, 8, '2018-01-16 00:00:00', NULL);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;

-- Dumping data for table riot.spell: ~19 rows (approximately)
/*!40000 ALTER TABLE `spell` DISABLE KEYS */;
INSERT INTO `spell` (`id`, `version`, `name`, `key`) VALUES
	(-1, '8.2.1', 'Ultra (Really Fast) Dash', 'SummonerSnowURFSnowball_Mark_FollowupCast'),
	(1, '8.2.1', 'Cleanse', 'SummonerBoost'),
	(3, '8.2.1', 'Exhaust', 'SummonerExhaust'),
	(4, '8.2.1', 'Flash', 'SummonerFlash'),
	(6, '8.2.1', 'Ghost', 'SummonerHaste'),
	(7, '8.2.1', 'Heal', 'SummonerHeal'),
	(11, '8.2.1', 'Smite', 'SummonerSmite'),
	(12, '8.2.1', 'Teleport', 'SummonerTeleport'),
	(13, '8.2.1', 'Clarity', 'SummonerMana'),
	(14, '8.2.1', 'Ignite', 'SummonerDot'),
	(21, '8.2.1', 'Barrier', 'SummonerBarrier'),
	(30, '8.2.1', 'To the King!', 'SummonerPoroRecall'),
	(31, '8.2.1', 'Poro Toss', 'SummonerPoroThrow'),
	(32, '8.2.1', 'Mark', 'SummonerSnowball'),
	(33, '8.2.1', 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect1'),
	(34, '8.2.1', 'Nexus Siege: Siege Weapon Slot', 'SummonerSiegeChampSelect2'),
	(35, '8.2.1', 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect1'),
	(36, '8.2.1', 'Disabled Summoner Spells', 'SummonerDarkStarChampSelect2'),
	(39, '8.2.1', 'Ultra (Rapidly Flung) Mark', 'SummonerSnowURFSnowball_Mark');
/*!40000 ALTER TABLE `spell` ENABLE KEYS */;

-- Dumping data for table riot.summoner: ~3 rows (approximately)
/*!40000 ALTER TABLE `summoner` DISABLE KEYS */;
INSERT INTO `summoner` (`id`, `accountId`, `profileIconId`, `summonerLevel`, `name`, `revisionDate`, `lastUpdated`) VALUES
	(26056841, 40769781, 3379, 77, 'SushiDojo', '2018-07-04 04:41:24', NULL),
	(68431663, 229105505, 3379, 40, 'CaptainPuddin', '2018-07-04 04:41:24', NULL),
	(71591841, 230885086, 3379, 94, 'Raitono', '2018-07-04 04:41:24', NULL);
/*!40000 ALTER TABLE `summoner` ENABLE KEYS */;

-- Dumping data for table riot.team_ban: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_ban` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_ban` ENABLE KEYS */;

-- Dumping data for table riot.team_stat: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_stat` ENABLE KEYS */;

-- Dumping data for table riot.xref_champion_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_champion_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_champion_tag` ENABLE KEYS */;

-- Dumping data for table riot.xref_participant_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_participant_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_participant_item` ENABLE KEYS */;

-- Dumping data for table riot.xref_profile_game: ~0 rows (approximately)
/*!40000 ALTER TABLE `xref_profile_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `xref_profile_game` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
