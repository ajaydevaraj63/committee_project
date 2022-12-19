// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: icon('home'),
  },
  {
    title: 'Employees',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'Groups',
    path: '/dashboard/Groups',
    icon: icon('committee'),
  },
  {
    title: 'Committee',
    path: '/dashboard/Committee',
    icon: icon('groups'),
  },
  {
    title: 'Event Points',
    path: '/dashboard/Events',
    icon: icon('event'),
  },
  {
    title: 'Meetings',
    path: '/dashboard/meet',
    icon: icon('meeting'),
  },
  {
    title: 'Point Table',
    path: '/dashboard/GroupsPoints',
    icon: icon('point_table'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
