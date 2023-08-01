import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './store/configureStore';
import { HistoryRouter } from './HistoryRouter';
import { PersistGate } from "redux-persist/integration/react"
import { createBrowserHistory } from "history"
import { ConfigProvider } from 'antd';
import defaultTheme from "./constants/theme.json"



const root = ReactDOM.createRoot(document.getElementById('root'));
export const history = createBrowserHistory()


root.render(
  <Suspense fallback={<></>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HistoryRouter history={history}>
          <ConfigProvider theme={defaultTheme}>
            <App />
          </ConfigProvider>
        </HistoryRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);

