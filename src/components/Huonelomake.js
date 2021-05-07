import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

function Huonelomake() {
    
    const [huone, setValues] =useState({
        nimi:(''),
        kuvaus: (''),
        varustus:(''),
        kuva: (''),
        
  });
    
    const[ilmoitus, setIlmoitus]=useState('');
    
    const muuta =(e) => {
        setValues({
            ...huone,
            [e.target.name]: e.target.value //lomakkeella muuttuva name: pitää olla identtinen tilamuuttujan kanssa
        });
        setIlmoitus('');
    };
  
        
        const lisaaHuone=(e) => {
            
            e.preventDefault();// estetään normaali toiminta eli tietojen siirtyminen palvelimelle

            const formData = new FormData();
            formData.append('nimi', huone.nimi);
            formData.append('kuvaus', huone.kuvaus);
            formData.append('varustus', huone.varustus);
            formData.append('kuva', huone.kuva); 
            
            axios.post('http://localhost:8080/huone/add', formData)
            .then(response => {
                 if (response.status === 200) {
                setValues( {nimi: '',kuvaus: '', varustus: '', kuva: '', } );
                setIlmoitus('Lisättiin');
      } else {
        setIlmoitus('Lisäys ei onnistunut');
      }
    })
 }

    return(
             <Paper style= {{marginTop:30, marginLeft:20, marginRight:20}} >
            <Card  >
            <form style={ {marginTop:20, marginLeft:20, marginBottom:20}}>
                
                <TextField fullWidth required label="Nimi" name='nimi' 
                value= {huone.nimi} onChange ={muuta} />
                 <TextField fullWidth required label="Kuvaus" name='kuvaus' 
                value= {huone.kuvaus} onChange ={muuta} />     
                <TextField fullWidth required label="Varustus" name='varustus' 
                value= {huone.varustus} onChange ={muuta} />     
                <TextField fullWidth  label="Kuvan osoite" name='kuva' 
                value= {huone.kuva} onChange ={muuta} />  
                  
                <input style={{marginTop:20}} type='submit' value='Tallenna ' onClick={(e)=> lisaaHuone(e)} /> 
                                         
          </form>
          <Typography>{ilmoitus}</Typography> 
            </Card>
        </Paper>
        
    );
}

export default Huonelomake;