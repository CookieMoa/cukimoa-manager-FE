// components/Layout.tsx
import { Outlet } from "react-router-dom";
import Menubar from "./Menubar";
import Header from "./Header";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f8f8f8;
  padding: 24px;
  overflow-y: auto;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Menubar />
      <ContentWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
