import React from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { format } from "d3-format";

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
import data from "../../data";

import {
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@material-ui/core';

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

function DetailedSchedule({ httpCallResult }) {

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
    name: "hilo_rainfall",
    columns: ["index", "precip"],
    points: data.values.map(([d, value]) => [
      Index.getIndexString("1h", new Date(d)),
      value
    ])
  });

  console.log("series is ", series);
  const style = styler([
    {
      key: "precip",
      color: "#3f51b5",
      selected: "#2CB1CF",
    }
  ]);

  const formatter = format(".2s");
  let infoValues = [];
  if (highlight) {
    const trafficText = `${formatter(highlight.event.get(highlight.column))}`;
    infoValues = [{ label: "Traffic", value: trafficText }];
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <div>
          <AntTabs value={value} onChange={handleChange}>
            <AntTab label="Metrics" />
          </AntTabs>
        </div>
      </GridItem>

      {value === 0 &&
        <GridItem xs={12}>
          <Paper elevation={3} >
            <Resizable>
              <ChartContainer timeRange={series.range()}>
                <ChartRow
                  titleHeight={20}
                  height="200"
                  title="">
                  <YAxis
                    id="rain"
                    label="Rainfall (inches/hr)"
                    min={0}
                    max={2}
                    format=".2f"
                    width="40"
                    type="linear"
                  />
                  <Charts>
                    <BarChart
                      axis="rain"
                      style={style}
                      spacing={1}
                      columns={["precip"]}
                      series={series}
                      minBarHeight={3}
                      // info={infoValues}
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
  httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, {})(DetailedSchedule);