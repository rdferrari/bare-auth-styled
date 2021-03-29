import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";

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

          <button onClick={handleSubmit(confirmUser)}>
            <p>Resend code</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendCode;
