import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import Griditem from '@material-ui/core';
import axios from 'axios';



const url = 'http://localhost:8080'

function EditVaraus(props) {
    const[varaus, setVaraus]=useState(props.varaus);
    const[ilmoitus,setIlmoitus] =useState('');
   
    const muutaStartDate =(startDate) => {
        setVaraus({
            ...varaus,
            startDate: startDate 
        });
    } ;

    const muutaEndDate =(endDate) => {
        setVaraus({
            ...varaus,
            endDate: endDate 
        });
    } ;
       
    const muuta =(e) => {
        setVaraus({
            ...varaus,
            [e.target.name]: e.target.value //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
       
        setIlmoitus('');
    };
  
        
        const muutaVaraus=(e) => {
            e.preventDefault();
            
            if (varaus.etunimi.length<3) 
             { setIlmoitus('Etunimen täytyy olla vähintään 3 merkkiä pitkä.')
                }
            else if (varaus.sukunimi.length<3)
            { setIlmoitus('Sukunimen täytyy olla vähintään 3 merkkiä pitkä.')   
                }
            else if (varaus.email.length<5)
            { setIlmoitus('Sähköpostin täytyy olla vähintään 5 merkkiä pitkä.')   
                    }    
            else if (varaus.puhelin.length<5)
            { setIlmoitus('Puhelinnumeron täytyy olla vähintään 5 merkkiä pitkä.')   
                 } 
            else if (varaus.startDate >=  varaus.endDate)          
            { setIlmoitus('Lähtöpäivä ei voi olla ennen tulopäivää.')   
             }  
            else if (new Date () > varaus.endDate)          
                { setIlmoitus('Lähtöpäivä ei voi olla menneisyydessä.')                       
            }else{     
                
                
                const formData = {
                    'varaus_id':varaus.varaus_id,
                    'huone_id': varaus.huone_id,
                    'etunimi': varaus.etunimi,
                    'sukunimi': varaus.sukunimi,
                    'email': varaus.email,
                    'puhelin': varaus.puhelin,
                    'startDate': varaus.startDate,
                    'endDate': varaus.endDate,
                }

                axios.post(url+ '/varaus/edit/'+varaus.varaus_id, formData)
                    .then(response =>{
                        if(response.status ===200){
                            setVaraus({huone_id:'', etunimi:'', sukunimi:'', email:'', puhelin:'', startDate:'', endDate:''});
                            setIlmoitus('Varauksen tiedot päivitetty onnistuneesti! ');
                        }else{
                            setIlmoitus('Varauksen päivittäminen epäonnistui.');
                        }                    
                    })
            
                }
            }        
    return(
        

 <Paper style= {{marginTop:30, marginLeft:20, marginRight:20}} >
     
             
            <Card  >
            <form style={ {marginTop:20, marginLeft:20, marginBottom:20}}>
                <Typography> Olet varaamassa huonetta {props.huone_id}</Typography>
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
                <input style={{marginTop:20}} type='submit' value='Tallenna ' onClick={(e)=> muutaVaraus(e)} /> 
                <p> {ilmoitus} </p> 
                          
          </form>
            </Card>
            
        </Paper>
      
    );

}        
export default EditVaraus;