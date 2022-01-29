import React, { useEffect, useState } from 'react';
import { IChampionMastery } from '../../../models/IChampionMastery';

interface ChampionMasteryShowcaseProps {
  championName?: string;
  summonerName: string;
}

const ChampionMasteryShowcase: React.FC<ChampionMasteryShowcaseProps> = (
  { championName, summonerName }: ChampionMasteryShowcaseProps,
) => {
  const [masteryData, setMasteryData] = useState<IChampionMastery>();
  const [champion, setChampion] = useState<string>();

  useEffect(() => {
    if (championName) {
      fetch(`/api/summoner/NA1/${summonerName}/champion-mastery/${championName}`)
        .then(res => res.json())
        .then(setMasteryData);
    } else {
      fetch(`/api/summoner/NA1/${summonerName}/champion-mastery/highest`)
        .then(res => res.json())
        .then(setMasteryData);
    }
  }, [championName, summonerName]);

  useEffect(() => {
    if (masteryData) {
      fetch(`/api/champion/${masteryData.championId}`)
        .then(res => res.json())
        .then(res => setChampion(res.id));
    } else {
      setChampion(championName);
    }
  }, [championName, masteryData, summonerName]);

  if (masteryData && champion) {
    return (
      <div className="relative">
        <img className="w-[200px] h-[200px]" alt={champion} src={`http://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/champion/${champion}.png`} />
        <img className="absolute w-16 top-0 left-0" alt="Mastery Badge" src={`/champion-mastery/${masteryData.championLevel}.png`} />
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-alabaster text-5xl font-medium text-outline-white">{masteryData.championPoints.toLocaleString()}</span>
      </div>
    );
  }

  return <div className="w-[200px] h-[200px]" />;
};

ChampionMasteryShowcase.defaultProps = {
  championName: undefined,
};

export default ChampionMasteryShowcase;
