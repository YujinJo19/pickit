import { Bell } from "lucide-react";
import React from "react";
import { styled } from "styled-components";

const BellWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 0.7rem;
  padding: 2px 5px;
  border-radius: 50%;
`;

const NotificationBell = () => {
  const unreadCount = 3; // 추후 api 연결 필요
  return (
    <BellWrapper>
      <Bell size={22} />
      {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
    </BellWrapper>
  );
};

export default NotificationBell;
