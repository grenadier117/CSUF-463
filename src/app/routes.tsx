import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './pages/home/home';
import { Customer } from './pages/duc/customer';
import { Layout } from './pages/layout/layout';

export const Routes: React.FC = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" Component={Customer} />
      </Switch>
    </BrowserRouter>
  </div>
);
