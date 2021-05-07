import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import Griditem from '@material-ui/core';
import axios from 'axios';

const url ='http://localhost:8080';

function Varauslomake() {
    let {huone_id} = useParams();
     
  //  const [startDate, setStartDate] = useState(new Date());
  //  const [endDate, setEndDate]=useState(new Date () );
    
    const [varaus, setValues] =useState({
        huone_id:huone_id,
        etunimi: (''),
        sukunimi:(''),
        email: (''),
        puhelin:(''),
        startDate: new Date(), 
        endDate:  new Date(),
      
    });
    
    const[ilmoitus, setIlmoitus]=useState('');
    
    const muutaStartDate =(startDate) => {
        setValues({
            ...varaus,
            startDate: startDate //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
    } ;

    const muutaEndDate =(endDate) => {
        setValues({
            ...varaus,
            endDate: endDate //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
    } ;
    //const muutaEndDate =(endDate) => {
    //    setValues(endDate);
    //} ;
    
    const muuta =(e) => {
        setValues({
            ...varaus,
            [e.target.name]: e.target.value //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
        //setStartDate(startDate);
        //setEndDate(endDate);
        setIlmoitus('');
    };
  
        
        const lisaaVaraus=(e) => {
            e.preventDefault();
            
            if (varaus.etunimi.length<3 || varaus.sukunimi.length<3 || varaus.email.length<5 || varaus.puhelin.length<5)
             { setIlmoitus('Täytä kaikki kentät.')
             
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
                            setIlmoitus('Varaus lähetetty onnistuneesti! Saat varausvahvistuksen ja varauksen tiedot hetken kuluttua sähköpostiisi.');
                        }else{
                            setIlmoitus('Varauksen lähettäminen epäonnistui.');
                        }                    
                    })
            
                }
            }        
    return(
             <Paper style= {{marginTop:30, marginLeft:20, marginRight:20}} >
            <Card  >
            <form style={ {marginTop:20, marginLeft:20, marginBottom:20}}>
                <Typography> Olet varaamassa huonetta {huone_id}</Typography>
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
                //    minDate={varaus.startDate}
                //    minDateMessage={'Lähtöpäivä ei voi olla ennen tulopäivää'}
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
                <p> {ilmoitus} </p> 
                          
          </form>
            </Card>
        </Paper>
        
    );
}

export default Varauslomake;