import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AntTabs = withStyles({
    indicator: {
        backgroundColor: '#3f51b5',
    }
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        opacity: 1,
        color: 'black',
        '&$selected': {
            color: 'black',
            fontWeight: theme.typography.fontWeightMedium,
        }
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    }
}));

export default function Execution() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div>
                <AntTabs value={value} onChange={handleChange}>
                    <AntTab label="Summary" />
                    <AntTab label="Logs" />
                </AntTabs>
            </div>
        </div>
    );
}
