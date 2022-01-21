import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Switch, Route, NavLink, useLocation } from "react-router-dom";
import './App.css';

import Cards from './pages/Cards'
import CardsPost from './pages/Cards/post'

function App() {
  const location = useLocation();
  return (
    <div>
      <main>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/post" component={CardsPost} />
            <Route path="/" component={Cards} />
          </Switch>
        </AnimatePresence>
      </main>
    </div>
  );
} 

export default App;
