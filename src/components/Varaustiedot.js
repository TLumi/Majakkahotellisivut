import React, {useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';


function Varaustiedot(props) {
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cell: {
    aling: 'left',
  },
});
const classes = useStyles();
const[ilmoitus,setIlmoitus] =useState('');
const[varaukset, setVaraukset]=useState(props.varaukset);
const [open, setOpen] =useState(false);


const handleClose= () => {
  setOpen(false);
}

const poista = async (varaus_id) => {
  try{
    const response = await axios.get('http://localhost:8080/varaus/delete/' +varaus_id)

    if (response.status === 200) {
      const newVaraukset = await varaukset.filter(varaus => varaus.varaus_id !== varaus_id)
      setVaraukset(newVaraukset);
      
    setIlmoitus('Varaus poistettiin');
    }
    else{
      setIlmoitus('Varauksen poisto ei onnistunut');
    }
  } catch (error) {
    setIlmoitus('Varauksen poisto ei onnistunut');
  }
  setOpen(true);

  }

let dialog =
<Dialog onClick= {handleClose} open= {open}>
  <DialogContent>
    <DialogContentText > {ilmoitus}
    <IconButton onClick ={handleClose}>
      <CloseIcon/>
    </IconButton>
    </DialogContentText>
  </DialogContent>
</Dialog>;

  return (
    
      
      <Paper >
        {dialog}
       <TableContainer > 
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Sukunimi</TableCell>
            <TableCell className={classes.cell}>Etunimi</TableCell>
            <TableCell className={classes.cell}>Puhelin</TableCell>
            <TableCell className={classes.cell}>Sähköposti</TableCell>
            <TableCell className={classes.cell}>Huone</TableCell>
            <TableCell className={classes.cell}>Tulo</TableCell>
            <TableCell className={classes.cell}>Lähtö</TableCell>
            <TableCell className={classes.cell}>Muuta</TableCell>
            <TableCell className={classes.cell}>Poista</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
           
              {props.varaukset.map((varaus) => (
                    <TableRow key={varaus.varaus_id}>
                      <TableCell component="th" scope="row">
                        {varaus.sukunimi}
                      </TableCell>
                      <TableCell className={classes.cell}>{varaus.etunimi}</TableCell>
                      <TableCell className={classes.cell}>{varaus.puhelin}</TableCell>
                      <TableCell className={classes.cell}>{varaus.email}</TableCell>
                      <TableCell className={classes.cell}>{varaus.huone_id}</TableCell>
                      <TableCell className={classes.cell}>{varaus.startDate.substr(0,10)}</TableCell>
                      <TableCell className={classes.cell}>{varaus.endDate.substr(0,10)}</TableCell>
                     <TableCell className={classes.cell}><IconButton  component= {Link} to={'/muutaVaraus/'+ varaus.varaus_id} ><EditIcon/></IconButton></TableCell>
                      <TableCell className={classes.cell}><IconButton onClick={() => poista(varaus.varaus_id)}><DeleteForeverIcon/></IconButton ></TableCell>
                    </TableRow>
              ))}
          </TableBody>
      </Table>
    </TableContainer>
  </Paper>

  );           
}; 
export default Varaustiedot;