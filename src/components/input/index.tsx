import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type PropsType = {
  value: string;
  onChange: (text: string) => void;
};

const InputComponent: React.FC<PropsType> = ({ value, onChange }) => {
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Enter a task"
      variant="outlined"
      size="medium"
      type="text"
      value={value}
      onChange={onTextChange}
    />
  );
};

export default InputComponent;
