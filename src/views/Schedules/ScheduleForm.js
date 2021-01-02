import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';

import GeolocationSelect from "../../components/GeolocationSelect/GeolocationSelect"

const initialFValues = {
    id: 0,
    healthCheckName: 'Verify my service',
    scheduleName: '',
    runFrequency: '',
    hourTimer: '',
    weekTimer: '',
    time: '',
    regions: [],
    defaultRegion: {},
    isNotFollowingRedirect: true,
    isSslValidationDisabled: true

}

function FormRow(props) {
    return (
        <Grid container item xs={12} spacing={3}>
            {props.row}
        </Grid>
    );
}

export default function ScheduleForm() {

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

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            //employeeService.insertEmployee(values)
            resetForm()
        }
    }

    const getRunFrequency = () => ([
        { id: '1', title: 'Minute Timer' },
        { id: '2', title: 'Hour Timer' },
        { id: '3', title: 'Week Timer' }
    ])

    const getHourTimer = () => ([
        { id: '1', title: 'Every Hour' },
        { id: '2', title: 'Every 2 Hours' },
        { id: '3', title: 'Every 3 Hours' },
        { id: '4', title: 'Every 4 Hours' },
        { id: '5', title: 'Every 6 Hours' },
        { id: '6', title: 'Every 12 Hours' }
    ])

    const getWeekTimer = () => ([
        { id: '1', title: 'Every Day' },
        { id: '2', title: 'Every Weekday (Monday-Friday)' },
        { id: '3', title: 'Every Monday' },
        { id: '4', title: 'Every Tuesday' },
        { id: '5', title: 'Every Wednesday' },
        { id: '6', title: 'Every Thursday' },
        { id: '7', title: 'Every Friday' },
        { id: '8', title: 'Every Saturday' },
        { id: '9', title: 'Every Sunday' }
    ])

    const getTime = () => ([
        { id: '1', title: '12 AM' },
        { id: '2', title: '11 AM' },
        { id: '3', title: '10 AM' },
        { id: '4', title: '09 AM' },
        { id: '5', title: '08 AM' },
        { id: '6', title: '07 AM' },
        { id: '7', title: '06 AM' },
        { id: '8', title: '05 AM' },
        { id: '9', title: '04 AM' },
        { id: '10', title: '03 AM' },
        { id: '11', title: '02 AM' },
        { id: '12', title: '01 AM' },
        { id: '13', title: '12 PM' },
        { id: '14', title: '11 PM' },
        { id: '15', title: '10 PM' },
        { id: '16', title: '09 PM' },
        { id: '17', title: '08 PM' },
        { id: '18', title: '07 PM' },
        { id: '19', title: '06 PM' },
        { id: '20', title: '05 PM' },
        { id: '21', title: '04 PM' },
        { id: '22', title: '03 PM' },
        { id: '23', title: '02 PM' },
        { id: '24', title: '01 PM' }
    ])

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
                                value={values.healthCheckName}
                                onChange={handleInputChange}
                                error={errors.healthCheckName}
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
                                {values.runFrequency === "2" &&
                                    <Controls.Select
                                        name="hourTimer"
                                        label="Hour Timer"
                                        value={values.hourTimer}
                                        onChange={handleInputChange}
                                        options={getHourTimer()}
                                        error={errors.hourTimer}
                                    />
                                }
                                {values.runFrequency === "3" &&
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
                                {values.runFrequency === "3" &&
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
                                autocompleteParams={{ fullWidth: true }}
                                regions={values.regions}
                                regionShownByDefault={values.defaultRegion}
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
                            type="submit"
                            text="SAVE" />
                    </Grid>
                </Grid>

            </Grid>
        </Form >
    )
}
