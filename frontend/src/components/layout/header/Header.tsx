import React from "react";
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
import { useNavigate } from "react-router-dom";
import LogoImage from "../../../assets/images/logo_image.jpeg";
interface Props {
  userInfo?: string;
  onLogout?: () => Promise<void>;
}
const Header = ({ userInfo, onLogout }: Props) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <LeftArea>
        <LogoContainer>
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
        {onLogout && (
          <UserMenu
            userInfo={userInfo}
            onProfile={() => navigate("/mypage")}
            onSettings={() => console.log("settings")}
            onLogout={onLogout}
          />
        )}
        <IconButton type="button" aria-label="cart">
          <ShoppingCart size={20} />
        </IconButton>
      </RightArea>
    </HeaderContainer>
  );
};

export default Header;
