import React, { useEffect, useRef, useState } from "react";
import { User, UserCredential } from "firebase/auth";

import { initCaptchaVerifier, recaptchaKey, signWithPhone } from "../firebase";

interface Props {
  user: User | undefined | null;
}

const Login: React.FC<Props> = ({ user }) => {
  const [phone, setPhone] = useState("+213778415345");
  const [otp, setOtp] = useState("");

  const [checkCode, setCheckCode] = useState(false);

  const confirmCode = useRef<(otp: string) => Promise<UserCredential | null>>();

  useEffect(() => {
    if (user !== null) return;

    console.log("going to init the captcha");
    initCaptchaVerifier("signPhone");
  }, [user]);

  // handle form submission and prevent defualt
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkCode) {
      confirmCode.current!(otp);
    } else if (phone.length > 9) {
      signWithPhone(phone).then((f) => {
        confirmCode.current = f;
        setCheckCode(true);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>One Time Password</h3>
      {!checkCode && (
        <>
          <p>please enter the phone number</p>
          <input
            type={"text"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            id="signPhone"
            className="g-recaptcha"
            data-sitekey={recaptchaKey}
            data-callback="onSubmit"
            data-action="submit"
          >
            Submit
          </button>
        </>
      )}

      {checkCode && (
        <>
          <p>please enter the otp</p>
          <input
            type={"text"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button>Submit</button>
        </>
      )}
    </form>
  );
};

export default Login;
