import React from 'react';
import {useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      width: 700,
      height: 500,
      cellHeight: 160
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

}));

   

function Huone(props){
   let {huone_id, nimi, kuvaus, varustus} =useParams();

     const classes = useStyles(); 
return(
      
<Paper className={classes.paper}>
     
        <Typography variant='h4'>{nimi}</Typography>
        <Typography > {kuvaus} </Typography>
        <Typography > {varustus} </Typography>

        <Button align='center' component ={Link} to = {'/varaa/'+ huone_id+ '/'+ nimi}>Varaa</Button>
        <div className={classes.root}>
            <GridList  className={classes.gridList} cols={3}>
                {props.kuvaData.map((kuva) => (
                <GridListTile key={kuva.img} cols={kuva.cols || 1}>
                    <img src={kuva.img} alt={kuva.title} />
                </GridListTile>
                ))}
            </GridList>
</div>      
        
</Paper>      
    
);
}
export default Huone;