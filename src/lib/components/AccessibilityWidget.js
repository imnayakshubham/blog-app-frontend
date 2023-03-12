import React from 'react';
import Widget from './Widget';
import { ContextProvider } from './Context/Store';
export default function AccessibilityWidget(props) {
  return (
    <ContextProvider>
      <Widget props={props} />
    </ContextProvider>
  );
}
