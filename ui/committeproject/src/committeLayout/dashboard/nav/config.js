// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboardCommitte/Home',
    icon: icon('home'),
  },
  // {
  //   title: 'Create Games',
  //   path: '/dashboardCommitte/Games',
  //   icon: icon('groups'),
  // },
  // {
  //   title: 'Create Event',
  //   path: '/dashboardCommitte/Event',
  //   icon: icon('event'),
  // },
  {
    title: 'ListGames',
    path: '/dashboardCommitte/ListGames',
    icon: icon('meeting'),
  },
  {
    title: 'Manage Committee',
    path: '/dashboardCommitte/CommitteeRole',
    icon: icon('point_table'),
  },
];

export default navConfig;
