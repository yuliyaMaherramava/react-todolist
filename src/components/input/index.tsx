import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type PropsType = {
    id: string;
    name: string;
    value: string;
    placeholder: string;
    error: boolean | undefined;
    onChange: (e: ChangeEvent) => void;
    onBlur: (e: ChangeEvent) => void;
};

const InputComponent: React.FC<PropsType> = ({
    value,
    name,
    onChange,
    onBlur,
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
        onBlur={onBlur}
        error={error}
    />
);

export default InputComponent;
