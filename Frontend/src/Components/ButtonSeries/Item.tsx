import Button, { ButtonProps } from '@mui/material/Button';

export function Item(props: ButtonProps) {
    const { sx, ...other } = props;
    return (
      <Button
        variant="contained"
        sx={{
          m: 1,
          // backgroundColor: "transparent",
          borderRadius: 2,
          boxShadow: 'none',
          width: '25%',
          ...sx,
        }}
        {...other}
      />
    );
  }