import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Champion from './champion';
import Home from './Home/Home';
import SummonerProfile from './summonerProfile/summonerProfile';

const App: React.FC = () => (
  <Routes>
    <Route path="*" element={<Home />} />
    <Route path="/champion/:id" element={<Champion />} />
    <Route path="/summoner/:name" element={<SummonerProfile />} />
  </Routes>
);

export default App;
