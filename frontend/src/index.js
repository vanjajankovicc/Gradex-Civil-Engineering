import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
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

// Zaštita ruta (Components)
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Zaštitne rute za ulogovane inženjere i admine */}
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