/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Dayjs } from 'dayjs';
import accounts from '../../data/accounts.json'
import repeat from '../../data/repeat.json'
import payee from '../../data/payee.json'


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        placeholder='0'
        prefix="$"
      />
    );
  },
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MAX_NOTE_LENGTH = 31

const Form = ({ form, setForms }: any) => {

  const [values, setValues] = useState(form);  
  const [lastPay, setLastPay] = useState('');  
  const [date, setDate] = useState<Dayjs | null>();  
  const [errors, setSetError] = useState([] as string[] | never);  

  const addYear = (date: string) => {
    const currentDate = new Date(Date.parse(date));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${month} ${day}, ${year}`
  }
  
  useEffect(() => {    
    setForms((prevForms: any) => prevForms.map((prevForm: any) => {
      if (prevForm.id === form.id) {
        prevForm.date = date
      }
      return prevForm
    }))
  }, [date])
  
  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setSetError((prev: string[]) => prev.filter((error: string) => error !== event.target.name))
  };

  const onSave = (event: any) => {
    setForms((prevForms: any) => prevForms.map((prevForm: any) => prevForm.id === form.id ? values : prevForm))
    if (event.target.value === '') setSetError((prev: string[]) => prev.includes(event.target.name) ? prev :[...prev, event.target.name])
  }
  
  const onDelete = () => {
    setForms((prevForms: any) => prevForms.filter((prevForm: any) => prevForm.id !== form.id))
  }

  return (
    <Item>
      
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Grid columns={16} container spacing={2}>

          <Grid xs={16}>
            <Box sx={{ mb: 6 }}>
              <Typography>Amount</Typography>
              <TextField
                error={errors.includes('amount')}
                value={values.amount}
                onChange={handleChange}
                name="amount"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                sx={{
                  "& fieldset": { border: 'none' },
                }}
                inputProps={{
                  style: { textAlign: 'center', color: errors.includes('amount') ? '#eb0014' : '#4d7cc7', fontSize: '32px', width: 'fit-content' },
                  maxLength: 9
                }}
                onBlur={onSave}
              />
            </Box>
          </Grid>
          
          <Grid xs={8}>
            <FormControl fullWidth>
              <InputLabel id="from-account">From Account</InputLabel>
              <Select
                labelId="from-account"
                name="account"
                error={errors.includes('account')}
                value={values.account}
                label="From Account"
                onChange={handleChange}
                onBlur={onSave}
              >
                {
                  accounts.map((account, i) => <MenuItem value={account.amount} key={i}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: 600}}>
                      <span>My {account.name} account</span>
                      <span>${account.amount}</span>
                    </Box>
                  </MenuItem>)
                }
              </Select>
            </FormControl>
          </Grid>


          <Grid xs={8}>
            <FormControl fullWidth>
              <InputLabel id="payee">Payee</InputLabel>
              <Select
                labelId="payee"
                name="payee"
                error={errors.includes('payee')}
                value={values.payee}
                label="Payee"
                onChange={handleChange}
                onBlur={onSave}
              >
                {
                  payee.map((pay, i) => (
                    <MenuItem
                      value={pay.name}
                      onClick={() => setLastPay(pay.lastPay)}
                      key={i}
                    >
                      <Typography textAlign='start' fontWeight={600}>{pay.name}</Typography>
                    </MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>{lastPay}</FormHelperText>
            </FormControl>
          </Grid>


          <Grid xs={4}>
            <DatePicker
              value={date}
              onChange={setDate}
              disablePast
            />
          </Grid>


          <Grid xs={6}>
            <FormControl fullWidth>
              <InputLabel id="repeat">Repeat</InputLabel>
              <Select
                labelId="repeat"
                name="repeat"
                error={errors.includes('repeat')}
                value={values.repeat}
                label="Repeat"
                onChange={handleChange}
                onBlur={onSave}
                disabled={!values.date}
              >
                {
                  repeat.map((month, i) => <MenuItem value={month} key={i}>
                    <Typography textAlign='start'>Every {month} Month, Until {addYear(values.date?.$d)}</Typography>
                  </MenuItem>)
                }
              </Select>
              {!values.date && <FormHelperText>First select a date</FormHelperText>}
            </FormControl>
          </Grid>


          <Grid xs={6}>
            <TextField
              label="Note"
              name="note"
              fullWidth
              error={errors.includes('note')}
              value={values.note}
              onChange={handleChange}
              onBlur={onSave}
              inputProps={{ maxLength: MAX_NOTE_LENGTH }}
              helperText={`${values.note.length}/${MAX_NOTE_LENGTH}`}
            />
          </Grid>

        </Grid>

        <CancelRoundedIcon
          sx={{ position: 'absolute', top: 6, right: 0, cursor: 'pointer', transition: 'all ease 500', ":hover": { color: 'red' } }}
          onClick={onDelete}
        />
      </Box>
    </Item>
  )
}

export default Form