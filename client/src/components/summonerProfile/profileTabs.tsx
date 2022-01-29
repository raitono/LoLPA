import React, { useState } from 'react';
import MatchList from './tabs/matchList';

interface ProfileTabsProps {
  summonerName: string;
}

interface ProfileTabContents {
  // eslint-disable-next-line no-undef
  [index: string]: JSX.Element
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ summonerName }: ProfileTabsProps) => {
  const [selectedTab, setSelectedTab] = useState('lp');

  const tabs: ProfileTabContents = {
    lp: <div>LP Graph</div>,
    matches: <MatchList summonerName={summonerName} />,
    // 'tab3': <div>Tab 3</div>
  };

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tab: HTMLButtonElement = e.target as HTMLButtonElement;
    const activeTab: HTMLButtonElement | null = document.querySelector('.tab.active');
    if (activeTab) {
      activeTab.classList.remove('active', 'border-uncommon');
      activeTab.classList.add('border-background');
    }

    tab.classList.remove('border-background');
    tab.classList.add('active', 'border-uncommon');

    setSelectedTab(tab.id);
  };

  return (
    <>
      <div className="p-3 text-3xl">
        <ul className="list-reset flex justify-center">
          <li className="mr-1">
            <button id="lp" onClick={handleTabClick} className="tab inline-block py-1 m-1 px-2 font-semibold text-background-default bg-attention-primary rounded-md border-4 border-uncommon active" type="button">LP Graphs</button>
          </li>
          <li className="mr-1">
            <button id="matches" onClick={handleTabClick} className="tab inline-block py-1 m-1 px-2 font-semibold text-background-default bg-attention-primary rounded-md border-4 border-background-default" type="button">Matches</button>
          </li>
          {/* <li className="mr-1">
            <button id="tab3" onClick={handleTabClick} className="tab inline-block py-1 m-1 px-2 font-semibold bg-on-background-muted rounded-md">Tab 3</button>
          </li> */}
        </ul>
      </div>
      <div className="container px-3">
        {tabs[selectedTab]}
      </div>
    </>
  );
};

export default ProfileTabs;
