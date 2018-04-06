import * as React from 'react'
import Map from './components/Map'
import TimeSlider from './components/TimeSlider'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TimeSlider />
                <Map />
            </div>
        )
    }
}

export default App
