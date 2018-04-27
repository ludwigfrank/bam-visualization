import * as React from 'react'
import Header from './components/Header.jsx'
import Main from './Main.jsx'

import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Main />
                {/* <HexMap /> */}
                {/* <Physicians /> */}
                {/* <Sidebar showBackButton={true} /> */}
                {/* <SidebarList showBackButton={true} /> */}
                {/* <DropdownBar showBackButton={true} /> */}
            </div>
        )
    }
}

export default App
