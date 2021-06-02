import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type PropsType = {
    id: string;
    name: string;
    value: string;
    placeholder: string;
    error: boolean | undefined;
    onChange: (e: ChangeEvent) => void;
};

const InputComponent: React.FC<PropsType> = ({
    value,
    name,
    onChange,
    placeholder,
    error,
}) => (
    <TextField
        id="outlined-basic"
        name={name}
        label={placeholder}
        variant="outlined"
        size="medium"
        type="text"
        value={value}
        onChange={onChange}
        error={error}
    />
);

export default InputComponent;
