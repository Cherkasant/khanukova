import React from "react";
import "./App.css";

import Button, { ButtonTypes } from "./Components/Button";
import { LinkedinIcon } from "./Assets/icons/LinkedinIcon";
import Role from "./Components/Role";
import Header from "./Components/Header";
import UserMenu from "./Components/Header/Menu";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Router from "./Pages/Router";

function App() {
  return (
    <ProSidebarProvider>
      <div className="App">
      <Header />
      <UserMenu />
      <Button title={"Login"} type={ButtonTypes.TextButton}/>
      <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
      <Button title={"Login"} type={ButtonTypes.TextButton} disabled={true}/>
      </div>
      </ProSidebarProvider>

  );
}

export default App;
