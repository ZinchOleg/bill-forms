import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { v4 as uuid } from 'uuid';
import { FormsData } from '../types/formsTypes';

type Props = {
  text: string, 
  generalError: boolean,
  setForms: React.Dispatch<React.SetStateAction<FormsData>>
}

const AddBillButton = ({text, generalError, setForms}: Props) => {

  const handleAddBill = () => {
    setForms(prev => [...prev, {
      id: uuid(),
      amount: '',
      account: '',
      payee: '',
      date:'',
      repeat: '',
      note: '',
    }])
  }
  
  return (
    <Button
      variant="outlined"
      startIcon={<AddRoundedIcon />}
      sx={{ width: 200, textAlign: 'center' }}
      disabled={generalError}
      onClick={handleAddBill}
    >
      {text}
    </Button>
  )
}

export default AddBillButton