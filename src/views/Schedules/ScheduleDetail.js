import React from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import OverflowTip from 'components/OverflowTip/OverflowTip';
import Metadata from "components/Metadata/Metadata.js";
import CheckCircleText from "components/Icons/CheckCircleText.js";
import RemoveCircleText from "components/Icons/RemoveCircleText.js";

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
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@material-ui/core';

import {
  buildRegion,
  buildRunFrequency
} from "utils/Formatter"

import moment from "moment";

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

function ScheduleDetail({ httpCallResult, metrics, location }) {

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
      <GridItem xs={12} style={{ marginBottom: 22 }}>
        <Metadata
          headerText="Schedule detail"
          itemPerRow={3}
          items={[
            {
              name: "Schedule Name",
              value: location.state.scheduleName
            },
            {
              name: "Status",
              customValue: location.state.state === 'ENABLED' ? <CheckCircleText text={"Enabled"} /> : <RemoveCircleText text={"Disabled"} />
            },
            {
              name: "Run Frequency",
              value: buildRunFrequency(location.state.timer)
            },
            {
              name: "Geolocation",
              value: buildRegion(location.state.region)
            },
            {
              name: "Notification emails",
              value: location.state.emails ? <OverflowTip originalValue={location.state.emails} /> : "-"
            },
            {
              name: "",
              value: ""
            }
          ]} />
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
export default connect(mapStateToProps, {})(ScheduleDetail);