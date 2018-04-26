import * as React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid lightgray;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    height: 50px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
`;
const ProjectTitle = styled.div`
    font-family: 'plex-semibold';
    font-size: 18px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    a {
        color: black;
        text-decoration: none;
    }
`;
const MenuItems = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);

    li {
        margin-right: 20px;
    }
    a {
        color: black;
        text-decoration: none;
    }
`;

export default class Header extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <HeaderContainer>
                <ProjectTitle><a href={'#'}>{'Blacks in American Medizine'}</a></ProjectTitle>
                <MenuItems>
                    <li><a href={'#'}>{'About'}</a></li>
                    <li><a href={'#'}>{'Explore'}</a></li>
                    <li><a href={'#'}>{'Stories'}</a></li>
                    <li><a href={'#'}>{'Search'}</a></li>
                    <li><a href={'#'}>{'Contribute'}</a></li>
                </MenuItems>
            </HeaderContainer>
        );
    }
}
