import styled from "styled-components";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import default_img from "../../../assets/images/default-avatar.png";
const AvatarContainer = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  transition: 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  handleLogout: () => void;
}
const Avatar = ({ handleLogout }: Props) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <AvatarContainer>
      <ProfileImg src={default_img} alt="Seller Avatar" onClick={toggleMenu} />
      {open && <DropdownMenu handleLogout={handleLogout} />}
    </AvatarContainer>
  );
};

export default Avatar;
