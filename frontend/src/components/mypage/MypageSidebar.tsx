import React from "react";
import styled from "styled-components";

const MypageSidebar = () => {
  return (
    <aside style={{ width: 240, background: "#f2f2f2", padding: 24 }}>
      <Section>
        <Title>프로필 관리</Title>
        <Item>프로필 수정</Item>
        <Item>비밀번호 변경</Item>
      </Section>

      <Section>
        <Title>주문 관리</Title>
        <Item>최근 주문 내역</Item>
        <Item>주문 상세 보기</Item>
      </Section>

      <Section>
        <Title>배송 관리</Title>
        <Item>등록된 배송지 보기</Item>
      </Section>

      <Section>
        <Title>고객센터 및 지원</Title>
        <Item>문의하기</Item>
      </Section>
    </aside>
  );
};

export default MypageSidebar;

const Section = styled.div`
  marginbottom: 24px;
`;

const Title = styled.h4``;

const Item = styled.div`
  margintop: 8px;
`;
