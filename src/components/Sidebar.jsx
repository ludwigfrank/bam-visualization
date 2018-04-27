import * as React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
    border-right: ${props => props.border ? '1px solid lightgray' : 'none'};
    background-color: white;
    height: 100%;
    left: 0;
    line-height: 1.5em;
    padding-top: 50px;
    position: absolute;
    top: 0;
    transform: ${props => props.expanded ? 'translate(20%)' : 'translate(0%)'};
    transition: transform 1s;
    width: 25%;
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
    font-family: plex-semibold;
`;
const SidebarContent = styled.div`
    // border: 2px solid red;
    position: absolute;
    left: 0;

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
const AddDataButton = styled.button`
    background-color: orange;
    bottom: 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    left: 50%;
    padding: 10px 0;
    position: absolute;
    transform: translate(-50%, 0);
    width: 90%;
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
                            {'Back to map'}
                        </BackButton>
                    )
                }
                
                <SidebarContent>
                    <SidebarHeader>
                        {this.props.header}
                    </SidebarHeader>
                    {this.props.children}
                </SidebarContent>

                <AddDataButton
                    onClick={this.addMissingData}
                >
                    {this.props.buttonLabel}
                </AddDataButton>
            </SidebarContainer>
        );
    }
}
