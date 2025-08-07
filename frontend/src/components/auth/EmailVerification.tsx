import React, { useState } from "react";
import useEmailTimer from "./hooks/useEmailTimer";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const { formatTime, isExpired, startTimer, resetTimer } = useEmailTimer();

  const handleSendCode = () => {};
  return <div></div>;
};

export default EmailVerification;
