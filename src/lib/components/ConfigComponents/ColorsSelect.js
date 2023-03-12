import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from '../Context/Store';
import { availableColors } from '../variables/constants';

export default function ColorsSelect({ value, onChange, colors }) {
  const { globalState } = useContext(store);

  const filterbyValue = [globalState.fontColor, globalState.titleBackgroundColor, globalState.titleColor]

  const renderColors = () => {
    return (
      <>
        {availableColors.filter((color) => !filterbyValue.includes(color) || globalState.fontColor === "black").map((color) => {
          const activeStyles = value === color ? { borderColor: 'purple' } : {};

          return (
            <ColorContainer
              className='btn__cursor__pointer'
              style={{ backgroundColor: color, ...activeStyles }}
              onClick={() => onChange(color)}
            />
          );
        })}
      </>
    );
  };

  return <ColorsContainer>{renderColors()}</ColorsContainer>;
}

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColorContainer = styled.div`
  border-radius: 100px;
  width: 20px;
  height: 20px;
  position: relative;
  margin: 6px;
  ::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: solid 2px;
    border-color: inherit;
    height: 23px;
    width: 23px;
    border-radius: 100px;
  }
  :hover {
    opacity: 0.7;
  }
`;
