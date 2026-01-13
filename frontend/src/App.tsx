import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { styled } from "styled-components";
import Main from "./pages/Main";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { getToken, removeToken, setToken } from "./utils/token";
import { refreshAccessToken } from "./store/thunks/authThunk";
import SellerDashboard from "./pages/sellerDashboard/SellerDashboard";
import SellerSignup from "./pages/SellerSignup";
import { PrivateRoute } from "./routes/PrivateRoute";
import DashboardHome from "./components/seller/DashboardHome";
import SellerProductList from "./pages/sellerDashboard/SellerProductList";
import SellerProductDetail from "./pages/sellerDashboard/SellerProductDetail";
import SellerProductCreate from "./pages/sellerDashboard/SellerProductCreate";
import SellerProductUpdate from "./pages/sellerDashboard/SellerProductUpdate";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Search from "./pages/Search";
import ProfilePage from "./pages/mypage/MypageDashboard";
import Mypage from "./pages/mypage/Mypage";
import ProfileEditPage from "./pages/mypage/profile/ProfileEditPage";
import MypageDashboard from "./pages/mypage/MypageDashboard";

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
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/category/:id" element={<Category />} />
        <Route path="/search" element={<Search />} />
        // auth
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
        // user
        <Route path="/mypage" element={<Mypage />}>
          <Route index element={<MypageDashboard />} />
          <Route path="profile/edit" element={<ProfileEditPage />} />
        </Route>
        // seller
        <Route
          path="/seller/dashboard"
          element={
            <PrivateRoute roles={["SELLER"]}>
              <SellerDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<SellerProductList />} />
          <Route path="products/:id" element={<SellerProductDetail />} />
          <Route path="products/create" element={<SellerProductCreate />} />
          <Route path="products/update/:id" element={<SellerProductUpdate />} />
        </Route>
        {/* 404 -> main으로 이동 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
