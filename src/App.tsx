import React from "react";
import "./App.css";
import Router from "./Pages/Router";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Router />
      {/*<Header />*/}
      {/*<UserMenu />*/}
      {/*<Button title={"Login"} type={ButtonTypes.TextButton}/>*/}
      {/*<Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />*/}
      {/*<Button title={"Login"} type={ButtonTypes.TextButton} disabled={true}/>*/}
    </div>
  );
}

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
