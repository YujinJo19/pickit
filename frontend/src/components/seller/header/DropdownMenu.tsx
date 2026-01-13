import styled from "styled-components";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/thunks/authThunk";
import { removeToken } from "../../../utils/token";

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 45px;
  width: 160px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
`;

const MenuItem = styled.div<{ $danger?: boolean }>`
  padding: 10px 14px;
  font-size: 0.9rem;
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.error : theme.colors.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray};
  margin: 6px 0;
`;
interface Props {
  handleLogout: () => void;
}
const DropdownMenu = ({ handleLogout }: Props) => {
  return (
    <Menu>
      <MenuItem>내 프로필</MenuItem>
      <MenuItem>설정</MenuItem>
      <Divider />
      <MenuItem $danger onClick={handleLogout}>
        로그아웃
      </MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
