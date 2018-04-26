import * as React from 'react'
// import HexMap from './components/HexMap'
// import Physicians from './pages/Physicians.jsx'
// import Header from './components/Header.jsx'
// import DropdownBar from './components/DropdownBar.jsx'
// import Sidebar from './components/Sidebar.jsx'
import SidebarList from './components/SidebarList/index.jsx'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <HexMap /> */}
                {/* <Physicians /> */}
                {/* <Header /> */}
                {/* <Sidebar showBackButton={true} /> */}
                <SidebarList showBackButton={true} />
                {/* <DropdownBar showBackButton={true} /> */}
            </div>
        )
    }
}

export default App
