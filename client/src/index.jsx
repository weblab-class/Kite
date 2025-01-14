import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/login';
import Start from './pages/start';
import Rules from './pages/rules';
import Characters from './pages/characters';
import App from './App';
import NotFound from './pages/NotFound';
import NewCharPlayerInfo from './pages/NewCharPlayerInfo';
import NewCharStats from './pages/NewCharStats';
import NewCharSkills from './pages/NewCharSkills';
import Story from './pages/Story';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/start" element={<Start />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/new-character" element={<NewCharPlayerInfo />} />
      <Route path="/character-stats" element={<NewCharStats />} />
      <Route path="/character-skills" element={<NewCharSkills />} />
      <Route path="/story" element={<Story />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); 