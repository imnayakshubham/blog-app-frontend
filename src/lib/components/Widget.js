import React, { useContext } from 'react';
import AccessibilityIcon from './assets/AccessibilityIcon.js';
import { CloseIcon } from './assets/CloseIcon';
import Header from './Header';
import StyleSettings from './StyleSettings.js';
import Footer from './Footer.js';
import './Widget.css';
import { store } from './Context/Store';
import styled from 'styled-components';

export default function Widget({ props }) {
  const { globalState, dispatch } = useContext(store);

  return (
    <Container>
      <InnerContainer>
        <Button onClick={() => dispatch({ type: 'OPEN_WIDGET' })} className="open__options">
          <AccessibilityIcon />
        </Button>
        {globalState.widgetOpen && (
          <WidgetContainer className='options__container'>
            <Header props={props} />
            <WidgetBox>
              <StyleSettings />
            </WidgetBox>
            <Footer />
          </WidgetContainer>
        )}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const InnerContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Button = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #000;
  color: white;
  padding: 10px;
  border-radius: 500px;
  border: solid 2px white;
  z-index: 9998;
  img {
    max-width: 60px;
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: calc(100% - 25px);
  max-height: 450px;
  max-width: 380px;
  min-height: 300px;
  min-width: 280px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 10px;
`;

export const CloseButton = styled(CloseIcon)`
  height: 30px;
  width: 30px;
  cursor: pointer;
  color:#fff
`;

const WidgetBox = styled.div`
  // background-color: #202020;
  width: 100%;
  height: 420px;
  overflow-y: scroll;
  overflow-x: hidden;
  color: white;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #2b2a2a;
    border-radius: 0px 10px 10px 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
