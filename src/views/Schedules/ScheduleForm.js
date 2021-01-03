import React from 'react'
import { connect } from "react-redux";

import { Grid, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';

import GeolocationSelect from "../../components/GeolocationSelect/GeolocationSelect"

import {
    runSchedule
} from "../../store/schedule-action.js"


const getRunFrequency = () => ([
    { id: 'MINUTE_TIMER', title: 'Minute Timer' },
    { id: 'HOUR_TIMER', title: 'Hour Timer' },
    { id: 'WEEK_TIMER', title: 'Week Timer' }
])

const getMinuteTimer = () => ([
    { id: '*/5', title: 'Every 5 Minutes' },
    { id: '*/10', title: 'Every 10 Minutes' },
    { id: '*/15', title: 'Every 15 Minutes' },
    { id: '*/30', title: 'Every 30 Minutes' },
    { id: '*/45', title: 'Every 45 Minutes' }
])

const getHourTimer = () => ([
    { id: '*/1', title: 'Every Hour' },
    { id: '*/2', title: 'Every 2 Hours' },
    { id: '*/3', title: 'Every 3 Hours' },
    { id: '*/4', title: 'Every 4 Hours' },
    { id: '*/6', title: 'Every 6 Hours' },
    { id: '*/12', title: 'Every 12 Hours' }
])

const getWeekTimer = () => ([
    { id: '*/1', title: 'Every Day' },
    { id: 'MON-FRI', title: 'Every Weekday (Monday-Friday)' },
    { id: 'SAT,SUN', title: 'Every Weekend (Saturday-Sunday)' },
    { id: 'MON', title: 'Every Monday' },
    { id: 'TUE', title: 'Every Tuesday' },
    { id: 'WED', title: 'Every Wednesday' },
    { id: 'THU', title: 'Every Thursday' },
    { id: 'FRI', title: 'Every Friday' },
    { id: 'SAT', title: 'Every Saturday' },
    { id: 'SUN', title: 'Every Sunday' }
])

const getTime = () => ([
    { id: '00', title: '12 AM' },
    { id: '01', title: '01 AM' },
    { id: '02', title: '02 AM' },
    { id: '03', title: '03 AM' },
    { id: '04', title: '04 AM' },
    { id: '05', title: '05 AM' },
    { id: '06', title: '06 AM' },
    { id: '07', title: '07 AM' },
    { id: '08', title: '08 AM' },
    { id: '09', title: '09 AM' },
    { id: '10', title: '10 AM' },
    { id: '11', title: '11 AM' },
    { id: '12', title: '12 PM' },
    { id: '13', title: '01 PM' },
    { id: '14', title: '02 PM' },
    { id: '15', title: '03 PM' },
    { id: '16', title: '04 PM' },
    { id: '17', title: '05 PM' },
    { id: '18', title: '06 PM' },
    { id: '19', title: '07 PM' },
    { id: '20', title: '08 PM' },
    { id: '21', title: '09 PM' },
    { id: '22', title: '10 PM' },
    { id: '23', title: '11 PM' }
])


function FormRow(props) {
    return (
        <Grid container item xs={12} spacing={3}>
            {props.row}
        </Grid>
    );
}

function ScheduleForm({ scheduleHelper, executionHelper, httpCallResult, runSchedule }) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('scheduleName' in fieldValues)
            temp.scheduleName = fieldValues.scheduleName ? "" : "Schedule name can not be empty."
        if ('runFrequency' in fieldValues)
            temp.runFrequency = fieldValues.runFrequency.length !== 0 ? "" : "Run frequency should be set."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialFormValues = {
        region: executionHelper.defaultRegion,
        scheduleName: '',
        runFrequency: '',
        minuteTimer: '',
        hourTimer: '',
        weekTimer: '',
        time: '',
        isNotFollowingRedirect: true,
        isSslValidationDisabled: true
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            runSchedule({
                scheduleName: values.scheduleName,
                region: values.region,
                healthCheck: scheduleHelper.requestedHealthCheck
            })
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={1}>

                <FormRow
                    row={
                        <Grid item xs={12}>
                            <Controls.Input
                                name="scheduleName"
                                label="Schedule name"
                                value={values.scheduleName}
                                onChange={handleInputChange}
                                error={errors.scheduleName}
                            />
                        </Grid>
                    }
                />

                <FormRow
                    row={
                        <Grid item xs={12}>
                            <Controls.Input
                                name="healthCheckName"
                                label="Health check name"
                                value={scheduleHelper.requestedHealthCheck.name}
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>
                    }
                />

                <FormRow
                    row={
                        <>
                            <Grid item xs={4}>
                                <Controls.Select
                                    name="runFrequency"
                                    label="Run frequency"
                                    value={values.runFrequency}
                                    onChange={handleInputChange}
                                    options={getRunFrequency()}
                                    error={errors.runFrequency}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                {values.runFrequency === "MINUTE_TIMER" &&
                                    <Controls.Select
                                        name="minuteTimer"
                                        label="Minute Timer"
                                        value={values.minuteTimer}
                                        onChange={handleInputChange}
                                        options={getMinuteTimer()}
                                        error={errors.minuteTimer}
                                    />
                                }

                                {values.runFrequency === "HOUR_TIMER" &&
                                    <Controls.Select
                                        name="hourTimer"
                                        label="Hour Timer"
                                        value={values.hourTimer}
                                        onChange={handleInputChange}
                                        options={getHourTimer()}
                                        error={errors.hourTimer}
                                    />
                                }
                                {values.runFrequency === "WEEK_TIMER" &&
                                    <Controls.Select
                                        name="weekTimer"
                                        label="Week Timer"
                                        value={values.weekTimer}
                                        onChange={handleInputChange}
                                        options={getWeekTimer()}
                                        error={errors.weekTimer}
                                    />
                                }
                            </Grid>

                            <Grid item xs={4} >
                                {values.runFrequency === "WEEK_TIMER" &&
                                    <Controls.Select
                                        name="time"
                                        label="Time"
                                        value={values.time}
                                        onChange={handleInputChange}
                                        options={getTime()}
                                        error={errors.time}
                                    />
                                }
                            </Grid>
                        </>
                    }
                />


                <FormRow
                    row={
                        <Grid item xs={4}>
                            <GeolocationSelect
                                autocompleteParams={{
                                    fullWidth: true,
                                    name: "region"
                                }}
                                regions={executionHelper.regions}
                                regionShownByDefault={executionHelper.defaultRegion}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    }
                />


                <FormRow
                    row={
                        <Grid item xs={3}>
                            <Controls.Checkbox
                                name="isNotFollowingRedirect"
                                label="Don't follow redirect"
                                value={values.isNotFollowingRedirect}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    }
                />

                <FormRow
                    row={
                        <Grid item xs={3}>
                            <Controls.Checkbox
                                name="isSslValidationDisabled"
                                label="Disable SSL validation"
                                value={values.isSslValidationDisabled}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    }
                />

                <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                >
                    <Grid item xs={12}>
                        <Controls.Button
                            variant="outlined"
                            text="RESET"
                            onClick={resetForm} />
                        <Controls.Button
                            disabled={httpCallResult.isCallRequested}
                            type="submit"
                            text="SAVE" />
                    </Grid>
                </Grid>

            </Grid>
        </Form >
    )
}

const mapStateToProps = state => ({
    scheduleHelper: state.scheduleHelper,
    executionHelper: state.executionHelper,
    httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, { runSchedule })(ScheduleForm);
