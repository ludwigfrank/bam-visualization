import * as React from 'react'
// import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';
import styled from 'styled-components'

import PhysicianTileGrid from '../components/PhysicianTileGrid.jsx';
import StoriesTileGrid from '../components/StoriesTileGrid.jsx';

const StoriesContainer = styled.div`
    border: 2px solid green;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 75%;
`;
const StoriesContainerInner = styled.div`
    border: 2px solid orange;
    height: 50%;
    width: 100%;
`;
const StoriesBar = styled.div`
    border: 2px solid blue;
    width: 100%;
`;
const Headline = styled.h3`
    border: 2px solid yellow;
`;
const Content = styled.div`
    border: 2px solid blue;
`;

export default class Stories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        const sidebarButtons = [
            {
                label: 'I want to contribute',
                src: '/contribute',
                filled: true
            }
        ];
        return (
            <div>
               {/* <Sidebar
                    border={true}
                    header={'Stories told with the archive'}
                    buttonLabel={'I want to add missing data'}
                    buttons={sidebarButtons}
                >
                   {"Lorem ipsum dolor amet disrupt cornhole keytar coloring book umami. Tacos bespoke slow-carb umami humblebrag. Forage actually typewriter pok pok chambray readymade flexitarian. Quinoa hexagon vexillologist small batch, hoodie swag paleo subway tile bespoke. Blog kale chips salvia direct trade shabby chic yr readymade portland ugh gastropub echo park organic chillwave. Roof party 90's tbh cronut, fanny pack keytar subway tile fixie. Single-origin coffee marfa waistcoat +1 leggings hammock."}
               </Sidebar> */}
               <SidebarList showBackButton={true} />
               <StoriesContainer>
                    <StoriesContainerInner>
                        <StoriesBar>
                            <Headline>
                                {'Stories about our physicians'}
                            </Headline>
                        </StoriesBar>
                        <Content>
                            <PhysicianTileGrid />
                        </Content>
                    </StoriesContainerInner>
                    <StoriesContainerInner>
                        <StoriesBar>
                            <Headline>
                                {'Stories about our archive'}
                            </Headline>
                        </StoriesBar>
                        <Content>
                            <StoriesTileGrid />
                        </Content>
                    </StoriesContainerInner>
               </StoriesContainer>
            </div>
        )
    }
}
