import * as React from 'react'
import HexMap from './components/HexMap'
import './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import './lib/css/sanitize.js'

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <HexMap />
            </ThemeProvider>
        )
    }
}

export default App
