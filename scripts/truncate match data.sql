TRUNCATE TABLE team_stat;
ALTER TABLE team_stat AUTO_INCREMENT=1;

TRUNCATE TABLE team_ban;
ALTER TABLE team_ban AUTO_INCREMENT=1;

TRUNCATE TABLE xref_participant_item;
ALTER TABLE xref_participant_item AUTO_INCREMENT=1;

TRUNCATE TABLE xref_participant_perk;
ALTER TABLE xref_participant_perk AUTO_INCREMENT=1;

TRUNCATE TABLE participant_timeline_delta;
ALTER TABLE participant_timeline_delta AUTO_INCREMENT=1;

TRUNCATE TABLE participant_stat;
ALTER TABLE participant_stat AUTO_INCREMENT=1;

DELETE FROM participant;
ALTER TABLE participant AUTO_INCREMENT=1;

TRUNCATE TABLE match_list;
ALTER TABLE match_list AUTO_INCREMENT=1;

DELETE FROM `match`;

