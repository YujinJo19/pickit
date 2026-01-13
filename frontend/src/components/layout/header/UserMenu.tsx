import React, { useMemo, useRef, useState } from "react";
import { User } from "lucide-react";
import { IconButton, PopoverAnchor } from "./Header.styles";
import { Dropdown, DropdownItem, Divider } from "./dropdown.styles";
import { useOutsideClick } from "../../../utils/useOutsideClick";
import { useEscapeKey } from "../../../utils/useEscapeKey";
import { useNavigate } from "react-router-dom";

interface Props {
  userInfo?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const UserMenu = ({ userInfo, onProfile, onSettings, onLogout }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const close = useMemo(() => () => setOpen(false), []);
  useOutsideClick(ref, close, open);
  useEscapeKey(close, open);
  return (
    <PopoverAnchor ref={ref}>
      <IconButton
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <User size={20} />
      </IconButton>

      <Dropdown
        role="menu"
        aria-label="User menu"
        style={{ left: "auto", right: 0 }}
      >
        {open &&
          (userInfo ? (
            <>
              <DropdownItem
                type="button"
                role="menuitem"
                onClick={() => {
                  onProfile?.();
                  close();
                }}
              >
                내 프로필
              </DropdownItem>

              <DropdownItem
                type="button"
                role="menuitem"
                onClick={() => {
                  onSettings?.();
                  close();
                }}
              >
                설정
              </DropdownItem>

              <Divider />

              <DropdownItem
                type="button"
                role="menuitem"
                $danger
                onClick={() => {
                  onLogout?.();
                  close();
                }}
              >
                로그아웃
              </DropdownItem>
            </>
          ) : (
            <DropdownItem
              type="button"
              role="menuitem"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </DropdownItem>
          ))}
      </Dropdown>
    </PopoverAnchor>
  );
};

export default UserMenu;
