import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  // const [error, setError] = useState("");
  const [userNotConfirmed, setUserNotConfirmed] = useState("");

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
      console.log({ err, data });
      setUserNotConfirmed(err.message);
    }
  }

  if (userNotConfirmed) return <Redirect to="/user-confirmation" />;

  return (
    <div>
      <div>
        <p>Sign in form</p>
        <div>
          <p>*Username</p>
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

          <p>*Password</p>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
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
            <p>Sign in</p>
          </button>

          <Link to="/sign-up">
            <p>Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
