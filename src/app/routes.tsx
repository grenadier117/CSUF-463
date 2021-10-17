import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { CurrentStay } from './pages/guest/currentStay';
import { GuestProfile } from './pages/guest/profile/guestProfile';
import { Layout } from './pages/layout/layout';
import { RoomList } from './pages/rooms/roomList';
import history from 'history';
import { SevenDayOutlook } from './pages/rooms/sevenDayOutlook';

export const Routes: React.FC = () => (
  <div>
    <Router>
      <Switch>
        <Layout exact path="/" Component={SevenDayOutlook} />
        <Layout exact path="/roomList" Component={RoomList} />
        <Layout exact path="/guest/:guestId/profile" Component={GuestProfile} />
        <Layout exact path="/guest/:guestId/currentstay" Component={CurrentStay} />
      </Switch>
    </Router>
  </div>
);
