import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import DropdownBar from '../components/DropdownBar.jsx';
import HexMap from '../components/HexMap';
import SearchDotGrid from '../components/SearchDotGrid';
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

const FilterButtonContainer = styled.div`
    border: 2px solid red;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const FilterButton = styled.button`
    background-color: ${props => props.active ? 'orange' : 'white'};
    border: none;
    border-radius: 2px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    font-size: 18px;
    padding: 3px 10px;
    text-align: center;
`;

export default class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.dotGrid = React.createRef();

        this.state = {
            mapView: true,
            dropdownOptions: [
                [
                    { value: 'name', label: 'name' },
                    { value: 'value', label: 'value' },
                ],
                [
                    { value: 'name', label: 'name' },
                    { value: 'value', label: 'value' },
                ],
                [
                    { value: 'name', label: 'name' },
                    { value: 'value', label: 'value' },
                ]
            ],
            filterValues: [
                {
                    value: 'name',
                    buttonLabel: 'Progam',
                    active: true
                },
                {
                    value: 'value',
                    buttonLabel: 'Gender',
                    active: false
                },
                {
                    value: 'institution',
                    buttonLabel: 'Institution',
                    active: false
                }
            ]
        };
    }
    handleView = () => {
        console.log('handle explore view');
        this.setState({ mapView: !this.state.mapView });
    }
    handleSelectChange = (selectedOption) => {
        console.log(selectedOption);
        this.dotGrid.current.updatePointPosition(selectedOption.value);
    }
    render() {
        const sidebarButtons = [
            {
                label: 'I want to contribute',
                src: '/',
                filled: true
            },
            {
                label: 'I want see the physicians',
                src: '/',
                filled: false,
                buttonCallback: () => this.handleView
            }
        ];

        return (
            <div>
                <Sidebar
                    border={true}
                    header={'What we know so far.'}
                    buttonLabel={'I want to add missing data'}
                    showBackButton={!this.state.mapView}
                    backCallback={() => this.handleView}
                    buttons={sidebarButtons}
                >
                    <div>
                        {'In this area we know that out of '}
                        <MarkedText>{'23.401'}</MarkedText>
                        {' physicians there were '}
                        <MarkedText>{'12.587'}</MarkedText>
                        {' medical students, '}
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
                </Sidebar>

                <ExploreContainer mapView={this.state.mapView}>
                    {
                        this.props.showDropdownBar ? (
                            <DropdownBar
                                options={this.state.dropdownOptions}
                                showHelp
                                showWorldButton
                                selectCallback={(selectedOption) => this.handleSelectChange(selectedOption)}
                            />
                        ) : (
                            <FilterButtonContainer>
                                {
                                    this.state.filterValues.map((filterValue, index) => {
                                        return (
                                            <FilterButton
                                                onClick={() => {
                                                    const updatedFilterValues = this.state.filterValues;
                                                    updatedFilterValues[index].active = !updatedFilterValues[index].active
                                                    this.setState({
                                                        filterValues: updatedFilterValues
                                                    });

                                                    console.log(updatedFilterValues[index]);
                                                    this.handleSelectChange(updatedFilterValues[index])
                                                }}
                                                active={filterValue.active}
                                                key={`filterButton-${index}`}
                                            >
                                                {filterValue.buttonLabel}
                                            </FilterButton>
                                        );
                                    })
                                }
                            </FilterButtonContainer>
                        )
                    }
                    
                    {/* <Map /> */}
                    {/* {
                        this.state.mapView ? (
                            <HexMap />
                        ) : (
                            <div>{'points physicians'}</div>
                        )
                    } */}
                    <SearchDotGrid ref={this.dotGrid} />
                </ExploreContainer>
            </div>
        );
    }
}
