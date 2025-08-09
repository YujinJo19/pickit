import React, { useEffect, useRef, useState } from "react";

const FIVE_MINUTES = 5 * 60;
export const useEmailTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 시작 함수
  const startTimer = () => {
    setTimeLeft(FIVE_MINUTES);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 타이머 초기화 함수
  const resetTimer = () => {
    setTimeLeft(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const isExpired = timeLeft === 0;

  // mm:ss 포맷팅
  const formatTime = () => {
    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  return {
    timeLeft,
    formatTime,
    isExpired,
    startTimer,
    resetTimer,
  };
};

export default useEmailTimer;
