import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

export default function Counter({
  onMinusChange,
  onAddChange,
  value,
  minValue,
  maxValue,
}) {
  const buttonInActiveStyles = {
    opacity: '0.5',
    color: 'red',
  };
  return (
    <CounterContainer>
      <MinusButton
        className='btn__cursor__pointer'
        onClick={onMinusChange}
        style={value >= minValue ? {} : buttonInActiveStyles}
      >
        <MinusOutlined />
      </MinusButton>
      <SizeContainer>{value}%</SizeContainer>
      <PlusButton
        className='btn__cursor__pointer'

        style={value <= maxValue ? {} : buttonInActiveStyles}
        onClick={onAddChange}
      >
        <PlusOutlined />
      </PlusButton>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  border-radius: 50px;
  background: grey;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
`;
const MinusButton = styled.div`
  :hover {
    color: purple;
  }
`;
const PlusButton = styled.div`
  :hover {
    color: purple;
  }
`;

const SizeContainer = styled.div`
  padding: 0.5rem;
  background-color: purple;
  border-radius: 100px;
  box-shadow: 2px 2px 6px black;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  width: 25px;
`;
