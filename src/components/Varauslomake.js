import React, {useState, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const url ='http://localhost:8080';


function Varauslomake() {
    let {huone_id, nimi} = useParams();
    const ilmoitusRef = useRef()
    const[ilmoitus, setIlmoitus]=useState('');
    const [open, setOpen] =useState(false);

    const handleClose= () => {
      setOpen(false);
    }
    
    const [varaus, setValues] =useState({
        huone_id:huone_id,
        etunimi: (''),
        sukunimi:(''),
        email: (''),
        puhelin:(''),
        startDate: new Date(), 
        endDate:  new Date(),
      
    });
    
    const muutaStartDate =(startDate) => {
        setValues({
            ...varaus,
            startDate: startDate
        });
    } ;

    const muutaEndDate =(endDate) => {
        setValues({
            ...varaus,
            endDate: endDate 
        });
    } ;
        
    const muuta =(e) => {
        setValues({
            ...varaus,
            [e.target.name]: e.target.value //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
        
        setIlmoitus('');
    };
         
        const lisaaVaraus=(e) => {
            e.preventDefault();
            
            if (varaus.etunimi.length<3) 
             { setIlmoitus('Etunimen täytyy olla vähintään 3 merkkiä pitkä.')
             setOpen(true); }
            else if (varaus.sukunimi.length<3)
            { setIlmoitus('Sukunimen täytyy olla vähintään 3 merkkiä pitkä.')   
            setOpen(true);  }
            else if (varaus.email.length<5)
            { setIlmoitus('Sähköpostin täytyy olla vähintään 5 merkkiä pitkä.')   
            setOpen(true);      }    
            else if (varaus.puhelin.length<5)
            { setIlmoitus('Puhelinnumeron täytyy olla vähintään 5 merkkiä pitkä.')   
            setOpen(true);  } 
            else if (varaus.startDate >=  varaus.endDate)          
            { setIlmoitus('Lähtöpäivä ei voi olla ennen tulopäivää.')   
            setOpen(true);}  
            else if (new Date () > varaus.startDate || new Date () > varaus.endDate)          
                { setIlmoitus('Päivämäärä ei voi olla menneisyydessä.')                       
                setOpen(true);
            }else{     
                
                const formData = {
                    'huone_id': varaus.huone_id,
                    'etunimi': varaus.etunimi,
                    'sukunimi': varaus.sukunimi,
                    'email': varaus.email,
                    'puhelin': varaus.puhelin,
                    'startDate': varaus.startDate,
                    'endDate': varaus.endDate,
                }

                axios.post(url+ '/varaus/add', formData)
                    .then(response =>{
                        if(response.status ===200){
                            setValues({huone_id:'', etunimi:'', sukunimi:'', email:'', puhelin:'', startDate:'', endDate:''});
                            setIlmoitus('Varauspyyntösi on lähetetty onnistuneesti. Kun hotelli on käsitellyt varauspyynnön, saat siitä vahvistuksen sähköpostiisi.');
                            setOpen(true);
                        }else{
                            setIlmoitus('Varauspyynnön lähettäminen epäonnistui.');
                            setOpen(true);
                         }                    
                    })
            
                }
            } 
           
            const dialog =
            <Dialog onClick= {handleClose} open= {open}>
              <DialogContent >
                  <DialogContentText ref={ilmoitusRef}> {ilmoitus}
                <IconButton onClick ={handleClose}>
                  <CloseIcon/>
                </IconButton>
                </DialogContentText>
              </DialogContent>
            </Dialog>;
    return(
             <Paper style= {{marginTop:30, marginLeft:20, marginRight:20}} >
             {dialog}
             <Typography > {ilmoitus}</Typography>
            <Card  >
            <form style={ {marginTop:20, marginLeft:20, marginBottom:20}}>
                <Typography> Olet varaamassa huonetta {nimi}</Typography>
                <Typography> Valitse ensin vierailusi ajankohta ja täytä sitten varauslomakkeen muut tiedot</Typography>
               
               <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
               
               <Grid item > 
               <Typography>Valitse tulopäivä</Typography>
               <DatePicker  name='startDate'
               
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={varaus.startDate}
                    onChange={muutaStartDate}
                    format={ 'dd.MM.yyyy'}
                   
                     />
                </Grid>
                   
               <Grid item >
                <Typography>Valitse lähtöpäiväsi</Typography>
                <DatePicker name='endDate'
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={varaus.endDate}
                    onChange={muutaEndDate}
                    format={'dd.MM.yyyy'}
                
                />
                </Grid>
                </MuiPickersUtilsProvider>
                
                <TextField fullWidth required label="Etunimi" name='etunimi' 
                value= {varaus.etunimi} onChange ={muuta} />
                 <TextField fullWidth required label="Sukunimi" name='sukunimi' 
                value= {varaus.sukunimi} onChange ={muuta} />     
                <TextField fullWidth required label="Sähköposti" name='email' 
                value= {varaus.email} onChange ={muuta} />     
                <TextField fullWidth required label="Puhelin" name='puhelin' 
                value= {varaus.puhelin} onChange ={muuta} />     
                <input style={{marginTop:20}} type='submit' value='Tallenna ' onClick={(e)=> lisaaVaraus(e)} /> 
               
                          
          </form>
            </Card>
        </Paper>
        
    );
}

export default Varauslomake;