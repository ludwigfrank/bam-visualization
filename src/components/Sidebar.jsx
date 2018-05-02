import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SidebarContainer = styled.div`
    border-right: 1px solid ${props => props.theme.color.interface.border};
    background-color: white;
    height: 100%;
    left: 0;
    line-height: 1.5em;
    overflow-y: scroll;
    padding-top: 50px;
    position: absolute;
    font-size: 17px;
    top: 0;
    transform: ${props => props.expanded ? 'translate(20%)' : 'translate(0%)'};
    transition: transform 1s;
    width: 30%;
`;
const BackButton = styled.div`
    // border: 2px solid red;
    cursor: pointer;
    line-height: 32px;
    padding-left: 45px;
    position: relative;
    text-align: left;

    &::before {
        background-color: white;
        // border: 2px solid gray;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
        content: '<';
        height: 30px;
        left: 0;
        line-height: 28px;
        text-align: center;
        top: 0;
        position: absolute;
        width: 30px;
    }
`;
const SidebarHeader = styled.h2`
    font-family: 'plex-regular', sans-serif;
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: 200;
`;
const SidebarContent = styled.div`
    // border: 2px solid red;
    padding: 0 52px;
    position: absolute;
    left: 0;
    line-height: 1.8em;
    text-align: left;
    top: 20%;
    width: 100%;

    .Select-control {
        border: none;
        height: 25px;
    }
    .Select-input {
        height: 25px;
    }
    .Select-placeholder {
        color: black;
        font-family: 'plex-semibold';
        line-height: 26px;
    }
`;
const SidebarButtons = styled.div`
    // border: 2px solid red;
    bottom: 25px;
    position: absolute;
    width: 100%;
    padding: 0 52px;
`;
const SidebarButton = styled.button`
    background-color: ${props => props.filled ? 'orange' : 'white'};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    border: none;
    border-radius: 4px;
    color: ${props => props.filled ? 'white' : 'black'};
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px 0;
    width: 100%;

    a {
        color: ${props => props.filled ? 'white' : 'black'};
        text-decoration: none;
    }
`;

    export default class Sidebar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            expanded: false,
            selectedOption: ''
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
        const wrapperStyle = {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px',
            borderRadius: '4px',
            display: 'inline-block',
            margin: '0 10px',
            minWidth: '110px',
            top: '6px'
        };

        return (
            <SidebarContainer
                border={this.props.border}
                expanded={this.state.expanded}
            >
                {
                    this.props.showBackButton && (
                        <BackButton
                            onClick={this.props.backCallback()}
                        >
                            <Link to={'/explore'}>{'Back to map'}</Link>
                        </BackButton>
                    )
                }

                <SidebarContent>
                    <SidebarHeader>
                        {this.props.header}
                    </SidebarHeader>
                    {this.props.children}
                </SidebarContent>

                <SidebarButtons>
                    {
                        this.props.buttons.map((button, index) => {
                            return (
                                <SidebarButton
                                    // onClick={button.buttonCallback()}
                                    key={`sidebarButton-${index}`}
                                    filled={button.filled}
                                >
                                    <Link to={button.src}>{button.label}</Link>
                                </SidebarButton>
                            );
                        })
                    }
                </SidebarButtons>
            </SidebarContainer>
        );
    }
}
