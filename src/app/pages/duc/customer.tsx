import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import TextField from "../../components/text_field";
import {customers} from "../../global/customer_list";

const useStyles = makeStyles({
  paper: {
    minHeight: "100px",
    width: "100%",
    textAlign: "center",
    "&.small": {
      minHeight: "30px",
    },
  },
  box: {
    margin: "40px",
  },
});

export const Customer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [parameter, setParameter] = useState("first");

  function searchCustomer() {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i][parameter] == search) {
        const customer = customers[i];
        let alertMessage = "Name: " + customer["first"] + " " + customer["last"] + "\n";
        alertMessage += "ID#: " + customer["id"] + "\n";
        alertMessage += "Phone: " + customer["phone"] + "\n";
        alertMessage += "Email: " + customer["email"] + "\n";
        alertMessage += "Address: " + customer["address"] + " " + customer["state"] + "\n";
        alertMessage += "License plate: " + customer["licensePlate"] + "\n";
        alert(alertMessage);
      }
    }
  }

  function onSelectParameter(event) {
    setParameter(event.target.value);
  }

  return (
    <Box className={classes.box}>
      <TextField value={search} onChange={setSearch}></TextField>
      <Button variant="outlined" onClick={searchCustomer}>
        Confirm
      </Button>
      <Box className={classes.box}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Search</FormLabel>
          <RadioGroup row aria-label="search" name="row-radio-buttons-group" defaultValue={parameter}>
            <FormControlLabel value="first" control={<Radio />} onChange={onSelectParameter} label="First Name" />
            <FormControlLabel value="last" control={<Radio />} onChange={onSelectParameter} label="Last Name" />
            <FormControlLabel value="phone" control={<Radio />} onChange={onSelectParameter} label="Phone" />
            <FormControlLabel value="id" control={<Radio />} onChange={onSelectParameter} label="ID #" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};
