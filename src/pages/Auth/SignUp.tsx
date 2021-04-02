import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
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
  email: string;
  password: string;
};

const SignUp = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  // const [error, setError] = useState("");
  const [userNotConfirmed, setUserNotConfirmed] = useState(false);

  async function signIn(data: FormValues) {
    const { username, email, password } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      reset({
        username: "",
        email: "",
        password: "",
      });
      setUserNotConfirmed(true);
    } catch (err) {
      console.log({ err, data });
    }
  }

  if (userNotConfirmed) return <Redirect to="/user-confirmation" />;

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

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && <p>Email is required.</p>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
                type="Password"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
                placeholder="Password"
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && <p>Password is required.</p>}

          <button onClick={handleSubmit(signIn)}>
            <p>Sign up</p>
          </button>

          <Link to="/sign-in">
            <LinkStyled content="Sign in" />
          </Link>
        </RightContainer>
      </ContentContainer>
    </AuthContainer>
  );
};

export default SignUp;
