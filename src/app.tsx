import { User } from "firebase/auth";
import React from "react";

import { useEffect, useState } from "react";
import Loading from "./components/loading";

import { subscribeToUser } from "./firebase";

import Dashboard from "./components/dashboard";
import Login from "./components/login";

const App = () => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    return subscribeToUser(setUser);
  }, []);

  if (user === undefined) {
    return <Loading />;
  }

  if (user) {
    return <Dashboard user={user} />;
  }

  return <Login user={user} />;
};

export default App;
