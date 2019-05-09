import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { compose } from 'recompose';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
import Kitchen from "@material-ui/icons/Kitchen";
import Wc from "@material-ui/icons/Wc";

import Card from "components/Card/Card";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardFooter from "components/Card/CardFooter";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { ThermostatBase } from '../Thermostat';

import {
  subscribeToTemperature,
  subscribeToHumidity,
  subscribeToLiving,
  // toggleLiving
} from '../../subscribers/subscribeToSensor';

class HomePage extends React.Component {
  state = {
    ambientTemperature: 23,
    targetTemperature: 22,
    // sensor: '',
    temperature: 23,
    humidity: 45,
    livingData: '',
    livingLamp: false,
  }
  componentDidMount = () => {

    subscribeToTemperature(null, temperature => {
      this.setState({
        temperature,
        targetTemperature: parseInt(temperature),
      })
    })
    subscribeToHumidity(null, humidity => {
      this.setState({
        humidity,
      })
    })

    subscribeToLiving(20000, livingData => {
      this.setState({
        livingData
      })
    })

    // fetch('http://192.168.1.12/cm?cmnd=Status')
    fetch('http://cassusa.go.ro:3001/api/statusliving')
      .then(response => {
        response.json()
          .then(data => this.setState({ livingLamp: !!data.data.Status.Power }));
      })

    // this.props.firebase.initializePushNotifications()
  }

  handleTempIncrement = () => {
    this.setState({ ambientTemperature: this.state.ambientTemperature + 1 })
  }

  handleTempDecrement = () => {
    this.setState({ ambientTemperature: this.state.ambientTemperature - 1 })
  }

  handleToggleLiving = () => {
    fetch('http://cassusa.go.ro:3001/api/toggleliving')
    // toggleLiving()
    this.setState({ livingLamp: !this.state.livingLamp })
  }

  render() {
    const { classes } = this.props;
    const {
      ambientTemperature,
      targetTemperature,
      // sensor,
      temperature,
      humidity,
      livingData,
      livingLamp,
    } = this.state;

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
                <CardIcon onClick={this.handleToggleLiving} color="success">
                  <Store color={livingLamp ? "secondary" : 'action'} />
                </CardIcon>
                <h3 className={classes.cardTitle}>
                  {livingData.temperature} °C
                </h3>
                <h3 className={classes.cardTitle}>
                  {livingData.humidity} %
                </h3>
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
              <CardHeader color="rose" stats icon>
                <CardIcon color="rose">
                  <Wc />
                </CardIcon>
                <h3 className={classes.cardTitle}>
                  {temperature} °C
                </h3>
                <h3 className={classes.cardTitle}>
                  {humidity} %
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <LocalOffer /> */}
                  Bed Room
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
                <p className={classes.cardCategory}>Temperature</p>
                {/* <h3 className={classes.cardTitle}>+245</h3> */}
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Update /> */}
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
                  {/* 22 <small>°C</small> */}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Vlad's Room
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
  withFirebase,
  withAuthorization(condition),
  withStyles(dashboardStyle),
)(HomePage);
