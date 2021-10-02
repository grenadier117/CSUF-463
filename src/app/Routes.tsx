import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Layout } from './Pages/Layout/layout';

export const Routes: React.FC = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" Component={Home} />
      </Switch>
    </BrowserRouter>
  </div>
);
