import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './store/configureStore';
import 'antd/dist/antd.css';
import { HistoryRouter } from './HistoryRouter';
import { PersistGate } from "redux-persist/integration/react"
import { createBrowserHistory } from "history"



const root = ReactDOM.createRoot(document.getElementById('root'));
export const history = createBrowserHistory()


root.render(
  <Suspense fallback={<></>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);

