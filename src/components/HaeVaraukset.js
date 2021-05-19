import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Varaustiedot from './Varaustiedot';

  function HaeVaraukset () {
   
   const [varaukset, setVaraukset] = useState([]);
   const [virhe, setVirhe] = useState('Haetaan');

   const haeKaikkiVaraukset = async () => {
    try {
      const response = await fetch('http://localhost:80/varaus/all');
      const json = await response.json();
      setVaraukset(json);
      setVirhe('');
    } catch (error) {
      setVaraukset([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }
  
   useEffect( () => {
        haeKaikkiVaraukset();
   }, [])

   if (virhe.length > 0) {
     return ( <Typography>{ virhe }</Typography> );
   }

   if (varaukset.length > 0) {
     return ( <Varaustiedot varaukset={ varaukset } /> );
   }

   return ( <Typography>Yhtään varausta ei ole</Typography> );
  }
  
  export default HaeVaraukset;
