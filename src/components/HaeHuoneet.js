import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Huoneet from './Huoneet';
import MDSpinner from 'react-md-spinner';

  function HaeHuoneet () {
   
   const [huoneet, setHuoneet] = useState([]);
   const [virhe, setVirhe] = useState('Haetaan');

   const haeKaikkiHuoneet = async () => {
    try {
      const response = await fetch('http://localhost:8080/huone/all');
      const json = await response.json();
      setHuoneet(json);
      setVirhe('');
    } catch (error) {
      setHuoneet([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }
  
   useEffect( () => {
        haeKaikkiHuoneet();
   }, [])

   if (virhe.length > 0) {
     return ( <MDSpinner/> );
   }

   if (huoneet.length > 0) {
     return ( <Huoneet huoneet={ huoneet } /> );
   }

   return ( <Typography>Yhtään huonetta ei ole</Typography> );
  }
  
  export default HaeHuoneet;
