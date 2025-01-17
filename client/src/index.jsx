import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Start from "./pages/Start";
import Rules from "./pages/Rules";
import Characters from "./pages/Characters";
import App from "./App";
import NotFound from "./pages/NotFound";
import NewCharPlayerInfo from "./pages/NewCharPlayerInfo";
import NewCharStats from "./pages/NewCharStats";
import NewCharSkills from "./pages/NewCharSkills";
import Story from "./pages/Story";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const GOOGLE_CLIENT_ID = "652128607404-rkv0o9ma7cqrlf75vlums1ga44ha59d9.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<NotFound />}>
      <Route path="/" element={<Login />} />
      <Route path="/start" element={<Start />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/characters" element={<Characters />} />
      <Route
        path="/new-character-player-info"
        element={<NewCharPlayerInfo />}
      />
      <Route path="/new-character-stats" element={<NewCharStats />} />
      <Route path="/new-character-skills" element={<NewCharSkills />} />
      <Route path="/story" element={<Story />} />
    </Route>
  )
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);