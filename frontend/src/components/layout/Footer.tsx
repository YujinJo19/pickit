import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrap>
      <Inner>
        <div>
          <Logo>pickit</Logo>
          <Text>이 웹사이트는 포트폴리오 목적으로 제작되었습니다.</Text>
          <Text>© 2025. All rights reserved.</Text>
        </div>

        <div>
          <Title>Contact</Title>
          <Text>email: ska05142@gmail.com</Text>
        </div>

        <div>
          <Title>Links</Title>
          <Links>
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </Links>
        </div>
      </Inner>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.footer`
  margin-top: 36px;
  border-top: 1px solid #eee;
  background: #fff;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 20px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.3px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 8px;
`;

const Text = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.5;
`;

const Links = styled.div`
  display: flex;
  a {
    font-size: 12px;
    color: #333;
    text-decoration: none;
    margin: 0 15px 0 0;
  }
  a:hover {
    text-decoration: underline;
  }
`;
