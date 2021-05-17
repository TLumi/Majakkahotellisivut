const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('huoneet.db');


db.serialize( () => {
    let sql = 
    'CREATE TABLE Huone (' +
   'huone_id integer PRIMARY KEY NOT NULL, ' +
   'nimi text NOT NULL, ' +
   'kuvaus text NOT NULL, ' +
   'varustus text NOT NULL, ' +
   'kuva text )';

   db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu tehtiin");
  })

  sql = "INSERT INTO `huone` (`huone_id`, `nimi`, `kuvaus`,`varustus`, `kuva`) "+
  " VALUES (1,'Horisontti', 'Tästä huoneesta voit katsella kauas merelle. Huone sijaitsee majakan keskiosassa ja siitä näkee sekä saaren luontoa että kauas horisonttiin.', 'Huone on varustettu kahdella erillisellä sängyllä. Huoneessa on oma wc sekä suihkuhuone.', 'https://cdn.pixabay.com/photo/2017/06/18/20/50/view-2417156_960_720.jpg')";
    db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `huone` (`huone_id`, `nimi`, `kuvaus`,`varustus`, `kuva`) "+
  " VALUES (2, 'Lyhty', 'Hotellin korkeimmalla oleva huone, josta on näkymät moneen eri suuntaan. Tässä huoneessa heräät aamuauringon nousuun ja näet tyrskyjen lyövän saaren rantaan. Omasta kylpyhuoneesta ihastelet ilta-auringon kajoa samalla kun kylvet ammeessa.', 'Tässä huoneessa on parisänky, oma kylpyhuone ja pieni jääkaappi. Huoneen varustuksiin kuuluu myös hiustenkuivaaja ja silitysrauta.', 'https://cdn.pixabay.com/photo/2018/06/14/21/17/room-3475665_960_720.jpg')";
    db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `huone` (`huone_id`, `nimi`, `kuvaus`,`varustus`, `kuva`) "+
  " VALUES (3,'Ulkoluoto', 'Hotellin alimman kerroksen huoneessa voit aistia meren lähelläsi, kuin oleskelisit ulkoluodon aurinkoisilla kallioilla. Tässä huoneessa meri on lähellä ja huoneen omassa kylpyammeessa voit kuulla tyrskyjen lyövän kallioon. Myös pienen saaremme luonto avautuu ikkunasta tarjoten matkaajalle vuodenaikojen vaihtelun hyvin läheltä seuraten.', 'Tässä huoneessa on parisänky ja oma kylpyhuone. Huoneen varustuksiin kuuluu kiikarit.', 'https://cdn.pixabay.com/photo/2014/07/20/17/01/hotel-room-key-397946_960_720.jpg')";
    db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });
})
db.each("SELECT huone_id, nimi FROM huone", (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(row.huone_id + ", " + row.nimi);
  
  });
  
  db.close();
  