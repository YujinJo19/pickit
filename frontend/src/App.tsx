import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { styled } from "styled-components";

const AppContainer = styled.div`
  display: grid;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
