import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './Adminlayouts/dashboard';
import DashboardLayoutCommitte from './committeLayout/dashboard';
import DashboardLayoutInno from './InnovatureLayout/dashboard';


import SimpleLayout from './Adminlayouts/simple';

import Committee from './Admin/Committee';
//Components Pages <App />
import DashboardAppPage from './Admin/DashboardAppPage';

import Employee from './Admin/Employee';
import AddMember from './Admin/Groups/AddMember';
import GroupMember from './Admin/Groups/GroupMember';
import Groups from './Admin/Groups/Groups';
import Login from './components/Login';
import Meetings from './Admin/Meetings';
import Page404 from './Admin/Page404';
import UserPage from './Admin/UserPage';

import EventsMain from './Admin/AllEvents/EventsMain';
import GroupsPoints from './Admin/AllEvents/GroupsPoints';

import BlogPage from './Innovature/BlogPage';
import UserPageInno from './Innovature/UserPage';
import DashboardAppInno from './Innovature/DashboardAppPage';
import PointTableCurrent from './Innovature/PointTableCurrent';


// import GamesCreate from './components/Games/Games';

import EventHistory from './Admin/AllEvents/EventHistory';
import Event from './committe/Event/Event';
import Games from './committe/Games';
import ListGames from './committe/ListGames';
import CommitteeRole from './committe/CommitteeRole';
import HomeCommitte from './committe/Home/DashboardAppPage';




// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'Groups', element: <Groups /> },
        { path: 'Committee', element: <Committee /> },
        { path: 'meet', element: <Meetings /> },
        { path: 'groupMember', element: <GroupMember /> },
        { path: 'addMember', element: <AddMember /> },
        { path: 'employees', element: <Employee /> },

        { path: 'events', element: <EventsMain /> },
        { path: 'groupsPoints', element: <GroupsPoints /> },
        { path: 'eventHistory', element: <EventHistory /> }
      ],
    },
    {
      path: '/dashboardInno',
      element: <DashboardLayoutInno />,
      children: [
        { element: <Navigate to="/dashboardInno/app" />, index: true },

        { path: 'gamePoint', element: <UserPageInno /> },
        { path: 'Events', element: <BlogPage /> },
        { path: 'eventPoints', element: <PointTableCurrent /> },
        { path: 'homeInno', element: <DashboardAppInno /> },
      ],
    },
    {
      // path: '/dashboardCommitte',
      // element: <DashboardLayoutCommitte />,
      // children: [
      //   { element: <Navigate to="/dashboardCommitte/app" />, index: true },
      //   { path: 'Event', element: <Event /> },
      //   // { path: 'GamesCreate', element: <GamesCreate /> },
      //   { path: 'Committe', element: <CommitteManage /> },

        path: '/dashboardCommitte',
        element: <DashboardLayoutCommitte />,
        children: [
          { element: <Navigate to="/dashboardCommitte/app" />, index: true },
          { path: 'app', element: <DashboardAppPage/> },
          {path:'Event', element : <Event/>},
          {path:'Games', element : <Games/>},
          {path:'ListGames', element: <ListGames />},
          {path:'CommitteeRole', element : <CommitteeRole/>},
          {path:'Home', element : <HomeCommitte/>},




      ],
    },
    { path: '/', element: <Login />, index: true },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
