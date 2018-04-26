import * as React from 'react'
// import HexMap from './components/HexMap'
// import Physicians from './pages/Physicians.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <HexMap /> */}
                {/* <Physicians /> */}
                <Header />
                <Sidebar showBackButton={true} />
            </div>
        )
    }
}

export default App
