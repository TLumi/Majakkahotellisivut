import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    
    gridList: {
        marginTop: 30,
       
    },
      paper: {
        marginTop:30,
        marginLeft:30,    
        width: '95%',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '30px'

  },
    button:{
        marginTop:50,
    },

}));



function Etusivu(props){

    const classes = useStyles(); 
    return(
        
        <Paper className={classes.paper}>
            <Typography  variant='h4'>Tervetuloa majakkahotelli Vilkun kotisivuille!</Typography>
            <Typography  > Majakkahotelli Vilkku on tunnelmallinen Hyljesaaren majakkaan vuonna 2014 perustettu hotelli. Hotellimme tarjoaa kävijöilleen merellisen elämyksen pienellä  Hyljesaarella. Saarelle on noin 30 minuutin venematka Hangon satamasta. </Typography>
            <div className={classes.gridList}>
            <GridList  cellHeight='auto' cols={1}>
                {props.majakkaData.map((majakka) => (
                <GridListTile key={majakka.img} cols={majakka.cols || 1}>
                    <img src={majakka.img} alt={majakka.title} />
                </GridListTile>
                ))}
            </GridList>
            </div>
         {/*   <Button className={classes.button} component= {Link} to = {'/login'}>Kirjautuminen henkilökunnalle</Button> */}
          
        </Paper> 
   );
}
export default Etusivu;