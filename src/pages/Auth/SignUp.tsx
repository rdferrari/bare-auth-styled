import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";

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
    <div>
      <div>
        <p>Sign up</p>
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

          <p>*Email</p>
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
            <p>Sign up</p>
          </button>

          <Link to="/sign-in">
            <p>Sign in</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
