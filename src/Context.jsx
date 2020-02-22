import React, { createContext, useState } from "react";

// Provider and Consumer are connected through their "parent" context
const context = createContext();

// Provider will be exported wrapped in ConfigProvider component.
function ContextProvider(props) {
  const [profile, setProfile] = useState({});
  return (
    <context.Provider
      value={{
        profile: profile,
        setProfile: setProfile
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export { ContextProvider };
export default context;