import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type PropsType = {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputComponent: React.FC<PropsType> = ({
  value,
  onChange,
  placeholder,
}) => (
  <TextField
    id="outlined-basic"
    label={placeholder}
    variant="outlined"
    size="medium"
    type="text"
    value={value}
    onChange={onChange}
  />
);

export default InputComponent;
