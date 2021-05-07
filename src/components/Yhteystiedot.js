import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({

    paper: {marginTop:30,
        marginLeft:30,    
        width: '90%',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '30px'

  },
grid: {
    marginTop:30, 
    justifyContent:'center',
    alignItems:'center',
    justify:'center',
  },

griditem: {
    marginTop:30,
    marginBottom:30,
},

  avatar:{
        width: theme.spacing(40),
        height: theme.spacing(30),
        alignContent:'center',
        
      
  }

}));


   

function Yhteystiedot(props){  
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <Grid className={classes.grid}>
                {props.majakkaData.map(kuva => {
             return(
            <Grid item key={kuva.id}>
                <Card>
                    <CardHeader 
                        title= 'Yhteystiedot'
                      />
                     
                    <CardContent>
                        <Avatar className= {classes.avatar} alt={kuva.title} src={kuva.img}/>
                        
                        <Typography>Puhelin: 030 4567 5678</Typography>     
                        <Typography>Sähköposti:majakka@email.fi</Typography>
                        <Typography>Koordinaatit: N 60°09,3′ E 025°05,1′</Typography>
                    </CardContent>               
                </Card> 
                </Grid> 
                );  
            })}    
        </Grid>
        </Paper>
    );
}   
export default Yhteystiedot;