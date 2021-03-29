import React, { useState, useEffect, createContext } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import ConfirmationUser from "./pages/Auth/ConfirmationUser";
import SignUp from "./pages/Auth/SignUp";
import List from "./pages/List";
import Detail from "./pages/Detail";

// AWS Amplify config
import config from "./aws-exports";
Amplify.configure(config);

// User context
export const UserStatusContext = createContext("");

function App() {
  const [user, setUser] = useState<string>("no user authenticated");

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const event = data.payload.event;

      switch (event) {
        case "signIn":
          console.log(`user signed in`);
          getUserData();
          break;
        case "signUp":
          console.log(`user signed up`);
          break;
        case "signOut":
          console.log(`user signed out`);
          setUser("no user authenticated");
          break;
        case "signIn_failure":
          console.log(
            "Sign in failed. Please, cheack your username and password."
          );
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          console.log("Users state");
      }
    });
  }, []);

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser(user.username) : setUser("no user authenticated");
    } catch (err) {
      console.log({ err });
    }
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <UserStatusContext.Provider value={user}>
      <Router>
        <Header signOut={signOut} />
        {user && <p>{user}</p>}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />

          <Route path="/detail/:id" component={Detail} />

          {user === "no user authenticated" ? (
            <>
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/user-confirmation" component={ConfirmationUser} />
            </>
          ) : (
            <>
              <Route path="/sign-in" render={() => <Redirect to="/list" />} />
              <Route path="/sign-up" render={() => <Redirect to="/list" />} />
              <Route
                path="/user-confirmation"
                render={() => <Redirect to="/list" />}
              />
            </>
          )}

          {/* {user ? (
            <Route
              path="/user-confirmation"
              render={() => <Redirect to="/list" />}
            />
          ) : (
            <Route path="/user-confirmation" component={ConfirmationUser} />
          )} */}

          {/* {user ? (
            <Route path="/sign-up" render={() => <Redirect to="/list" />} />
          ) : (
            <Route path="/sign-up" component={SignUp} />
          )} */}
        </Switch>
      </Router>
    </UserStatusContext.Provider>
  );
}

export default App;
