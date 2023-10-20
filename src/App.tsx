import './App.css';
import { useEffect, useState } from 'react';
import { Container, Paper, Stack } from '@mui/material';
import Form from './components/Form/Form';
import AddBillButton from './components/AddBillButton';
import { areAllFieldsEmpty } from './utils/checkEmptyFields';
import { FormsData } from './types/formsTypes';
import { formsData } from './data/formsData';

function App() {
  const [forms, setForms] = useState<FormsData>(formsData)
  const [generalError, setGeneralError] = useState(true)  

  useEffect(() => {
    if (areAllFieldsEmpty(forms)) return setGeneralError(true)
    setGeneralError(false)
  }, [forms])
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', padding: '24px' }}>
        <Stack spacing={2} alignItems={'center'}>
          {
            forms.map(form => (
              <Form
                key={form.id}
                form={form}
                setForms={setForms}
              />
            ))
          }
          {
            forms.length < 5 && (
              <AddBillButton
                text='Add Another Bill'
                generalError={generalError}
                setForms={setForms}
              />
            )
          }
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
