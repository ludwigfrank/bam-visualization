import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import StartPage from './pages/StartPage.jsx'
import About from './pages/About.jsx'
import Explore from './pages/Explore.jsx'
import Stories from './pages/Stories.jsx'
import Search from './pages/Search.jsx'
import Contribute from './pages/Contribute.jsx'


// import HexMap from './components/HexMap'
// import Physicians from './pages/Physicians.jsx'
// import DropdownBar from './components/DropdownBar.jsx'
// import Sidebar from './components/Sidebar.jsx'
// import SidebarList from './components/SidebarList/index.jsx'

// import PhysiciansSearch from '../../pages/PhysiciansSearch.jsx'
// import StoriesView from '../../pages/StoriesView.jsx'
import MapView from './pages/MapView.jsx'
import Physicians from './pages/Physicians.jsx'

const Main = () => (
    <div>
      <Switch>
        <Route exact path='/' component={StartPage}/>
        <Route path='/about' component={StartPage}/>
        <Route path='/explore' component={Explore}/>
        <Route path='/stories' component={Stories}/>
        <Route path='/search' component={Search}/>
        <Route path='/contribute' component={Contribute}/>

        <Route path='/mapview' component={MapView}/>
        <Route path='/physicians' component={Physicians}/>
      </Switch>
    </div>
);

export default Main;
