import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Layout } from './pages/layout/layout';
import { RoomList } from './pages/rooms/roomList';
import { VisualRooms } from './pages/rooms/visualRooms';

export const Routes: React.FC = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" Component={VisualRooms} />
        <Layout exact path="/roomList" Component={RoomList} />
      </Switch>
    </BrowserRouter>
  </div>
);
