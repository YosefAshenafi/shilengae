import { Icon } from '@iconify/react';
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
import pinFill from '@iconify/icons-eva/pin-fill';
import gridFill from '@iconify/icons-eva/grid-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import settingsFill from '@iconify/icons-eva/settings-2-fill';
import globeFill from '@iconify/icons-eva/globe-2-fill';
import bookFill from '@iconify/icons-eva/book-fill';
import buildFill from '@iconify/icons-eva/map-fill';
// import cubeFill from '@iconify/icons-eva/cube-fill';
// import flashFill from '@iconify/icons-eva/flash-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill)
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  {
    title: 'home',
    path: '/dashboard/app',
    icon: getIcon(homeFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'country',
    path: '/dashboard/country',
    icon: getIcon(globeFill),
    roles: ['superadmin']
  },
  {
    title: 'region',
    path: '/dashboard/region',
    icon: getIcon(pinFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'city',
    path: '/dashboard/city',
    icon: getIcon(buildFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'Portal Users',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'Application Users',
    path: '/dashboard/reg-user',
    icon: getIcon(peopleFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'forms',
    path: '/dashboard/forms',
    icon: getIcon(gridFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'categories',
    path: '/dashboard/category',
    icon: getIcon(gridFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'ads',
    path: '/dashboard/ad',
    icon: getIcon(gridFill),
    roles: ['admin', 'superadmin']
  },
  // {
  //   title: 'reported ads',
  //   path: '/dashboard/reported/',
  //   icon: getIcon(gridFill),
  //   roles: ['admin', 'superadmin']
  // },
  {
    title: 'translations',
    path: '/dashboard/translation',
    icon: getIcon(bookFill),
    roles: ['admin', 'superadmin']
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: getIcon(settingsFill),
    roles: ['admin', 'superadmin']
  }

  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
