import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID } from './constants';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Ekrani (Screens)
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen.jsx';
import NewTaskScreen from './screens/NewTaskScreen.jsx';
import KalkulatorMaterijala from './screens/KalkulatorMaterijala.jsx';
import DokumentacijaScreen from './screens/DokumentacijaScreen.jsx';
import StatistikaScreen from './screens/StatistikaScreen.jsx';
import AdminScreen from './screens/AdminScreen.jsx';

// Zaštita ruta (Components)
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Javne rute */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registracija" element={<RegisterScreen />} />
      <Route path="/kalkulator" element={<KalkulatorMaterijala />} />
      <Route path="/dokumentacija" element={<DokumentacijaScreen />} />

      {/* Detalji projekta su javni za čitanje */}
      <Route path="/project/:id" element={<ProjectDetailsScreen />} />

      {/* Zaštićene rute — moraju biti prijavljeni */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/project/:id/new-task" element={<NewTaskScreen />} />
        <Route path="/statistika" element={<StatistikaScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'EUR' }}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
