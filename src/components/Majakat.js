import React, { useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from'@material-ui/core/CardContent';
import CardHeader  from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';


const useStyles=makeStyles({
    typo:{
        textAlign:'center',
        marginTop: 50,
        marginBottom: 50,
        fontSize: 18,
    },   
    cardHeader:{
       background: blue[100],
        textAlign:'center',

    },
    card: {
       
        minWidth: 250, 
        minHeight: 200,
    }
})

function Majakat (){
    const classes=useStyles();
    const [nimi, setNimi] =useState([]);
    
    const [viesti, setViesti]= useState('Haetaan...');

    const fetchUrl = async () => {
        try{
            const response =await fetch('https://julkinen.vayla.fi/inspirepalvelu/wfs?request=getfeature&typename=avoin:turvalaitteet&cql_filter=TY_JNR=1&outputformat=application/json');
            const json =await response.json();
            setNimi(json.features);
            console.log(json.features);
            setViesti('');
        } catch (error) {
            setViesti('Jotain meni vikaan');
        }
    }

    useEffect( () => { fetchUrl()}, []);

    if (viesti.length > 0) {
        return <div>{viesti }</div>
    }
  

      return (
        <Paper>         
            <Typography className={classes.typo}>Täältä näet muiden majakkasaarten nimet ja sijainnit.</Typography>       
        <Grid container spacing={3}>
            {nimi.map(features =>{
                return(
                    <Grid item key={features.id}>
                        <Card className={classes.card}>
                            <CardHeader className={classes.cardHeader} 
                            title ={features.properties.NIMIS } 
                            subheader={features.geometry.coordinates[0] + ', ' +features.geometry.coordinates[1]}/>
                            <CardContent>
                                <Typography >
                                {features.properties.SIJAINTIS}   
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid> 
                );  
            })}    
        </Grid>
    </Paper>
    );
}   

export default Majakat;