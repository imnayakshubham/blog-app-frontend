// store.js
import React, { createContext, useReducer, useEffect } from 'react';
import { createStyles } from '../helpers/createStyles';
import { reducer } from "./reducer"
import { initialAccessibiltyState } from './initialState';

const store = createContext(initialAccessibiltyState);
const { Provider } = store;

const ContextProvider = ({ children }) => {
  // all states are here and have their own reducer which allows multiple functions
  const [globalState, dispatch] = useReducer(reducer, initialAccessibiltyState);

  useEffect(() => {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style id="react-accessibility-styles"></style>`
    );
  }, []);

  useEffect(() => {
    document.getElementById('react-accessibility-styles').innerHTML =
      createStyles(globalState);

    return () => { };
  }, [globalState]);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, ContextProvider };
