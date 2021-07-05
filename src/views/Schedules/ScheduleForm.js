import React from 'react'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';

import GeolocationSelect from "../../components/GeolocationSelect/GeolocationSelect"

import {
    saveSchedule
} from "../../store/schedule-action.js"

import * as componentsPaths from "constants/ComponentsPaths";

const getRunFrequency = () => ([
    { id: 'MINUTE_TIMER', title: 'Minute Timer' },
    { id: 'HOUR_TIMER', title: 'Hour Timer' },
    { id: 'WEEK_TIMER', title: 'Week Timer' }
])

const minuteTimer = [
    'Every 5 Minutes',
    'Every 10 Minutes',
    'Every 15 Minutes',
    'Every 30 Minutes',
    'Every 45 Minutes'];

const getMinuteTimer = () => (
    minuteTimer.map(minute => {
        return {
            id: minute,
            title: minute
        }
    })
)

const hourTimer = [
    'Every Hour',
    'Every 2 Hours',
    'Every 3 Hours',
    'Every 4 Hours',
    'Every 6 Hours',
    'Every 12 Hours'
];

const getHourTimer = () => (
    hourTimer.map(hour => {
        return {
            id: hour,
            title: hour
        }
    })
)

const weekTimer = [
    'Every Day',
    'Every Weekday (Monday-Friday)',
    'Every Weekend (Saturday-Sunday)',
    'Every Monday',
    'Every Tuesday',
    'Every Wednesday',
    'Every Thursday',
    'Every Friday',
    'Every Saturday',
    'Every Sunday'
];

const getWeekTimer = () => (
    weekTimer.map(week => {
        return {
            id: week,
            title: week
        }
    })
)

const time = [
    '12 AM',
    '01 AM',
    '02 AM',
    '03 AM',
    '04 AM',
    '05 AM',
    '06 AM',
    '07 AM',
    '08 AM',
    '09 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '01 PM',
    '02 PM',
    '03 PM',
    '04 PM',
    '05 PM',
    '06 PM',
    '07 PM',
    '08 PM',
    '09 PM',
    '10 PM',
    '11 PM'
]

const getTime = () => (
    time.map(time => {
        return {
            id: time,
            title: time
        }
    })
)


function FormRow(props) {
    return (
        <Grid container item xs={12} spacing={3}>
            {props.row}
        </Grid>
    );
}

function ScheduleForm({ scheduleHelper, executionHelper, httpCallResult, saveSchedule }) {

    const history = useHistory();

    const addEmail = (event) => {
        const { value } = event.target

        if (!value || value === '') {
            return;
        }

        let newEmails = values.emails.concat(value);
        setValues({
            ...values,
            currentEmail: '',
            emails: newEmails
        })

    }

    const isEmailValid = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailInputChange = (event, email, index) => {
        const { value } = event.target

        let newEmails;
        if (!value) {
            newEmails = values.emails.filter((el) => el !== email);
        } else {
            newEmails = values.emails;
            newEmails[index] = value;
        }

        setValues({
            ...values,
            emails: newEmails
        });
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('scheduleName' in fieldValues)
            temp.scheduleName = fieldValues.scheduleName ? "" : "Schedule name can not be empty."
        if ('runFrequency' in fieldValues)
            temp.runFrequency = fieldValues.runFrequency.length !== 0 ? "" : "Run frequency should be set."

        setErrors({
            ...temp
        })

        console.log(errors)

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialFormValues = {
        region: executionHelper.defaultRegion,
        scheduleName: '',
        runFrequency: '',
        minuteTimer: minuteTimer[0],
        hourTimer: hourTimer[0],
        weekTimer: weekTimer[0],
        time: time[0],
        isReceiveEmailNotifications: false,
        currentEmail: '',
        emails: [],
        isNotFollowingRedirect: true,
        isSslValidationDisabled: true
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            saveSchedule({
                scheduleName: values.scheduleName,
                region: values.region,
                healthCheck: scheduleHelper.requestedHealthCheck,
                emails: values.emails,
                timer: {
                    type: values.runFrequency,
                    minute: values.minuteTimer,
                    hour: values.hourTimer,
                    week: values.weekTimer,
                    time: values.time
                }
            }, () => history.push(componentsPaths.VIEW_HEALTH_CHECKS))
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
                        <Grid item xs={6}>
                            <Controls.Checkbox
                                name="isReceiveEmailNotifications"
                                label="Receive email notifications for run failures and errors"
                                value={values.isReceiveEmailNotifications}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    }
                />

                {values.isReceiveEmailNotifications && values.emails.map((email, index) =>
                    <FormRow key={index}
                        row={<Grid item xs={5}>
                            <Controls.Input
                                name="emails"
                                label="Recipient email"
                                placeholder="Add another recipient email"
                                value={email}
                                onChange={(event) => handleEmailInputChange(event, email, index)}
                            />
                        </Grid>}>
                    </FormRow>
                )}
                {values.isReceiveEmailNotifications &&
                    <FormRow
                        row={<Grid item xs={5}>
                            <Controls.Input
                                name="currentEmail"
                                label="Recipient email"
                                placeholder="Add another recipient email"
                                autoComplete="none"
                                value={values.currentEmail}
                                onChange={handleInputChange}
                                onBlur={addEmail}
                            />
                        </Grid>}>
                    </FormRow>
                }


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
                            disabled={httpCallResult.isCallRequested}
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

export default connect(mapStateToProps, { saveSchedule })(ScheduleForm);