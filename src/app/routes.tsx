import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CurrentStay } from './pages/guest/currentStay';
import { GuestProfile } from './pages/guest/profile/guestProfile';
import { Layout } from './pages/layout/layout';
import { RoomList } from './pages/rooms/roomList';
import { VisualRooms } from './pages/rooms/visualRooms';

export const Routes: React.FC = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" Component={VisualRooms} />
        <Layout exact path="/roomList" Component={RoomList} />
        <Layout exact path="/guest/:guestId/profile" Component={GuestProfile} />
        <Layout exact path="/guest/:guestId/currentstay" Component={CurrentStay} />
      </Switch>
    </BrowserRouter>
  </div>
);
