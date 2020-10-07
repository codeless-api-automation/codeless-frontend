import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

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

export default function Execution() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                <div>
                    <AntTabs value={value} onChange={handleChange}>
                        <AntTab label="Summary" />
                        <AntTab label="Logs" />
                    </AntTabs>
                </div>
            </GridItem>
        </GridContainer>
    );
}
