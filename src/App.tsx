import * as React from 'react'
import HexMap from './components/HexMap'
// import HexagonMap from './components/HexagonMap'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <HexMap />
                {/* <HexagonMap /> */}
            </div>
        )
    }
}

export default App
