import React, { useEffect, useMemo, useState } from "react";
import { Banner } from "../../data/mainMock";
import { useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";

type Props = { items: Banner[] };

const Carousel = ({ items }: Props) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const safeItems = useMemo(() => items ?? [], [items]);
  const current = safeItems[index];

  const goNext = (next: number) => {
    const len = safeItems.length;
    setIndex((next + len) % len);
  };

  useEffect(() => {
    if (!safeItems.length) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeItems.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [safeItems.length]);

  if (!safeItems.length) {
    return <></>;
  }

  return (
    <Wrap>
      <Inner>
        <Slide $bg={current.imageUrl} role="banner" aria-label="Main banner">
          <Dim />
          <Content>
            <Title>{current.title}</Title>
            <SubTitle>{current.subtitle}</SubTitle>
            <Cta onClick={() => navigate(current.ctaHref)}>
              {current.ctaText}
            </Cta>
          </Content>

          <ArrowBtn
            aria-label="prev"
            $pos="left"
            onClick={() => goNext(index - 1)}
          >
            ‹
          </ArrowBtn>
          <ArrowBtn
            aria-label="next"
            $pos="right"
            onClick={() => goNext(index + 1)}
          >
            ›
          </ArrowBtn>

          <Dots>
            {safeItems.map((b, i) => (
              <Dot
                key={b.id}
                $active={i === index}
                aria-label={`go to banner ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </Dots>
        </Slide>
      </Inner>
    </Wrap>
  );
};

export default Carousel;

const Wrap = styled.section`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px 0;
`;

const Slide = styled.div<{ $bg: string }>`
  position: relative;
  height: clamp(180px, 25vw, 360px);
  object-fit: cover;
  display: block;
  border-radius: 16px;
  overflow: hidden;
  background-image: url(${(p) => p.$bg});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 240px;
    border-radius: 12px;
  }
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.18) 55%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Content = styled.div`
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  max-width: 520px;

  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    max-width: unset;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: -0.6px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.p`
  margin: 10px 0 16px;
  font-size: 18px;
  font-weight: 600;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Cta = styled.button`
  border: 0;
  cursor: pointer;
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  font-weight: 800;
  background: #ffffff;
  color: #111;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.65);

  ${(p) =>
    p.$active &&
    css`
      width: 22px;
      opacity: 1;
      background: rgba(255, 255, 255, 0.95);
    `}
`;

const ArrowBtn = styled.button<{ $pos: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.$pos === "left" ? "left: 10px;" : "right: 10px;")}
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.85);
  font-size: 22px;
  line-height: 38px;
`;
