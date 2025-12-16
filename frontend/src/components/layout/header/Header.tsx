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

interface Props {
  userInfo: string;
  onLogout: () => Promise<void>;
}
const Header = ({ userInfo, onLogout }: Props) => {
  return (
    <HeaderContainer>
      <LeftArea>
        <LogoContainer>
          <img src="logo_image.jpeg" alt="logo" />
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
            console.log("search:", q);
          }}
        />
        <UserMenu
          userInfo={userInfo}
          onProfile={() => console.log("profile")}
          onSettings={() => console.log("settings")}
          onLogout={onLogout}
        />
        <IconButton type="button" aria-label="cart">
          <ShoppingCart size={20} />
        </IconButton>
      </RightArea>
    </HeaderContainer>
  );
};

export default Header;
