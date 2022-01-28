import React, { useEffect, useState } from 'react';
import { RiotLeagueEntryDTO, RiotQueueType } from '../../../models/Riot';

interface RankedShowcaseProps {
  summonerName: string;
  queueType: RiotQueueType;
}

const RankedShowcase: React.FC<RankedShowcaseProps> = (
  { summonerName, queueType }: RankedShowcaseProps,
) => {
  const [leagueEntries, setLeagueEntries] = useState<RiotLeagueEntryDTO[]>();
  let rank: string = 'Unranked';

  useEffect(() => {
    if (summonerName) {
      fetch(`/api/summoner/NA1/${summonerName}/rank`)
        .then(res => res.json())
        .then(setLeagueEntries);
    }
  }, [summonerName]);

  if (leagueEntries) {
    rank = leagueEntries.filter(e => e.queueType === queueType).shift()?.tier || 'Unranked';
  }

  return <img className="w-[200px] h-[200px] bg-foreground-default" alt="ranked emblam" src={`/ranked-emblems/${rank}.png`} />;
};

export default RankedShowcase;
