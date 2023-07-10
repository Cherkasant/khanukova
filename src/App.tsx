import './App.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider, ThemeConfig } from 'antd';

import Router from './Pages/Router';
import { store } from './Redux/store';

import 'react-toastify/dist/ReactToastify.css';

const theme: ThemeConfig = {
  components: {
    Checkbox: {
      controlInteractiveSize: 18,
      borderRadiusSM: 3,
      colorBorder: '#9BACC9',
      colorPrimary: '#fff',
      colorWhite: '#1258CA',
      colorPrimaryHover: 'rgba(18, 88, 202, 0.5)',
      colorPrimaryBorder: '#ff0000'
    }
  }
};
function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer position="bottom-right" autoClose={7000} />
    </div>
  );
}

const AppWithStore = () => {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  );
};

export default AppWithStore;
