import React, { useEffect, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import { DEFAULT_PRODUCT_IMAGE, toUrl } from "../../utils/image";

type Props = {
  images: string[];
  autoPlay?: boolean;
  intervalMs?: number;
  aspectRatio?: string;
};

const ImageCarousel = ({
  images,
  autoPlay = false,
  intervalMs = 4500,
  aspectRatio = "1 / 1",
}: Props) => {
  const safeImages = useMemo(() => (images ?? []).filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  const len = safeImages.length;

  useEffect(() => {
    setIndex(0);
  }, [len]);

  useEffect(() => {
    if (!autoPlay || len <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % len);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, intervalMs, len]);

  if (!len) return null;

  const go = (next: number) => setIndex((next + len) % len);
  return (
    <Wrap>
      <Main $ratio={aspectRatio}>
        <Img
          src={
            safeImages[index] ? toUrl(safeImages[index]) : DEFAULT_PRODUCT_IMAGE
          }
          alt={`상품 이미지 ${index + 1}`}
        />
        {len > 1 && (
          <>
            <ArrowBtn
              $pos="left"
              onClick={() => go(index - 1)}
              aria-label="prev"
            >
              ‹
            </ArrowBtn>
            <ArrowBtn
              $pos="right"
              onClick={() => go(index + 1)}
              aria-label="next"
            >
              ›
            </ArrowBtn>
            <Dots>
              {safeImages.map((_, i) => (
                <Dot
                  key={`${i}-${safeImages[i]}`}
                  $active={i === index}
                  onClick={() => setIndex(i)}
                  aria-label={`go to image ${i + 1}`}
                  type="button"
                />
              ))}
            </Dots>
          </>
        )}
      </Main>

      {len > 1 && (
        <ThumbRow>
          {safeImages.map((src, i) => (
            <ThumbBtn
              key={`${i}-thumb`}
              type="button"
              $active={i === index}
              onClick={() => setIndex(i)}
              aria-label={`select image ${i + 1}`}
            >
              <ThumbImg src={src ? toUrl(src) : DEFAULT_PRODUCT_IMAGE} alt="" />
            </ThumbBtn>
          ))}
        </ThumbRow>
      )}
    </Wrap>
  );
};

export default ImageCarousel;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Main = styled.div<{ $ratio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${(p) => p.$ratio};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ThumbRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ThumbBtn = styled.button<{ $active: boolean }>`
  border: 1px solid ${(p) => (p.$active ? "#111" : "#e6e6e6")};
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  width: 72px;
  aspect-ratio: 1 / 1;

  ${(p) =>
    p.$active &&
    css`
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    `}
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 12px;
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
  opacity: 0.85;
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
