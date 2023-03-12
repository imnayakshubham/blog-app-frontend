import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from './Context/Store';
import { CloseButton } from './Widget';

export default function Header(props) {
  const { dispatch } = useContext(store);

  return (
    <Container className='header__container'>
      <h3>Accessibility Settings</h3>
      <CloseButton onClick={() => dispatch({ type: 'CLOSE_WIDGET' })} />
    </Container>
  );
}

const Container = styled.div`
  h3 {
    color: white;
    padding: 20px 30px;
    margin: 0rem;
    text-align: center;
  }
`;
