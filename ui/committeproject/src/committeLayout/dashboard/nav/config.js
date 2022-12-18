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
    title: 'Groups',
    path: '/dashboard/products',
    icon: icon('committee'),
  },
  {
    title: 'Games',
    path: '/dashboard/user',
    icon: icon('groups'),
  },
  {
    title: 'Committee',
    path: '/dashboard/committee',
    icon: icon('event'),
  },
  // {
  //   title: 'Meetings',
  //   path: '/dashboard/',
  //   icon: icon('meeting'),
  // },
  {
    title: 'Point Table',
    path: '/dashboard/committee',
    icon: icon('point_table'),
  },
 
];

export default navConfig;
