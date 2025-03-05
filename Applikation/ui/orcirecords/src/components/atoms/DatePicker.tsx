import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";

const DatePicker = (props: {
  label: string;
  value: any;
  onChange: any;
  format: string;
}) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MUIDatePicker
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          format={props.format}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default DatePicker;
