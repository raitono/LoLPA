import React, { useEffect, useState } from 'react';

interface MasteryPointShowcaseProps {
  summonerName: string;
}

const MasteryPointShowcase: React.FC<MasteryPointShowcaseProps> = (
  { summonerName }: MasteryPointShowcaseProps,
) => {
  const [masteryPoints, setMasteryPoints] = useState<number>();

  useEffect(() => {
    if (summonerName) {
      fetch(`/api/summoner/NA1/${summonerName}/champion-mastery/points`)
        .then(res => res.json())
        .then(setMasteryPoints);
    }
  }, [summonerName]);

  if (masteryPoints) {
    return (
      <div className="w-[200px] h-[200px] flex flex-col items-center bg-foreground-default text-on-foreground-default">
        <img className="w-28" alt="Mastery Badge" src="/champion-mastery/7.png" />
        <div className="text-3xl">Mastery Points</div>
        <span className="bottom-1 text-black text-outline-white text-5xl font-medium">{masteryPoints}</span>
      </div>
    );
  }

  return <div className="w-[200px] h-[200px] flex flex-col items-center bg-foreground-default text-on-foreground-default" />;
};

export default MasteryPointShowcase;
