import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import HelpButton from '../components/HelpButton';
import DropdownBar from '../components/DropdownBar.jsx';
import HexMap from '../components/HexMap';
// import Map from '../components/Map.jsx';

const ExploreContainer = styled.div`
    border: 2px solid red;
    height: 100%;
    right: 0;
    padding-top: 50px;
    position: absolute;
    top: 0;
    width: 75%;
`;

const MarkedText = styled.span`
    background-color: pink;
`;

export default class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapView: true
        };
    }
    handleView = () => {
        console.log('handle explore view');
        this.setState({ mapView: !this.state.mapView });
    }
    render() {
        return (
            <div>
                <Sidebar
                    border={true}
                    header={'What we know so far.'}
                    buttonLabel={'I want to add missing data'}
                    showBackButton={!this.state.mapView}
                    backCallback={() => this.handleView}
                >
                    <div>
                        {'In this area we know that out of '}
                        <MarkedText>{'23.401'}</MarkedText>
                        {' physicians there were '}
                        <MarkedText>{'12.587'}</MarkedText>
                        {' medical students '},
                        <MarkedText>{'5.012'}</MarkedText>
                        {' dental medicine students and '}
                        <MarkedText>{'2.345'}</MarkedText>
                        {' pharmaceutic students who went to '}
                        <MarkedText>{'14'}</MarkedText>
                        {' institutions and came from '}
                        <MarkedText>{'4.233'}</MarkedText>
                        {' places between '}
                        <MarkedText>{'1860'}</MarkedText>
                        {' and '}
                        <MarkedText>{'1980'}</MarkedText>
                        {'. We also know that there were '}
                        <MarkedText>{'4.301'}</MarkedText>
                        {' male and '}
                        <MarkedText>{'2.021'}</MarkedText>
                        {' female physicians.'}
                    </div>

                    <button>{'I want to contribute'}</button>
                    <button onClick={this.handleView}>{'I want see the physicians'}</button>
                </Sidebar>

                <ExploreContainer mapView={this.state.mapView}>
                    <DropdownBar />
                    <HelpButton />
                    {/* <Map /> */}
                    {
                        this.state.mapView ? (
                            <HexMap />
                        ) : (
                            <div>{'points physicians'}</div>
                        )
                    }
                </ExploreContainer>
            </div>
        );
    }
}
