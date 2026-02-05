import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { styled } from "styled-components";
import Main from "./pages/Main";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import {
  getToken,
  getUserIdFromToken,
  removeToken,
  setToken,
} from "./utils/token";
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
import MypageDashboard from "./pages/mypage/MypageDashboard";
import ProfileEditPage from "./pages/mypage/ProfileEditPage";
import Address from "./pages/mypage/Address";
import Cart from "./pages/Cart";
import { getUser } from "./store/thunks/userThunk";
import Order from "./pages/Order";
import OrderList from "./pages/mypage/OrderList";
import OrderDetail from "./pages/mypage/OrderDetail";
import DefaultLayout from "./components/layout/layouts/DefaultLayout";
import MypageLayout from "./components/layout/layouts/MypageLayout";
import NoHeaderLayout from "./components/layout/layouts/NoHeaderLayout";
import SellerLayout from "./components/layout/layouts/SellerLayout";

const AppContainer = styled.div`
  display: grid;
`;

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      const id = getUserIdFromToken(token || "");
      const autoLogin = localStorage.getItem("autoLogin");

      try {
        if (!token && autoLogin) {
          const response = await dispatch(refreshAccessToken()).unwrap();
          setToken(response.accessToken);
        }

        const currentToken = getToken();
        if (currentToken) {
          await dispatch(getUser(id));
        }
      } catch (err) {
        localStorage.removeItem("autoLogin");
        removeToken();
        navigate("/login");
      }
    };

    initializeAuth();
  }, [dispatch, navigate]);

  return (
    <AppContainer>
      <Routes>
        {/* 기본 사용자 */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:id" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Route>

        {/* auth */}
        <Route element={<NoHeaderLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/seller" element={<SellerSignup />} />
        </Route>

        {/* 마이페이지 */}
        <Route element={<MypageLayout />}>
          <Route path="/mypage">
            <Route index element={<MypageDashboard />} />
            <Route path="profile/edit" element={<ProfileEditPage />} />
            <Route path="address" element={<Address />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
        </Route>

        {/* 판매자 */}
        <Route
          element={
            <PrivateRoute roles={["SELLER"]}>
              <SellerLayout />
            </PrivateRoute>
          }
        >
          <Route path="/seller/dashboard">
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProductList />} />
            <Route path="products/:id" element={<SellerProductDetail />} />
            <Route path="products/create" element={<SellerProductCreate />} />
            <Route
              path="products/update/:id"
              element={<SellerProductUpdate />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
