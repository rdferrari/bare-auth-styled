import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Tagline from "../../components/TagLine";
import LinkStyled from "../../components/LinkStyled";

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
};

const ResendCode = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [codeResent, setCodeResent] = useState("");

  async function confirmUser(data: FormValues) {
    const { username } = data;
    try {
      await Auth.resendSignUp(username);
      setCodeResent(username);
      console.log("code resent successfully");
      reset({
        username: "",
      });
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  if (codeResent) return <Redirect to="/user-confirmation" />;

  return (
    <AuthContainer>
      <ContentContainer>
        <Tagline />

        <RightContainer>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
                placeholder="Username"
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.username && <p>Username is required.</p>}

          <button onClick={handleSubmit(confirmUser)}>
            <p>Resend code</p>
          </button>

          <Link to="/sign-in">
            <LinkStyled content="Sign in" />
          </Link>
        </RightContainer>
      </ContentContainer>
    </AuthContainer>
  );
};

export default ResendCode;
