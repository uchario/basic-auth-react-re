import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'dashboard',
        element: <Dashboard/>
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
