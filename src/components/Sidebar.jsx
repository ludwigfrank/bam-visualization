import * as React from 'react'
import styled from 'styled-components'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SidebarContainer = styled.div`
    border-right: 2px solid gray;
    background-color: white;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: ${props => props.expanded ? 'translate(20%)' : 'translate(0%)'};
    transition: transform 1s;
    width: 300px;
`;
const BackButton = styled.div`
    border: 2px solid red;
    padding-top: 10px;
    position: relative;
    margin-left: 100px;

    &::before {
        background-color: white;
        border: 2px solid gray;
        border-radius: 100%;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        content: '<';
        height: 30px;
        left: 0;
        position: absolute;
        top: 0;
        width: 30px;
    }
`;
const AddDataButton = styled.button`
    background-color: orange;
    bottom: 0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border: none;
    border-radius: 2px;
    color: white;
    position: absolute;
    right: 0;
`;

const SidebarContent = styled.div`
    border: 2px solid red;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
`;

export default class Sidebar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            expanded: false
        }

        this.hideSidebar = this.hideSidebar.bind(this);
    }
    hideSidebar() {
        console.log('hide sidebar');
        this.setState({ expanded: !this.state.expanded });
    }
    addMissingData() {
        console.log('add missing data');
    }
    render () {
        return (
            <SidebarContainer expanded={this.state.expanded}>
                <BackButton
                    onClick={this.hideSidebar}
                >
                    {'Back to map'}
                </BackButton>
                
                <SidebarContent>
                    {'I want to see'}
                    <div>
                        {'dental medicine students at all institutions who came from Virginia between 1860 and 1980. I want to see Physicians who are female & male.'}
                    </div>
                </SidebarContent>

                <AddDataButton
                    onClick={this.addMissingData}
                >
                    {'I want to add missing data'}
                </AddDataButton>
            </SidebarContainer>
        );
    }
}
