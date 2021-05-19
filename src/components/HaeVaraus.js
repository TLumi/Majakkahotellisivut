import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import EditVaraus from './EditVaraus';
import {useParams} from 'react-router-dom';

function HaeVaraus () {
 
   let {varaus_id} = useParams();
  
   const [varaus,setVaraus]=useState([]);
   const [virhe, setIlmoitus] = useState('Haetaan');

   const haeVaraustiedot = async () => {
    try{
      console.log(varaus_id);
      const response = await fetch('http://localhost:80/varaus/one/'+varaus_id)
        const json = await response.json();
        console.log(json);
        setVaraus(json);
        setIlmoitus('');
                  
    } catch (error){ 
      setVaraus([]);
      setIlmoitus('Tietojen haku ei onnistunut');
        }
   }   
 
  useEffect(() => {
    haeVaraustiedot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

if (virhe.length > 0) {
  return ( <Typography>{ virhe }</Typography> );
}

return (<EditVaraus varaus={ varaus } /> );
}

  export default HaeVaraus;
