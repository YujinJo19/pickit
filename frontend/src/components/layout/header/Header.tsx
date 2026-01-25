import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  HeaderContainer,
  LeftArea,
  RightArea,
  LogoContainer,
  IconButton,
} from "./Header.styles";
import CategoryNav from "./CategoryNav";
import HeaderSearch from "./HeaderSearch";
import UserMenu from "./UserMenu";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImage from "../../../assets/images/logo_image.jpeg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/thunks/authThunk";
import { removeToken } from "../../../utils/token";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === "fulfilled") {
      removeToken();
      navigate("/login", { state: { redirectTo: location.pathname } });
    }
  };
  return (
    <HeaderContainer>
      <LeftArea>
        <LogoContainer onClick={() => navigate("/")}>
          <img src={LogoImage} alt="logo" />
        </LogoContainer>
        <CategoryNav
          onSelectCategory={(mainId, subId) => {
            console.log("category:", mainId, subId);
          }}
        />
      </LeftArea>
      <RightArea>
        <HeaderSearch
          onSubmit={(q) => {
            if (!q) return;
            navigate(`/search?keyword=${encodeURIComponent(q)}&page=0&size=10`);
          }}
        />

        <UserMenu
          userInfo={user?.email}
          onProfile={() => navigate("/mypage")}
          onSettings={() => console.log("settings")}
          onLogout={handleLogout}
        />

        <IconButton
          type="button"
          aria-label="cart"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={20} />
        </IconButton>
      </RightArea>
    </HeaderContainer>
  );
};

export default Header;
