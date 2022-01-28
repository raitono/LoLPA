import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISummoner } from '../../models/ISummoner';
import SearchHeader from '../searchHeader';
import ProfileHeader from './profileHeader';
import ProfileShowcase from './profileShowcase';
import MatchList from './tabs/matchList';

const SummonerProfile: React.FC = () => {
  const { name } = useParams();

  const [summoner, setSummoner] = useState<ISummoner>();
  useEffect(() => {
    if (name) {
      fetch(`/api/summoner/NA1/${name}`)
        .then(res => (res.ok ? res.json() : undefined))
        .then(setSummoner);
    }
  }, [name]);

  if (name && summoner) {
    return (
      <div className="bg-background-default h-full">
        <SearchHeader />
        <div className="container">
          <ProfileHeader summoner={summoner} />
          <ProfileShowcase summonerName={summoner.name} />
          <MatchList summonerName={summoner.name} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-default h-screen">
      <SearchHeader />
      <div className="container text-on-background-default text-center">
        Summoner not found
      </div>
    </div>
  );
};

export default SummonerProfile;
