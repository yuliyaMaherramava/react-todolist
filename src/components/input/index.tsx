import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

const InputComponent: React.FC<TextFieldProps> = ({
    value,
    name,
    onChange,
    onBlur,
    placeholder,
    error,
    helperText,
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
        helperText={helperText}
    />
);

export default React.memo(InputComponent);
