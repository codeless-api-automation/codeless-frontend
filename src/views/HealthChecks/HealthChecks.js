import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";

import _ from 'lodash'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Box,
  Paper,
  Link
} from '@material-ui/core';

import * as componentsPaths from "constants/ComponentsPaths";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Filter from './Filter';
import SimpleTable from './SimpleTable';

import { Alert, AlertTitle } from '@material-ui/lab';

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  alertArea: {
    marginTop: '16px'
  }
}));

function HealthChecks({ healthChecks }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Health Checks" {...a11yProps(0)} />
              <Tab label="Executions" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {!_.isEmpty(healthChecks) &&
              <div>
                <Filter />
                <SimpleTable rows={healthChecks} />
              </div>
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
          </TabPanel>
        </div>
      </GridItem>

      {_.isEmpty(healthChecks) && value === 0 &&
        <GridItem>
          <div className={classes.alertArea}>
            <Paper elevation={3} square>
              <Alert severity="warning">
                <AlertTitle>This is no created health check, yet!</AlertTitle>
                <AlertTitle>You can <Link component={RouterLink} to={componentsPaths.CREATE_HEALTH_CHECK}>create health check</Link>
                </AlertTitle>
              </Alert>
            </Paper>
          </div>
        </GridItem>}

    </GridContainer>
  );
}

const mapStateToProps = state => ({
  healthChecks: state.healthChecksPage
});
export default connect(mapStateToProps, {})(HealthChecks);
