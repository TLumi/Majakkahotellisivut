import React, {useState} from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import {makeStyles } from '@material-ui/core/styles';

function MenuMUI () {
    const useStyles = makeStyles({
            menu: {
            textAlign:'center'
            
                   }
    
    });

    const classes = useStyles();

    const [anchorMenu, setMenuOpen] = useState(null);
 
    //const [value, setValue] = React.useState(0);

  const handleMenu = (event) => 
  { setMenuOpen(event.currentTarget); }


  const handleClose = () => { 
    setMenuOpen(null); 
    
  }   

  const menu = 
  <Menu className={classes.menu}
          anchorEl={ anchorMenu }
          open={ Boolean(anchorMenu) }
          anchorOrigin={ {vertical: 'bottom', horizontal: 'right'} }
          getContentAnchorEl={ null }
          onClose={ handleClose} >
          <MenuItem onClick={ handleClose } component={Link} to ='/varaustiedot'>
            <ListItemIcon><DirectionsBoatIcon /></ListItemIcon>
            <ListItemText primary='Varaustiedot' />
          </MenuItem> 
          <MenuItem onClick={ handleClose } component={Link} to ='/majakat'>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary='Muut Majakat' />
            </MenuItem> 
         </Menu>
    

  return (
   <div>
         
          < Button onClick={ handleMenu } color='inherit' > Henkilökunnan sivut </Button>
         {menu}
       
  </div>
  );
}

export default MenuMUI;