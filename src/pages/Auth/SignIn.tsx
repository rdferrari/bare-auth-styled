import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Tagline from "../../components/TagLine";
import LinkStyled from "../../components/LinkStyled";
import SignInC from "../../components/SignIn";

const AuthContainer = styled.div`
  margin: 0;
  width 100%;

  @media only screen and (min-width: 1024px) {
    margin: 0 auto;
    padding: 200px 0;
    width 900px;
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

const RightContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    margin-top: 40px;
  }
`;

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, errors, reset } = useForm();

  return (
    <AuthContainer>
      <ContentContainer>
        <Tagline />

        <SignInC />
      </ContentContainer>
    </AuthContainer>
  );
};

export default SignIn;
