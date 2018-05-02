import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid ${props => props.theme.color.interface.border};
    height: 50px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
`;
const ProjectTitle = styled.div`
    font-family: 'plex-semibold';
    font-size: 18px;
    left: 20px;
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
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);

    li {
        margin-right: 30px;
    }
    a {
        color: black;
        text-decoration: none;
    }
`;
const ListItem = styled.li`
    font-family: ${props => props.isActive ? 'plex-semibold' : 'plex-regular'};
`;

export default class Header extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        const location = window.location.pathname;
        return (
            <HeaderContainer>
                <ProjectTitle>
                    <Link to='/'>{'Blacks in American Medizine'}</Link>
                </ProjectTitle>
                <MenuItems>
                    {/* <ListItem isActive={location === '/about'}><Link to='/about'>{'About'}</Link></ListItem> */}
                    <ListItem isActive={location === '/explore'}><Link to='/explore'>{'Explore'}</Link></ListItem>
                    <ListItem isActive={location === '/stories'}><Link to='/stories'>{'Stories'}</Link></ListItem>
                    <ListItem isActive={location === '/search'}><Link to='/search'>{'Search'}</Link></ListItem>
                    <ListItem isActive={location === '/contribute'}><Link to='/contribute'>{'Contribute'}</Link></ListItem>
                </MenuItems>
            </HeaderContainer>
        );
    }
}
