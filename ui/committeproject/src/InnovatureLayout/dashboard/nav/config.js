// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboardInno/homeInno',
    icon: icon('home'),
  },
  {
    title: 'Event',
    path: '/dashboardInno/Events',
    icon: icon('event'),
  },
  {
    title: 'EventPoint',
    path: '/dashboardInno/eventPoints',
    icon: icon('point_table'),
  },
  { 
    title: 'Game',
    path: '/dashboardInno/gamePoint',
    icon: icon('point_table'),
  }
];

export default navConfig;
