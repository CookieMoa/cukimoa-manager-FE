import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./Login/LoginPage";
import Header from "./Components/Header";
import Menubar from "./Components/Menubar";

import MainCafe from "./Cafe/MainCafe";
import MainDashboard from "./Dashboard/MainDashboard";
import MainUser from "./User/MainUser";
import Layout from "./Components/Layout";

const MainLayout = styled.div``;

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainDashboard />} />
          <Route path="cafe" element={<MainCafe />} />
          <Route path="users" element={<MainUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
