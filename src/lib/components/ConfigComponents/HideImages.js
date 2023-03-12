import React, { useContext } from 'react';
import Toggle from './Toggle';
import { store } from '../Context/Store';
import SettingsBox from './SettingsBox';

export default function HideImages() {
  const { globalState, dispatch } = useContext(store);

  return (
    <SettingsBox title={'Hide Images'}>
      <Toggle
        onChange={() =>
          dispatch({
            type: globalState.hideImages ? 'UNHIDE_IMAGES' : 'HIDE_IMAGES',
          })
        }
        checked={globalState.hideImages}
      />
    </SettingsBox>
  );
}
