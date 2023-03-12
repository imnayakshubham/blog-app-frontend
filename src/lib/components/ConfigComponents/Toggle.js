import { Switch } from 'antd';
import React from 'react';

export default function Toggle({ onChange, checked, ...rest }) {
  return (
    <Switch
      style={{ width: 50, border: "1px solid #ccc" }}
      onChange={onChange}
      checked={checked}
      height={25}
      width={45}
      {...rest}
    />
  );
}
