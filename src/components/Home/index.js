import React from 'react';


import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { compose } from 'recompose';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Kitchen from "@material-ui/icons/Kitchen";
import Wc from "@material-ui/icons/Wc";

import Card from "components/Card/Card";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardFooter from "components/Card/CardFooter";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withAuthorization } from '../Session';
import { ThermostatBase } from '../Thermostat';

class HomePage extends React.Component {
  state = {
    ambientTemperature: 19,
    targetTemperature: 22
  }
  handleTempIncrement = () => {
    this.setState({ targetTemperature: this.state.targetTemperature + 1 })
  }
  handleTempDecrement = () => {
    this.setState({ targetTemperature: this.state.targetTemperature - 1 })
  }
  render() {
    const { classes } = this.props;
    const { ambientTemperature, targetTemperature } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card >
              <CardActionArea className={classes.thermostatCard}>
                <ThermostatBase
                  minValue="15"
                  maxValue="30"
                  numTicks="50"
                  height="200px"
                  width="200px"
                  away={false}
                  ambientTemperature={ambientTemperature}
                  targetTemperature={targetTemperature}
                  hvacMode={'off'}
                  leaf={true}
                />
              </CardActionArea>
              <div className={classes.thermostatCard}>
                <IconButton onClick={this.handleTempIncrement}>
                  <SvgIcon>
                    <path fill='#9C27B0' d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                  </SvgIcon>
                </IconButton>
                <IconButton onClick={this.handleTempDecrement}>
                  <SvgIcon>
                    <path fill='#9C27B0' d="M0 10h24v4h-24z" />
                  </SvgIcon>
                </IconButton>
              </div>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Temperature</p>
                <p className={classes.cardCategory}>Humidity</p>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Living Room
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Kitchen />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Kitchen
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>child_care</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Temperature</p>
                <h3 className={classes.cardTitle}>
                  22 <small>°C</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Vlad's Room
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="rose" stats icon>
                <CardIcon color="rose">
                  <Wc />
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Bed Room
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withStyles(dashboardStyle),
)(HomePage);
