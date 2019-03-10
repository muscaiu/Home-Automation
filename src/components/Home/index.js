import React from 'react';

import { withAuthorization } from '../Session';
import Thermostat from '../Thermostat';


const HomePage = () => (

  <Thermostat
    minValue="15"
    maxValue="30"
    numTicks="50"
    height="200px"
    width="200px"
    away={false}
    ambientTemperature={23}
    targetTemperature={22}
    hvacMode={'heating'}
    leaf={true}
  />

)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
