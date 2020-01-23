import Home from './containers/Home';
import CustomerDetail from './containers/CustomerDetail';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/customer-detail',
    component: CustomerDetail,
    exact: true
  },
];

export default routes;