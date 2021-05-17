const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('varaukset.db');


db.serialize( () => {
    let sql = 'CREATE TABLE Varaus (' +
   'varaus_id integer PRIMARY KEY NOT NULL, ' +
   'huone_id integer NOT NULL,'+
   'etunimi text NOT NULL, ' +
   'sukunimi text NOT NULL, ' +
   'email text NOT NULL, ' +
   'puhelin text NOT NULL, ' +
   'startDate date NOT NULL,'+
   'endDate date NOT NULL)';

   db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu tehtiin");
  })

  sql = "INSERT INTO `varaus` (`varaus_id`, `huone_id`,`etunimi`,`sukunimi`,`email`,`puhelin`, `startDate`,`endDate` ) "+
  " VALUES (1, 2, 'Tuula', 'Testi', 'testi@email.com', '000123456','2021-05-05', '2021-05-07')";
    db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `varaus` (`varaus_id`, `huone_id`,`etunimi`,`sukunimi`,`email`,`puhelin`, `startDate`,`endDate` ) "+
  " VALUES  (2, 2, 'Tiina', 'Testivaraus', 'tiina@testivaraus.com', '012345678', '.2021-05-07', '2021-05-10')";
    db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });
})
db.each("SELECT varaus_id, sukunimi FROM varaus", (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(row.varaus_id + ", " + row.sukunimi);
  
  });
  
  db.close();
  


