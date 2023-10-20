import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FormLayout = ({children}: { children: ReactNode }) => {
  return <StyledPaper> 
    {children}
  </StyledPaper>;
}

export default FormLayout;