import React from 'react';
import {Link} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

function MenuMUI () {
    const [value, setValue] = React.useState(0);

    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        >
        <BottomNavigationAction label='Etusivu'  component={Link} to ='/' />
        <BottomNavigationAction label="Huoneet" component={Link} to ='/huoneet' />
        <BottomNavigationAction label="Yhteystiedot" component={Link } to ='/yhteystiedot' />
      </BottomNavigation>
    );
  }
 

export default MenuMUI;