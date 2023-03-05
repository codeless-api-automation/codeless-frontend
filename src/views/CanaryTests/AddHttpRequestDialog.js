import React from 'react';
import { connect } from "react-redux";

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

    const handleAdd = () => {
        addHttpRequest(test)
        setOpen(false)
        cleanAllTestAttributes()
    };

    const handleClose = () => {
        setOpen(false)
        cleanAllTestAttributes()
    };

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
                                            variant="outlined"
                                            placeholder="Name"
                                            helperText="Enter the step name"
                                            fullWidth={true}
                                            inputProps={{
                                                defaultValue: test.name,
                                                onBlur: event => updateName(event.target.value)
                                            }}
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
                                            variant="outlined"
                                            placeholder="https://myurlname.com"
                                            helperText="Enter the endpoint, API or URL that you are testing"
                                            fullWidth={true}
                                            inputProps={{
                                                defaultValue: test.requestURL,
                                                onBlur: event => updateRequestUrl(event.target.value)
                                            }}
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