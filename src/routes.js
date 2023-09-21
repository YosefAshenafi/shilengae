import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout, { WithoutLogoLayout } from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
import User from './pages/User';
import RegUser from './pages/RegUser';
import NotFound from './pages/Page404';
import City from './pages/City';
import Country from './pages/Country';
import Region from './pages/Region';
import Form from './pages/Form';
import CreateForm from './pages/CreateForm';
import Category from './pages/Category';
import EditForm from './pages/EditForm';
import AuthTest from './pages/AuthTest';
import FirebaseTest from './pages/FirebaseTest';
import Ad from './pages/Ad';
import ReportedAds from './pages/ReportedAds';
import Translation from './pages/Translations';
import AdPreferences from './pages/AdPreferences';
import ChooseCountry from './pages/ChooseCountry';
import UserDetail from './pages/UserDetail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <PrivateRoute component={DashboardApp} /> },
        { path: 'user', element: <PrivateRoute component={User} /> },
        { path: 'reg-user/:id', element: <PrivateRoute component={UserDetail} /> },
        { path: 'reg-user', element: <PrivateRoute component={RegUser} /> },
        { path: 'city', element: <PrivateRoute component={City} /> },
        { path: 'region', element: <PrivateRoute component={Region} /> },
        { path: 'country', element: <PrivateRoute component={Country} /> },
        { path: 'forms', element: <PrivateRoute component={Form} /> },
        { path: 'forms/create', element: <PrivateRoute component={CreateForm} /> },
        { path: 'forms/edit/:id', element: <PrivateRoute component={EditForm} /> },
        { path: 'category', element: <PrivateRoute component={Category} /> },
        { path: 'ad', element: <PrivateRoute component={Ad} /> },
        { path: 'reported', element: <PrivateRoute component={ReportedAds} /> },
        { path: 'translation', element: <PrivateRoute component={Translation} /> },
        { path: 'settings', element: <PrivateRoute component={AdPreferences} /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'firebase', element: <FirebaseTest /> },
        { path: 'auth', element: <AuthTest /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <WithoutLogoLayout />,
      children: [{ path: 'choose-country', element: <PrivateRoute component={ChooseCountry} /> }]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  if (!localStorage.getItem('access-token')) {
    return <Navigate to="/login" />;
  }
  return <Component {...rest} />;
}
