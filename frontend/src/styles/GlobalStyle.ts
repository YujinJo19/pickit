import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors};
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;
