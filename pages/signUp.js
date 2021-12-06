import React from "react";
import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("../components/SignUp.jsx"));

export default function SignUpPage() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
