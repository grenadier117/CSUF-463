import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CurrentStay } from './pages/guest/currentStay';
import { GuestProfile } from './pages/guest/profile/guestProfile';
import { Layout } from './pages/layout/layout';
import { RoomList } from './pages/rooms/roomList';
import { DailyReport } from './pages/dailyReport/report';
import { SevenDayOutlook } from './pages/rooms/sevenDayOutlook';
import { PageNotFound } from './pages/pageNotFound';
import { Customer } from './pages/guest/search';

export const Routes: React.FC = () => (
  <div>
    <Router>
      <Switch>
        <Layout exact path="/" Component={SevenDayOutlook} />
        <Layout exact path="/roomList" Component={RoomList} />
        <Layout exact path="/search" Component={Customer} />
        <Layout exact path="/dailyReport" Component={DailyReport} />
        <Layout exact path="/guest/:guestId/profile" Component={GuestProfile} />
        <Layout exact path="/guest/:guestId/currentstay" Component={CurrentStay} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </div>
);
