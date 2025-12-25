import React, { useState } from "react";
import { Search } from "lucide-react";
import { styled } from "styled-components";
import { IconButton } from "./Header.styles";

type Props = {
  onSubmit?: (q: string) => void;
  defaultValue?: string;
};

const HeaderSearch = ({ onSubmit, defaultValue = "" }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSubmit?.(q);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <IconButton type="submit" aria-label="search">
        <Search size={20} />
      </IconButton>
    </SearchForm>
  );
};

export default HeaderSearch;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 12px;
`;

const SearchInput = styled.input`
  border: 0;
  outline: none;
  min-width: 220px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray ?? theme.colors.gray};
  }
`;
