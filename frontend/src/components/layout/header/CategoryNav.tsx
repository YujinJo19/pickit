import React, { useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { categories } from "../../../data/categories";
import { useOutsideClick } from "../../../utils/useOutsideClick";
import { useEscapeKey } from "../../../utils/useEscapeKey";
import { Dropdown, DropdownItem } from "./dropdown.styles";
import {
  getChildCategories,
  getParentCategories,
} from "../../../utils/category";

type Props = {
  onSelectCategory?: (parentId: number, childId: number) => void;
};

const CategoryNav = ({ onSelectCategory }: Props) => {
  const parents = getParentCategories();
  const [openParentId, setOpenParentId] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const close = () => setOpenParentId(null);

  useOutsideClick(navRef, close, openParentId !== null);
  useEscapeKey(close, openParentId !== null);

  return (
    <Nav ref={navRef}>
      {parents.map((parent) => {
        const children = getChildCategories(parent.id);

        return (
          <ItemWrapper key={parent.id}>
            <ParentButton
              $active={openParentId === parent.id}
              onClick={() =>
                setOpenParentId((prev) =>
                  prev === parent.id ? null : parent.id
                )
              }
            >
              {parent.name}
            </ParentButton>

            {openParentId === parent.id && children.length > 0 && (
              <Dropdown>
                {children.map((child) => (
                  <DropdownItem
                    key={child.id}
                    onClick={() => {
                      onSelectCategory?.(parent.id, child.id);
                      close();
                    }}
                  >
                    {child.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </ItemWrapper>
        );
      })}
    </Nav>
  );
};

export default CategoryNav;
const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  position: relative;
`;

const ParentButton = styled.button<{ $active?: boolean }>`
  border: 0;
  background: transparent;
  cursor: pointer;

  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.95rem;

  color: ${({ theme }) => theme.colors.primary};

  ${({ $active, theme }) =>
    $active
      ? `
        background: ${theme.colors.background};
        font-weight: 600;
      `
      : `
        &:hover {
          background: ${theme.colors.background};
        }
      `}
`;
