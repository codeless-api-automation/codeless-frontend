import React from 'react';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import { createStyles, withStyles } from "@material-ui/core/styles";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Typography,
    Divider,
    Paper
} from '@material-ui/core';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import {
    updateName,
    updateHttpMethod,
    updateRequestUrl,
    updateRequestBody,
    cleanAllTestAttributes,
    addHeader,
    removeHeader,
    updateHeader
} from "../../store/test-action.js"

import ComboBox from "components/Combobox/Combobox.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import HeaderList from "features/headers/HeaderList.js";
import ValidatorList from "features/validators/ValidatorList.js";
import ExtractorList from 'features/extractors/ExtractorList.js';



const Row = withStyles(() =>
    createStyles({
        root: {
            margin: "5px 0px",
            flexDirection: "row"
        }
    })
)(Grid);

const RowItem = withStyles(() =>
    createStyles({
        root: {
            margin: "1px"
        }
    })
)(Grid);

function AddHttpRequestDialog({
    addHttpRequest,
    setOpen,
    open,
    test,
    updateName,
    updateHttpMethod,
    updateRequestUrl,
    updateRequestBody,
    addHeader,
    removeHeader,
    updateHeader,
    cleanAllTestAttributes }) {

    const { resetField, register, formState: { errors } } = useForm(
        {
            mode: "all"
        }
    );

    const handleAdd = () => {
        addHttpRequest(test)
        setOpen(false)
        cleanAllTestAttributes()
        resetField("stepName")
        resetField("url")
    };

    const handleClose = () => {
        setOpen(false)
        cleanAllTestAttributes()
        resetField("stepName")
        resetField("url")
    };

    const isSaveButtonDisabled = (test) => {
        return test.requestURL.length === 0 || test.name.length === 0
    }

    console.log(errors)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: "#eeeeee",
                    minHeight: '90%',
                    maxHeight: '90%',
                    minWidth: '90%',
                    maxWidth: '90%'
                }
            }}
        >
            <DialogTitle>
                <Typography variant="body1">HTTP request details</Typography>
                <Typography variant="overline">Input your HTTP request details.</Typography>
                <Divider />
            </DialogTitle>
            <DialogContent>
                <GridContainer>
                    <GridItem xs={12}>
                        <Paper variant='outlined'>
                            <div style={{ padding: 15 }}>
                                <Row container>
                                    <RowItem item xs>
                                        <TextField
                                            required
                                            name="stepName"
                                            variant="outlined"
                                            placeholder="Name"
                                            fullWidth={true}
                                            inputProps={{
                                                onChange: event => updateName(event.target.value),
                                                defaultValue: test.name
                                            }}
                                            {...register("stepName", {
                                                required: "Step name is required"
                                            })}
                                            error={!!errors.stepName}
                                            helperText={errors.stepName ? errors.stepName.message : "Enter the step name"}
                                        />
                                    </RowItem>
                                </Row>

                                <Row container >
                                    <RowItem item>
                                        <ComboBox
                                            value={test.httpMethod}
                                            options={["GET", "POST", "PUT", "DELETE"]}
                                            onChange={newValue => updateHttpMethod(newValue)}
                                            renderInput={{
                                                variant: "outlined",
                                                helperText: "Enter HTTP method"
                                            }}
                                            style={{ width: 160 }}
                                        />
                                    </RowItem>
                                    <RowItem item xs>
                                        <TextField
                                            required
                                            name="url"
                                            variant="outlined"
                                            placeholder="https://myurlname.com"
                                            fullWidth={true}
                                            inputProps={{
                                                defaultValue: test.requestURL,
                                                onChange: event => updateRequestUrl(event.target.value)
                                            }}
                                            {...register("url", {
                                                required: "API or URL is required",
                                            })}
                                            error={!!errors.url}
                                            helperText={errors.url ? errors.url.message : "Enter the endpoint, API or URL that you are testing"}
                                        />
                                    </RowItem>
                                </Row>
                            </div>
                        </Paper>
                        <Grid container direction="row">
                            <CustomTabs
                                title=""
                                headerColor="primary"
                                tabs={[
                                    {
                                        tabName: "Headers",
                                        tabContent: <HeaderList
                                            headers={test.headers}
                                            addHeader={addHeader}
                                            removeHeader={removeHeader}
                                            updateHeader={updateHeader} />
                                    },
                                    {
                                        tabName: "Body",
                                        tabContent: <TextField
                                            variant="outlined"
                                            fullWidth={true}
                                            multiline={true}
                                            placeholder="Enter request body"
                                            inputProps={{
                                                defaultValue: test.requestBody,
                                                onBlur: event => updateRequestBody(event.target.value)
                                            }} />
                                    },
                                    {
                                        tabName: "Verifications",
                                        tabContent: <ValidatorList validators={test.validators} />
                                    },
                                    {
                                        tabName: "Extractors",
                                        tabContent: <ExtractorList extractors={test.extractors} />
                                    }
                                ]}
                            />
                        </Grid>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    disabled={Object.keys(errors).length > 0 || isSaveButtonDisabled(test)}
                    variant="contained"
                    onClick={handleAdd}
                    color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => ({
    test: state.testPage,
    httpCallResult: state.httpCallResult,
});
export default connect(mapStateToProps, {
    updateName,
    updateHttpMethod,
    updateRequestUrl,
    updateRequestBody,
    cleanAllTestAttributes,
    addHeader,
    removeHeader,
    updateHeader
})(AddHttpRequestDialog);