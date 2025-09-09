import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { styled } from "styled-components";
import Main from "./pages/Main";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { getToken, removeToken, setToken } from "./services/token";
import { refreshAccessToken } from "./store/thunks/authThunk";
import SellerDashboard from "./pages/SellerDashboard";
import SellerSignup from "./pages/SellerSignup";
import { PrivateRoute } from "./routes/PrivateRoute";

const AppContainer = styled.div`
  display: grid;
`;

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      const autoLogin = localStorage.getItem("autoLogin");
      if (!token && autoLogin) {
        try {
          const response = await dispatch(refreshAccessToken());
          const newAccessToken = response.payload.accessToken;
          setToken(newAccessToken);
        } catch (err) {
          localStorage.removeItem("autoLogin");
          removeToken();
          navigate("/login");
        }
      }
    };
    initializeAuth();
  }, [dispatch, navigate]);
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Main />} />
        // auth
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
        // seller
        <Route
          path="/seller/dashboard"
          element={
            <PrivateRoute roles={["SELLER"]}>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
