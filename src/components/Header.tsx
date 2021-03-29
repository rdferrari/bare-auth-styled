import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserStatusContext } from "../App";

interface Props {
  signOut(): void;
}

function Header({ signOut }: Props): JSX.Element {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>();

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
  }, []);

  const handleInstallPwa = () => {
    installPromptEvent.prompt();

    installPromptEvent.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    });
  };

  console.log(installPromptEvent);

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

          {installPromptEvent && (
            <button onClick={handleInstallPwa}>Install</button>
          )}

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
