import React, { useState } from "react";
import { Redirect } from "react-router";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  username: string;
  code: string;
};

const ConfirmationUser = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);

  async function confirmUser(data: FormValues) {
    const { username, code } = data;
    try {
      const { user } = await Auth.confirmSignUp(username, code);
      setUserConfirmed(true);
      reset({
        username: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
    }
  }

  async function resendCode(data: FormValues) {
    const { username } = data;
    try {
      await Auth.resendSignUp(username);
      setShowResendLink(false);
      console.log("code resent successfully");
      reset({
        username: "",
      });
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  if (userConfirmed) return <Redirect to="sign-in" />;

  if (showResendLink) {
    return (
      <div>
        <div>
          <p>Code resend</p>

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

            <button onClick={handleSubmit(resendCode)}>
              <p>Resend code</p>
            </button>
            <button>
              <p onClick={() => setShowResendLink(!showResendLink)}>
                Confirmation code
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>User confirmation</p>
        <p>
          Please, verify your email and confirm your account with your username
          and code.
        </p>

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

          <p>*Code</p>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
                placeholder="Code"
              />
            )}
            name="code"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.code && <p>Code is required!</p>}

          <p>{userConfirmed}</p>

          <button onClick={handleSubmit(confirmUser)}>
            <p>Confirm user</p>
          </button>

          <button>
            <p onClick={() => setShowResendLink(!showResendLink)}>
              Resend the verification code
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationUser;
