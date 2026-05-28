import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import DokumentacijaScreen from './screens/DokumentacijaScreen.jsx';

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
import ProjectDetailsScreen from './screens/ProjectDetailsScreen.jsx';
import NewTaskScreen from './screens/NewTaskScreen.jsx';

// Novi inženjerski ekrani
import DinamikaRadova from './screens/DinamikaRadova.jsx';
import ProcenaStatistika from './screens/ProcenaStatistika.jsx';
import KalkulatorMaterijala from './screens/KalkulatorMaterijala.jsx';
import ExcelTabele from './screens/ExcelTabele.jsx';

// Zaštita ruta (Components)
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Javne rute */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Nove inženjerske rute */}
      <Route path="/dinamika" element={<DinamikaRadova />} />
      <Route path="/procentualna-procena" element={<ProcenaStatistika />} />
      <Route path="/kalkulator" element={<KalkulatorMaterijala />} />
      <Route path="/tabele" element={<ExcelTabele />} />
      <Route path="/dokumentacija" element={<DokumentacijaScreen />} />
      
      {/* Zaštitne rute */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/project/:id" element={<ProjectDetailsScreen />} />
        <Route path="/project/:id/new-task" element={<NewTaskScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);