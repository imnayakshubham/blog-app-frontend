import React, { useContext } from 'react';
import { store } from '../Context/Store';
import SettingsBox from './SettingsBox';
import { Select } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  .Dropdown-control {
    background-color: transparent;
    color: white;
    width: fit-content;
    font-size: 14px;

    .Dropdown-placeholder {
      text-transform: capitalize !important;
    }
  }
  .Dropdown-option {
    text-transform: capitalize !important;
  }
`;

export default function TextCase() {
  const { globalState, dispatch } = useContext(store);
  const options = ['uppercase', 'lowercase', 'capitalize', 'initial'];

  return (
    <SettingsBox title={'Text Case'}>
      <Container>
        <Select
          style={{ width: 150 }}
          showSearch
          dropdownStyle={{ zIndex: 20 }}
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
          onChange={(e) => dispatch({ type: 'SET_TEXT_CASE', data: e.value })}
          value={globalState.textCase}
          placeholder='Select an option'
        />
      </Container>
    </SettingsBox>
  );
}
