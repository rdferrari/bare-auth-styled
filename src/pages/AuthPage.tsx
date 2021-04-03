import React, { useState } from "react";
import styled from "styled-components";
import Tagline from "../components/TagLine";

import SignInC from "../components/SignIn";
import SignUpC from "../components/SignUp";

const AuthContainer = styled.div`
  margin: 50px 0;
  width 100%;

  @media only screen and (min-width: 1024px) {
    margin: 0 auto;
    padding: 200px 0;
    width 700px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const AuthPage = () => {
  const [signup, setSignup] = useState(false);

  return (
    <AuthContainer>
      <ContentContainer>
        <div>
          <Tagline />
        </div>
        {signup === false ? <SignInC /> : <SignUpC />}
      </ContentContainer>
      <p className="button-text" onClick={() => setSignup(!signup)}>
        {signup === false ? "< Sign up />" : "< Sign in />"}
      </p>
    </AuthContainer>
  );
};

export default AuthPage;
