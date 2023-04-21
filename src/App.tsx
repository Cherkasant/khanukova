import './App.css';
import { Provider } from 'react-redux';

import { ConfigProvider, ThemeConfig } from 'antd';

import Router from './Pages/Router';
import { store } from './Redux/store';

const theme: ThemeConfig = {
  components: {
    Checkbox: {
      controlInteractiveSize: 18,
      borderRadiusSM: 3,
      colorBorder: '#9BACC9',
      colorPrimary: '#1258CA',
      colorWhite: '#fff',
      colorPrimaryHover: '#1258CA',
      colorPrimaryBorder: '#1258CA',
      colorBgContainerDisabled: '#D9E1F0'
    }
  }
};
function App() {
  return (
    <div className="App">
      <Router />
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
