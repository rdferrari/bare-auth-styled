import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import LinkStyled from "./LinkStyled";

const FormContainer = styled.div`
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
  const [userNotConfirmed, setUserNotConfirmed] = useState("");
  const [errMessage, setErrMessage] = useState("");

  async function signIn(data: FormValues) {
    const { username, password } = data;
    try {
      await Auth.signIn({
        username,
        password,
      });
      reset({
        username: "",
        password: "",
      });
    } catch (err) {
      setErrMessage(err.message);
      setUserNotConfirmed(data.username);
      resendCode();
    }
  }

  async function resendCode() {
    try {
      await Auth.resendSignUp(userNotConfirmed);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  async function confirmUser(data: FormValues) {
    const { password } = data;
    try {
      await Auth.confirmSignUp(userNotConfirmed, password);
      reset({
        password: "",
      });
      setErrMessage("");
    } catch (err) {
      console.log({ err, data });
    }
  }

  if (errMessage === "User is not confirmed.") {
    return (
      <div>
        {errMessage && <p className="error-message">{errMessage}</p>}
        <p>
          {userNotConfirmed}, we sent a verification code to your email. Please,
          enter the code below.
        </p>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <input
              onBlur={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
              placeholder="Verification code"
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />

        <button onClick={handleSubmit(confirmUser)}>
          <p>Confirm your account</p>
        </button>
      </div>
    );
  }

  return (
    <FormContainer>
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
      {errors.username && <p className="error-message">Username is required</p>}

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
      {errors.password && <p className="error-message">Password is required</p>}

      <button onClick={handleSubmit(signIn)}>
        <p>Sign in</p>
      </button>

      {errMessage && <p className="error-message">{errMessage}</p>}
      <div>
        <p className="button-text">{"< Forgotten password? />"}</p>
      </div>
    </FormContainer>
  );
};

export default SignIn;
