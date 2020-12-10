import React, { useEffect, useState, useCallback } from "react";
import firebaseConfig from "../../firebase.config";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

export const AuthContext = React.createContext();
export const AuthProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  const scsUser = localStorage.getItem("SCS_USER");
  const user = JSON.parse(scsUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Auth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value.trim(), password.value)
        .then((res) => {
          const { displayName, email, photoURL } = res.user;
          const signedInUser = { name: displayName, email, photo: photoURL };
          setCurrentUser(signedInUser);
          //   window.history.back();
          window.location.pathname = "/";
          return res.user;
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    console.log(name);
    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
          const { email } = res.user;
          const signedInUser = { name: name.value, email };
          setCurrentUser(signedInUser);
          window.location.pathname = "/";
          return res.user;
        });
    } catch (error) {
      alert(error);
    }
    const user = firebaseConfig.auth().currentUser;
    user
      .updateProfile({
        displayName: name.value,
        email: name.email,
      })
      .then(function (res) {
        console.log(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        const currentUser = { name: displayName, email, photo: photoURL };
        localStorage.setItem("SCS_USER", JSON.stringify(currentUser));
        console.log(currentUser);
        setCurrentUser(currentUser);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const signOut = () => {
    return firebaseConfig
      .auth()
      .signOut()
      .then((res) => {
        setCurrentUser(null);
        localStorage.removeItem("SCS_USER");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  return {
    currentUser,
    handleSignUp,
    signOut,
    onSubmit,
  };
};

export default Auth;
