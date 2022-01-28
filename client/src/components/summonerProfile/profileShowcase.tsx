import React from 'react';
import { RiotQueueType } from '../../models/Riot';
import ChampionMasteryShowcase from './showcase/championMasteryShowcase';
import MasteryPointShowcase from './showcase/masteryPointsShowcase';
import RankedShowcase from './showcase/rankedShowcase';

interface ProfileShowcaseProps {
  summonerName: string;
}

const ProfileShowcase: React.FC<ProfileShowcaseProps> = (
  { summonerName }: ProfileShowcaseProps,
) => (
  <div className="flex justify-between mt-2">
    <ChampionMasteryShowcase summonerName={summonerName} championName="Jhin" />
    <MasteryPointShowcase summonerName={summonerName} />
    <RankedShowcase summonerName={summonerName} queueType={RiotQueueType.RANKED_SOLO} />
  </div>
);

export default ProfileShowcase;
