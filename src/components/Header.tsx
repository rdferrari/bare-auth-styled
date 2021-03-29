import React from "react";
import { Link } from "react-router-dom";
import { UserStatusContext } from "../App";

interface Props {
  signOut(): void;
}

function Header({ signOut }: Props): JSX.Element {
  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <div>
          <Link to="/">
            <p>Home</p>
          </Link>

          <Link to="/list">
            <p>List</p>
          </Link>

          <Link to="/profiles">
            <p>Profiles</p>
          </Link>
          {console.log(user)}
          {user === "no user authenticated" ? (
            <Link to="/sign-in">
              <p>Sign in</p>
            </Link>
          ) : (
            <p onClick={signOut}>Sign out</p>
          )}
        </div>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Header;
