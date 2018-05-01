import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

const PageFade = (props) => (
  <CSSTransition 
    {...props}
    classNames="fadeTranslate"
    timeout={1000}
    mountOnEnter={true}
    unmountOnExit={true}
  />
)

import StartPage from './pages/StartPage.jsx'
import About from './pages/About.jsx'
import Explore from './pages/Explore.jsx'
import ExploreDots from './pages/ExploreDots.jsx'
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

const Main = (props) => {
  return (
    <div>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className={'switch-wrapper'}
      >
        <Route exact path='/' component={StartPage}/>
        <Route path='/about' component={StartPage}/>
        <Route path='/explore' component={Explore}/>
        <Route path='/dots' component={ExploreDots}/>
        <Route path='/stories' component={Stories}/>
        <Route path='/search' component={Search}/>
        <Route path='/contribute' component={Contribute}/>

        <Route path='/mapview' component={MapView}/>
        <Route path='/physicians' component={Physicians}/>
      </AnimatedSwitch>
    </div>
  )
};

export default Main;
