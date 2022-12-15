import React, { useState } from "react";
import "./App.css";
import Button, { ButtonTypes } from "./Components/Button";
import { GoogleIcon } from "./Assets/icons/GoogleIcon";
import { LinkedinIcon } from "./Assets/icons/LinkedinIcon";
import Role from "./Components/Role";
import SignIn from "./Pages/SignIn";

import Input from "./Components/Input";
import onChangeInput from "./Components/Input";
import InputProps from "./Components/Input";
import { ProjectsIcon } from "./Assets/icons/ProjectsIcon";


function App() {
  const [inputValue, setInputValue] = useState(" ");
  const onChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <div className="App">
      <Role name={"Test"} />

      <Input value={inputValue} onChange={onChange}></Input>

      <Button title={"Login"} type={ButtonTypes.TextButton}/>
      <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
      <Button title={"Login"} type={ButtonTypes.TextButton} disabled={true}/>
      <ProjectsIcon />
      <SignIn></SignIn>

    </div>
  );
}

export default App;
