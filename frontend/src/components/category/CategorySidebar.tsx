import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getChildCategories, getParentCategories } from "../../utils/category";

type Props = {
  onSelect?: () => void;
};
const CategorySidebar = ({ onSelect }: Props) => {
  const { id } = useParams<{ id: string }>();
  const parents = useMemo(() => getParentCategories(), []);
  const [openParentId, setOpenParentId] = useState<number | null>(null);
  const navigate = useNavigate();
  const selectedId = Number(id);

  const defaultOpenParentId = useMemo(() => {
    if (!selectedId) return null;
    for (const p of parents) {
      const children = getChildCategories(p.id);
      if (children.some((c) => c.id === selectedId)) return p.id;
    }
    return null;
  }, [parents, selectedId]);

  useEffect(() => {
    setOpenParentId(defaultOpenParentId);
  }, [defaultOpenParentId]);
  return (
    <Wrap>
      <Title>카테고리</Title>
      <Nav>
        {parents.map((parent) => {
          const children = getChildCategories(parent.id);
          const isOpen = openParentId === parent.id;
          return (
            <Group key={parent.id}>
              <ParentButton
                $active={isOpen}
                onClick={() => {
                  setOpenParentId((prev) =>
                    prev === parent.id ? null : parent.id
                  );
                  if (isOpen) {
                    navigate(`/products/category/${parent.id}`);
                  }
                }}
              >
                {parent.name}
              </ParentButton>
              {isOpen && (
                <ChildrenList>
                  {children.map((child) => (
                    <ChildButton
                      key={child.id}
                      $active={child.id === selectedId}
                      onClick={() => {
                        navigate(`/products/category/${child.id}`);
                        onSelect?.();
                      }}
                    >
                      {child.name}
                    </ChildButton>
                  ))}
                </ChildrenList>
              )}
            </Group>
          );
        })}
      </Nav>
    </Wrap>
  );
};

export default CategorySidebar;

const Wrap = styled.aside`
  width: 100%;
  padding: 16px;
`;

const Title = styled.div`
  font-weight: 800;
  margin-bottom: 12px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Group = styled.div``;

const ParentButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 10px 10px;
  border-radius: 10px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary};

  ${({ $active, theme }) =>
    $active
      ? `
        background: ${theme.colors.background};
        font-weight: 700;
      `
      : `
        &:hover { background: ${theme.colors.background}; }
      `}
`;

const ChildrenList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 0 0 10px;
`;

const ChildButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.9rem;

  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};

  ${({ $active, theme }) =>
    $active
      ? `
        background: ${theme.colors.hoverBg || theme.colors.background};
        font-weight: 700;
      `
      : `
        &:hover { background: ${
          theme.colors.hoverBg || theme.colors.background
        }; }
      `}
`;
