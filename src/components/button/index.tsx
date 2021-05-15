import React from 'react';
import Button from '@material-ui/core/Button';

type PropsType = {
  onClick: () => void;
  value: string;
};

const ButtonComponent: React.FC<PropsType> = ({ onClick, value }) => (
  <Button type="submit" onClick={onClick} variant="contained" color="primary">
    {value}
  </Button>
);

export default ButtonComponent;
