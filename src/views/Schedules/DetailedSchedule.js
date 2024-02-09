import React from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import { TimeSeries, Index } from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BarChart,
  styler
} from "react-timeseries-charts";

import {
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@material-ui/core';

import moment from "moment";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  panel: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #ccc',
    paddingBottom: theme.spacing(1),
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%', // stretch to fill all available space horizontally
  },
  value: {
    flex: 1, // make each value take up equal horizontal space
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRight: '1px solid #ccc',
  }
}));

function Metadata() {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.panel}>
      <div className={classes.header}>
        <Typography style={{ fontWeight: 'medium' }}>
          Schedule detail
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Grid container direction="column" className={classes.value}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">Schedule Name</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textPrimary">every 5 minute to test</Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" className={classes.value}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">Run Frequency</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textPrimary">Every 5 Minutes</Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" className={classes.value}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">Geolocation</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textPrimary">N. Virginia, US</Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" className={classes.value}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">State</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textPrimary">Enabled</Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

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

function DetailedSchedule({ httpCallResult, metrics }) {

  const [highlight, setHighlight] = React.useState(null);
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

  const series = new TimeSeries({
    name: "response time",
    utc: false,
    columns: ["index", "response time"],
    points: metrics.timeSeriesElements.map((point) =>
      [
        Index.getIndexString("5m", new Date(point.timestamp)),
        point.value
      ]
    )
  });

  const getMaxResponseTime = (metrics) => {
    let maxRespontTime = 0;
    metrics.forEach((point) => {
      maxRespontTime = Math.max(maxRespontTime, point.value);
    });
    return maxRespontTime;
  }

  const style = styler([
    {
      key: "response time",
      color: "#3f51b5",
      selected: "#2CB1CF"
    }
  ]);

  let infoValues = [];
  if (highlight) {
    const responseTime = highlight.event.get(highlight.column);
    infoValues = [{ label: "time", value: `${responseTime} ms` }];
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Metadata />
      </GridItem>

      <GridItem xs={12}>
        <div>
          <AntTabs value={value} onChange={handleChange}>
            <AntTab label="Metrics" />
            <AntTab label="Executions History" />
          </AntTabs>
        </div>
      </GridItem>

      {value === 0 && (metrics.timeSeriesElements !== undefined && metrics.timeSeriesElements.length !== 0) &&
        <GridItem xs={12}>
          <Paper elevation={3} >
            <Resizable>
              <ChartContainer timeRange={series.range()}>
                <ChartRow
                  titleHeight={20}
                  height="200"
                  title="">
                  <YAxis
                    id="response time"
                    label="Response Time (ms)"
                    min={0}
                    max={getMaxResponseTime(metrics.timeSeriesElements)}
                    width="60"
                    type="linear"
                  />
                  <Charts>
                    <BarChart
                      axis="response time"
                      style={style}
                      spacing={1}
                      columns={["response time"]}
                      series={series}
                      minBarHeight={3}
                      infoTimeFormat={index => moment(index.begin()).format("Do MMM 'YY")}
                      info={infoValues}
                      highlighted={highlight}
                      onHighlightChange={highlight =>
                        setHighlight(highlight)
                      }
                    />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </Paper>
        </GridItem>
      }

    </GridContainer>
  );
}
const mapStateToProps = state => ({
  httpCallResult: state.httpCallResult,
  metrics: state.metrics
});
export default connect(mapStateToProps, {})(DetailedSchedule);