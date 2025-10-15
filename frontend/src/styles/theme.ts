const theme = {
  colors: {
    primary: "#000000",
    secondary: "#F29940",
    background: "#ffffff",
    error: "#ff4d4f",
    gray: "#e5e5e5",
    white: "#ffffff",
    text: "#333",
    border: "#e0e0e0",
    sidebarBg: "#fff",
    hoverBg: "#f5f5f5",
  },
  fontSizes: {
    sm: "12px",
    base: "14px",
    lg: "16px",
    xl: "18px",
  },
  breakpoints: {
    mobile: `(max-width: 768px)`, // 768px 이하일 때
    tablet: `(max-width: 1024px)`, // 1024px 이하일 때
    desktop: `(min-width: 1025px)`, // 1025px 이상일 때
  },
};

export type ThemeType = typeof theme;
export default theme;
