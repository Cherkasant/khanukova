import React, { useState } from "react";
import "./App.css";
import Role from "./Components/Role";
import Input from "./Components/Input";
import onChangeInput from "./Components/Input";
import InputProps from "./Components/Input";

function App() {
  const [inputValue, setInputValue] = useState(" ");
  const onChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <div className="App">
      <Role name={"Test"} />
      <Input value={inputValue} onChange={onChange}></Input>
    </div>
  );
}

export default App;
