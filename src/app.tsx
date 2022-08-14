import { User } from "firebase/auth";
import React from "react";

import { Suspense, useEffect, useState } from "react";
import Loading from "./components/loading";

import { subscribeToUser } from "./firebase";

const Dashboard = React.lazy(() => import("./components/dashboard"));
const Login = React.lazy(() => import("./components/login"));

const App = () => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    return subscribeToUser(setUser);
  }, []);

  if (user === undefined) {
    return <Loading />;
  }

  if (user) {
    return (
      <Suspense fallback={<Loading />}>
        <Dashboard user={user} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Login user={user} />
    </Suspense>
  );
};

export default App;
