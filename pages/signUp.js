import React from "react";
import dynamic from "next/dynamic";

export default function SignUpPage(props) {
  const SignUp = dynamic(() => import("../components/SignUp.jsx"));
  return (
    <div>
      <SignUp />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
