import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';


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
    }
    }));

function Huoneet(props){
    const classes = useStyles(); 
    return(
        <Paper className={classes.paper} >
        <Typography>Hotellistamme löytyy kolme erilaista huonetta matkailijoiden käyttöön. </Typography>
        <Grid >   
            {props.huoneet.map(huone => {
                return(
                   <Grid className={classes.griditem} item key={huone.huone_id}>
                       <Card >
                       <CardActionArea component = {Link} to = {'/lueLisaa/'+ huone.huone_id+ '/'+ huone.nimi+ '/'+ huone.kuvaus+ '/'+huone.varustus}>
                            <CardMedia image= {huone.kuva} 
                            title={huone.nimi} 
                            style={{height: 300}}/>                                                                       
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {huone.nimi}
                        </Typography>
                        <Typography >
                            {huone.kuvaus}
                        </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardActions>
                                <Button component = {Link} to = {'/lueLisaa/'+ huone.huone_id+ '/'+ huone.nimi+ '/'+ huone.kuvaus+ '/' +huone.varustus}>Lue lisää</Button> 
                         </CardActions>
                        
                        </Card>
                    </Grid> 
            );  
        })}    
    </Grid>
    </Paper>
    );
}   
   

export default Huoneet;