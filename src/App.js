import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter, Route, Switch,} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MenuMUI from './components/MenuMUI';
import Etusivu from './components/Etusivu';
import Yhteystiedot from './components/Yhteystiedot';
//import Huoneet from './components/Huoneet';
import Huone from './components/Huone';
import Varauslomake from './components/Varauslomake';
import Huonelomake from './components/Huonelomake';
import HaeHuoneet from './components/HaeHuoneet';
import HaeVaraukset from './components/HaeVaraukset';
import HaeVaraus from './components/HaeVaraus';
const theme = createMuiTheme({
    
      typography:{
      fontFamily: ['Raleway', 'sans-serif']
    },
});

  const kuvaData=[
    {id:1,
      img:'https://cdn.pixabay.com/photo/2017/11/21/15/36/sanderling-2968476_960_720.jpg',
      title:'A'},
      {id:2,
        img:'https://cdn.pixabay.com/photo/2014/02/25/22/06/staircase-274614_960_720.jpg',
    title:'B'},
    {id:3,
      img:'https://cdn.pixabay.com/photo/2019/06/04/19/18/lighthouse-4252107_960_720.jpg',
    title:'C'},
    {id:4,
      img:'https://cdn.pixabay.com/photo/2018/06/14/21/17/room-3475665_960_720.jpg',
    title:'D'},
    {id:5,
      img:'https://cdn.pixabay.com/photo/2017/08/13/12/04/stones-2636977_960_720.jpg',
    title:'F'},
    {id:6,
      img:'https://cdn.pixabay.com/photo/2020/04/26/22/09/common-tern-5097345_960_720.jpg',
    title:'G'},
    {id:7,
    img:'https://cdn.pixabay.com/photo/2016/11/21/16/21/bed-1846251_960_720.jpg',
    title:'H'},
    {id:8,
    img: 'https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg',
    title:'I'},
    {id:9,
    img:'https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg',
    title:'J'},
   
  ]

  const majakkaData=[
    {id:1,
    img:'https://cdn.pixabay.com/photo/2019/03/22/16/44/lighthouse-4073638_960_720.jpg',
    title:'G'},
  ]

  
  function App() {
    return (
      <BrowserRouter>
      <MuiThemeProvider theme={ theme }>
        <div>
          <CssBaseline/>
            <div>
              <MenuMUI/>  
                <Switch>
                <Route exact path='/' render={(props)=> <Etusivu{...props} majakkaData={majakkaData}/>}/>
                  <Route path = '/huoneet' component={HaeHuoneet}/>
                  <Route path='/yhteystiedot' render={(props)=> <Yhteystiedot{...props} majakkaData={majakkaData}/>}/>
                  <Route path='/lueLisaa/:huone_id/:nimi/:kuvaus/:varustus/' render ={(props)=><Huone{...props} kuvaData={kuvaData}/>}/>
                  <Route path='/varaa/:huone_id/' component= {Varauslomake}/>
                  <Route path= '/varaustiedot' component={HaeVaraukset}/>
                  <Route path='/muutaVaraus/:varaus_id'component={HaeVaraus}/>
                  <Route path='/huone/add/'component={ Huonelomake } />
                 
              </Switch>
            </div>
        </div>
        
      </MuiThemeProvider>  
    </BrowserRouter>

    );
  }
   
  export default App;