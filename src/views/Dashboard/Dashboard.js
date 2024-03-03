import React, { useState, useEffect } from 'react';

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import Warning from "@material-ui/icons/Warning";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


import {
  profileResource
} from "../../service/CodelessApi.js"

function Heartbeat() {
  return <Icon className="fa fa-heartbeat" />;
}

const useStyles = makeStyles(styles);

export default function Dashboard() {

  const [data, setData] = useState([]);
  const classes = useStyles();

  const fetchData = async () => {
    try {
      const response = await profileResource.getProfile()
      const result = response.data;
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Heartbeat />
              </CardIcon>
              <p className={classes.cardCategory}>Used Tests</p>
              <h3 className={classes.cardTitle}>
                {data ? data.usedTestsCount : '-'}/{data ? data.allowedTestsCount : '-'}
              </h3>
            </CardHeader>
            {data?.allowedTestsCount - 1 === data?.usedTestsCount ?
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more
                  </a>
                </div>
              </CardFooter>
              :
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            }
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>schedule</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Schedules</p>
              <h3 className={classes.cardTitle}>
                {data ? data.usedSchedulesCount : '-'}/{data ? data.allowedSchedulesCount : '-'}
              </h3>
            </CardHeader>
            {data?.allowedSchedulesCount - 1 === data?.usedSchedulesCount ?
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more
                  </a>
                </div>
              </CardFooter>
              :
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            }
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
