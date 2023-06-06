import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import RootLayout from "./rootLayout/RootLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  const { authIsReady } = useAuthContext();

  return <>{authIsReady && <RouterProvider router={router} />}</>;
}

export default App;
