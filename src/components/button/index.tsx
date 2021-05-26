import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';

type PropsType = {
  onClick: (arg0: any) => void,
  value: string,
};

const ButtonComponent: React.FC<PropsType> = ({ onClick, value }) => (
  <Button type="submit" onClick={onClick} variant="contained" color="primary" value={value}>
    {value}
  </Button>
);

export default ButtonComponent;
