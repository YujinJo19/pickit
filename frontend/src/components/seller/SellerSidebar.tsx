import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  DollarSign,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
} from "lucide-react";

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.sidebarBg || "#ffffff"};
  border-right: 1px solid ${({ theme }) => theme.colors.border || "#e5e5e5"};
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);
  position: fixed;
  left: 0;
  top: 0;
`;

const SidebarHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0 24px;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.colors.primary || "#222"};
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MenuItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary || "#007bff" : theme.colors.text || "#333"};
  cursor: pointer;
  border-left: 4px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary || "#007bff" : "transparent"};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.hoverBg || "#f5f8ff" : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBg || "#f5f5f5"};
    color: ${({ theme }) => theme.colors.primary || "#007bff"};
  }

  svg {
    stroke-width: 1.8;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;
const SellerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로와 일치하면 active 스타일 적용
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer>
      <SidebarHeader>판매자 센터</SidebarHeader>

      <Menu>
        <MenuItem
          onClick={() => navigate("/seller/dashboard")}
          $active={isActive("/seller/dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>대시보드</span>
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/seller/dashboard/settlement")}
          $active={isActive("/seller/dashboard/settlement")}
        >
          <DollarSign size={18} />
          <span>정산 관리</span>
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/seller/dashboard/products")}
          $active={isActive("/seller/dashboard/products")}
        >
          <Package size={18} />
          <span>상품 관리</span>
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/seller/dashboard/orders")}
          $active={isActive("/seller/dashboard/orders")}
        >
          <ShoppingBag size={18} />
          <span>주문 관리</span>
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/seller/dashboard/inquiries")}
          $active={isActive("/seller/dashboard/inquiries")}
        >
          <MessageSquare size={18} />
          <span>고객 문의</span>
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/seller/dashboard/settings")}
          $active={isActive("/seller/dashboard/settings")}
        >
          <Settings size={18} />
          <span>설정</span>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default SellerSidebar;
