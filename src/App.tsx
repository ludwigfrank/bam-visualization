import * as React from 'react'
// import HexMap from './components/HexMap'
// import Physicians from './pages/Physicians.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <HexMap /> */}
                {/* <Physicians /> */}
                <Sidebar showBackButton={true} />
            </div>
        )
    }
}

export default App
