const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({limit: '5mb', extended: true}));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('varaukset.db');
const db2 = new sqlite3.Database('huoneet.db');

// back kuuntelee porttia 8080
app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

//Tästä eteenpäin huoneen tietoja
app.get('/huone/all', (req, res, next) => {
	db2.all("SELECT * FROM huone", (error, results) => {
    if (error) throw error;
    
    return res.status(200).json(results);
  });
});

app.get('/huone/one/:id', (req, res, next) => {
    let huone_id = req.params.id;
    db2.get('SELECT * FROM huone where id=?', [huone_id], (error, result) => {
        if (error) throw error;

        if (typeof(result) == 'undefined')  {
          return res.status(200).send({});
        }
/* Jos kuva olisi talletettu kantaan
		    if (result.kuva != null) {
		      result.kuva = result.kuva.toString('base64');
		    }
*/
        return res.status(200).json(result);
    });
});

// Ensin tehdään upload ja sitten vasta tämä

app.post('/huone/add',   (req, res, next) => {
   // Lomakkeelta tulleet tiedot
    let huone = req.body;
    
    db2.run('INSERT INTO huone (nimi, kuvaus, varustus, kuva) VALUES ( ?, ?, ?, ?)',
    [huone.nimi, huone.kuvaus, huone.varustus, huone.kuva],  (error, result) =>{
        if (error) throw error;

        return res.status(200).json( {count: this.change} );
    })
})


/*
Kun kuva lisätään kantaan, ei hakemistoon
app.post('/henkilo/add', (req, res, next) => {
    let tap = req.body;

    let kuva = null;
	  if (tap.kuva != null) {
      kuva = Buffer.from(tap.kuva, 'base64');
	  }

    db.run("INSERT INTO henkilo (nimi, email, kuva) VALUES (?, ?, ?)", [tap.nimi, tap.email, tap.kuva], function (error, result, fields) {
        if (error) throw error;

        return res.status(200);
    });
});
*/

app.get('/huone/delete/:id', (req, res, next) => {
    // Otetaan parametrina tulleen henkilon id
    let huone_id = req.params.id;

    // Kuvan poistamienen puuttuu ratkaisusta
    db2.run('DELETE FROM huone WHERE id = ?', [huone_id],  function (error, result) {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    });

})

app.post('/huone/edit/:id', (req, res, next) => {
    let huone_id = req.params.id;
    let huone = req.body;

    db2.run('UPDATE huone set nimi=?, kuvaus=?, varustus=?, kuva=? WHERE id=?',
    [huone.nimi, huone.kuvaus, huone.varustus, huone.kuva, huone_id], (error, result)=> {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    });
})


// Tästä alkaa varauksen tiedot
// Reititys on /huone/all esim. localhost:8080/huone/all
app.get('/varaus/all', (req, res, next) => {
	db.all("SELECT * FROM varaus", (error, results) => {
    if (error) throw error;
    
    return res.status(200).json(results);
  });
});

app.get('/varaus/one/:varaus_id', (req, res, next) => {
    let varaus_id = req.params.varaus_id;
    db.get('SELECT * FROM varaus where varaus_id=?', [varaus_id], (error, result) => {
        if (error) throw error;

        if (typeof(result) == 'undefined')  {
          return res.status(200).send({});
        }
/* Jos kuva olisi talletettu kantaan
		    if (result.kuva != null) {
		      result.kuva = result.kuva.toString('base64');
		    }
*/
        return res.status(200).json(result);
    });
});

// Ensin tehdään upload ja sitten vasta tämä

app.post('/varaus/add',   (req, res, next) => {
   // Lomakkeelta tulleet tiedot
    let varaus = req.body;
    

    db.run('INSERT INTO varaus ( huone_id, etunimi, sukunimi, email, puhelin, startDate, endDate) VALUES (?, ?, ?, ?, ?,?,?)',
    [varaus.huone_id, varaus.etunimi, varaus.sukunimi, varaus.email, varaus.puhelin, varaus.startDate, varaus.endDate],  (error, result) =>{
        if (error) throw error;

        return res.status(200).json( {count: this.change} );
    })
})


/*
Kun kuva lisätään kantaan, ei hakemistoon
app.post('/henkilo/add', (req, res, next) => {
    let tap = req.body;

    let kuva = null;
	  if (tap.kuva != null) {
      kuva = Buffer.from(tap.kuva, 'base64');
	  }

    db.run("INSERT INTO henkilo (nimi, email, kuva) VALUES (?, ?, ?)", [tap.nimi, tap.email, tap.kuva], function (error, result, fields) {
        if (error) throw error;

        return res.status(200);
    });
});
*/

app.get('/varaus/delete/:varaus_id', (req, res, next) => {
    // Otetaan parametrina tulleen henkilon id
    let varaus_id = req.params.varaus_id;

    // Kuvan poistamienen puuttuu ratkaisusta
    db.run('DELETE FROM varaus WHERE varaus_id = ?', [varaus_id],  function (error, result) {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    });

})

app.post('/varaus/edit/:varaus_id', (req, res, next) => {
    let varaus_id = req.params.varaus_id;
    let varaus = req.body;

    db.run('UPDATE varaus set huone_id=?, etunimi=?, sukunimi=?, email=?, puhelin=?, startDate=?, endDate=? WHERE varaus_id=?',
    [varaus.huone_id, varaus.etunimi, varaus.sukunimi, varaus.email, varaus.puhelin, varaus.startDate, varaus.endDate, varaus_id], (error, result)=> {
        if (error) throw error;

        return res.status(200).json( {count: this.changes} );
    });
})




// Jos mikään aiempi reititys on sopinut, silloin suoritetaan tämä
app.get('*', (req, res, next) => {
    return res.status(404).send({ error: true, message: 'Ei pyydettyä palvelua' })
});
