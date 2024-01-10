import React from "react";
import Routers from "./Routers";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <>
      <UserProvider >
        <Routers />
      </UserProvider>
    </>
  );
}

export default App;
