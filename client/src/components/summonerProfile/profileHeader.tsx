import React from 'react';
import { ISummoner } from '../../models/ISummoner';

interface ProfileHeaderProps {
  summoner: ISummoner;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (
  { summoner }: ProfileHeaderProps,
) => {
  const handleReload = () => window.location.reload();
  return (
    <div className="flex flex-col relative p-2 pt-4 bg-background-default">
      <div className="relative m-auto">
        <img
          className="rounded-full border-4 border-on-background-muted w-[300px]"
          alt="Profile Icon"
          src={`http://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/profileicon/${summoner.profileIconId}.png`}
        />
        <div className="absolute bottom-0 right-0">
          <div className="flex            text-3xl    text-on-background-default  border-on-foreground-default  w-24
                          items-center    font-medium bg-foreground-default       border-4 rounded-full         h-24
                          justify-center  font-sans"
          >
            {summoner.summonerLevel}
          </div>
        </div>
      </div>
      <div className="text-7xl text-center text-on-background-default pb-2">{summoner.name}</div>
      <button
        className="flex            absolute  text-7xl                    w-min
                  items-center    top-4     text-on-background-default  rounded-full
                  justify-center  right-4   bg-foreground-default"
        onClick={handleReload}
        onKeyDown={handleReload}
        type="button"
      >
        {/* <RefreshIcon fontSize="inherit" color="inherit" /> */}
      </button>
    </div>
  );
};

export default ProfileHeader;
