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

import CopyToClipboardButton from 'components/CopyToClipboardButton/CopyToClipboardButton';

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
    display: 'block'
  },
}))(AccordionDetails);


function ResponseBody(props) {
  return (
    <>

      <div style={{ float: 'right' }}>
        <CopyToClipboardButton content={props.response} />
      </div>

      <div>
        <pre style={{
          whiteSpace: "pre-wrap"
        }}>
          <code>{props.response}</code>
        </pre>
      </div>

    </>
  );
}

function DetailsItem(props) {
  return (
    <Typography
      style={{ overflowWrap: "break-word" }}
      variant="body2">
      {props.details}
    </Typography>);
}


function Details(props) {

  let { details } = props;

  if (Array.isArray(details)) {
    return (
      <div>
        {details.map((detail, index) => (
          <DetailsItem
            key={index}
            details={detail} />
        ))}
      </div>
    );
  } else {
    return (<DetailsItem details={details} />)
  }
}

function CustomizedAccordions(props) {
  const { rows } = props;

  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const RESPONSE_BODY_LOG_ENTRY = "Response Body: ";
  const REQUEST_HEADERS_LOG_ENTRY = "Request Headers: ";
  const RESPONSE_HEADERS_LOG_ENTRY = "Response Headers: ";


  const getSummary = (row) => {
    if (row.includes(RESPONSE_BODY_LOG_ENTRY)) {
      return "Response Body"
    }

    if (row.includes(REQUEST_HEADERS_LOG_ENTRY)) {
      return "Request Headers"
    }

    if (row.includes(RESPONSE_HEADERS_LOG_ENTRY)) {
      return "Response Headers"
    }

    return row;
  }


  const getDetails = (row) => {
    if (row.includes(RESPONSE_BODY_LOG_ENTRY)) {
      return row.split(RESPONSE_BODY_LOG_ENTRY)[1];
    }

    if (row.includes(REQUEST_HEADERS_LOG_ENTRY)) {
      return row.split(REQUEST_HEADERS_LOG_ENTRY)[1].split("\r\n");
    }

    if (row.includes(RESPONSE_HEADERS_LOG_ENTRY)) {
      return row.split(RESPONSE_HEADERS_LOG_ENTRY)[1].split("\r\n");
    }
  }

  const isDetailsEnabled = (row) => {
    return row.includes(RESPONSE_BODY_LOG_ENTRY) || row.includes(REQUEST_HEADERS_LOG_ENTRY) || row.includes(RESPONSE_HEADERS_LOG_ENTRY);
  }

  const isResponseBody = (row) => {
    return row.includes(RESPONSE_BODY_LOG_ENTRY)
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
              {isResponseBody(row)
                ? <ResponseBody
                  response={getDetails(row)}
                />
                : <Details
                  details={getDetails(row)}
                />
              }
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
            <AntTab label="Logs" />
          </AntTabs>
        </div>
      </GridItem>

      {value === 0 &&
        <GridItem xs={12}>
          <div>
            <CustomizedAccordions
              rows={executionResult['result'].logs}
            />
          </div>
        </GridItem>
      }

    </GridContainer>
  );
}
const mapStateToProps = state => ({
  executionResult: state.executionHelper["executionResult"],
  httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, {})(Execution);
