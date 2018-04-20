import * as React from 'react'
// import HexMap from './components/HexMap'
import DotGrid from './components/DotGrid/index.jsx'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <HexMap /> */}
                <DotGrid />
            </div>
        )
    }
}

export default App
