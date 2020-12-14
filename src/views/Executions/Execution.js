import React from 'react';
import { connect } from "react-redux";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import { withStyles } from '@material-ui/core/styles';

import {
  Tabs,
  Tab,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AntTabs = withStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  indicator: {
    backgroundColor: '#3f51b5',
  }
}))(Tabs);

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


const DecoratedAccordion = withStyles((theme) => ({
  root: {
    color: 'black',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(Accordion);

const DecoratedAccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    },
  },
  expanded: {
  },
})((props) => <AccordionSummary {...props} />);

const DecoratedAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(AccordionDetails);

function CustomizedAccordions(props) {
  const { rows } = props;

  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getSummary = (row) => {
    if (row.includes("Response Body:")) {
      return "Response Body: please expand to see the response body"
    } else {
      return row;
    }
  }

  const getDetails = (row) => {
    if (row.includes("Response Body:")) {
      return row.split('Response Body:')[1];
    }
  }

  const isDetailsEnabled = (row) => {
    return row.includes("Response Body:");
  }

  return (
    <div>
      <Paper elevation={3} >
        {rows.map((row, index) => (
          <DecoratedAccordion
            key={index}
            expanded={expanded === index && isDetailsEnabled(row)}
            onChange={handleChange(index)}>
            <DecoratedAccordionSummary expandIcon={isDetailsEnabled(row) ? <ExpandMoreIcon /> : null}>
              <Typography variant="body2">
                {getSummary(row)}
              </Typography>
            </DecoratedAccordionSummary>
            <DecoratedAccordionDetails>
              <Typography
                style={{ overflowY: 'auto' }}
                variant="body2">
                {getDetails(row)}
              </Typography>
            </DecoratedAccordionDetails>
          </DecoratedAccordion>
        ))}
      </Paper>
    </div>
  );
}

function Execution({ httpCallResult, executionResult }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (httpCallResult.isCallRequested !== false) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <CircularProgress />
      </div>)
  }

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

      <GridItem xs={12}>
        <div hidden={value !== 1}>
          <CustomizedAccordions
            rows={executionResult['result'].logs}
          />
        </div>
      </GridItem>

    </GridContainer>
  );
}
const mapStateToProps = state => ({
  executionResult: state.executionHelper["executionResult"],
  httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, {})(Execution);
