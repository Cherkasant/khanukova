import React from "react";
import "./App.css";
import Button, { ButtonTypes } from "./Components/Button";
import { GoogleIcon } from "./Assets/icons/GoogleIcon";
import { LinkedinIcon } from "./Assets/icons/LinkedinIcon";
import Role from "./Components/Role";
import { ProjectsIcon } from "./Assets/icons/ProjectsIcon";

function App() {
  return (
    <div className="App">
      <Role name={"Test"} />
      <Button title={"Login"} type={ButtonTypes.TextButton}/>
      <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
      <Button title={"Login"} type={ButtonTypes.TextButton} disabled={true}/>
      <ProjectsIcon />
    </div>
  );
}

export default App;
