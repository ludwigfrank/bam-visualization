import * as React from 'react'
import Header from './components/Header.jsx'
import Main from './Main.jsx'

import './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import './lib/css/sanitize.js'

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Header />
                    <Main />
                    {/* <Physicians /> */}
                    {/* <SidebarList showBackButton={true} /> */}
                </div>
            </ThemeProvider>
        )
    }
}

export default App
