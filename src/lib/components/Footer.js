import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from './Context/Store';

export default function Footer({ setStyleSettings }) {
  const { globalState, dispatch } = useContext(store);
  return (
    <Container className='footer__options'>
      <Button
        onClick={() =>
          dispatch({
            type: 'RESET_SETTINGS',
          })
        }
      >
        Reset Settings
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 0.25rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  border-radius: 10px;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 13px;
  float:right;
  cursor:pointer
`;
