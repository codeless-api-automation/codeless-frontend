import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Input from "components/CustomInput/CustomInput.js";
import ComboBox from "components/Combobox/Combobox.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function TableList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <Grid container spacing={0} direction="column">
       <Grid item xs={12}  direction="row">
       <Input labelText="User Story ID" id="us-id"
                    formControlProps={{
                      fullWidth: false
                    }}
                  />
       <Input labelText="Test ID" id="test-id"
                    formControlProps={{
                      fullWidth: false
                    }}
                  />
       </Grid>
       <Grid item xs={6} direction="row">
        <ComboBox options={["GET", "POST", "PUT", "DELETE"]}/>
        <CustomInput
                    labelText="Entry request URL"
                    id="request"
                    formControlProps={{
                      fullWidth: false
                    }}
           />
          <Button color="primary">Send</Button>
         </Grid>
         </Grid>
     </div>
  );
}
