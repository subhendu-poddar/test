import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import dotenv from 'dotenv';
import Home from './component/Home'
import Login from './component/TeamLogin'
import NavMenu from './component/NavMenu'
import Register from './component/TeamRegister'
import PlayersRegistration from './component/PlayersRegistration'
import Protected from './component/Protected'
import Admin from './component/Admin'
import AdminPage from './Pages/AdminPage'
import TeamPage from './Pages/TeamPage'
import PlayerPage from './Pages/PlayerPage'
import ChoosePlayer from './Pages/AuctionPage/ChoosePlayer';
import PlayerLogin from './component/PlayerLogin'
import Leaderboard from './Dashboard/Leaderboard';
import PlayerProfile from './Dashboard/PlayerProfile';
import TeamProfile from './Dashboard/TeamProfile';
import Players from './Dashboard/Players';


function App() {

  return (
    <div>
      <Router>

        <Protected/>
        <NavMenu/>

        <Switch>
          <Route exact path='/home'> <Home/> </Route>
          <Route exact path='/register'> <Register/> </Route>
          <Route exact path='/login'> <Login /> </Route>
          <Route exact path='/AdminPage'> <AdminPage /> </Route>
          <Route exact path='/players-registration'> <PlayersRegistration/> </Route>
          <Route exact path='/PlayerLogin'> <PlayerLogin/> </Route>
          <Route exact path='/admin/signin'> <Admin/> </Route>
          <Route exact path='/TeamPage'> <TeamPage/> </Route>
          <Route exact path='/PlayerPage'> <PlayerPage/> </Route>


          <Route exact path='/Leaderboard'> <Leaderboard /> </Route>
          <Route exact path='/PlayerProfile'> <PlayerProfile /> </Route>
          <Route exact path='/Players'> <Players /> </Route>
          <Route exact path='/TeamProfile'> <TeamProfile /> </Route>
          <Route exact path='/Auction'> <ChoosePlayer /> </Route>
          
        </Switch>


      </Router>

    </div>
  );
}

export default App;
