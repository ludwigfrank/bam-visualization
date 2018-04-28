import * as React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js'

import Sidebar from '../components/Sidebar';
import DropdownBar from '../components/DropdownBar.jsx';
import HexMap from '../components/HexMap';
import SearchDotGrid from '../components/SearchDotGrid';
import Tooltip from '../components/Tooltip.jsx';
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
    background-color: ${props => props.color};
`;

const FilterButtonContainer = styled.div`
    border: 2px solid red;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const FilterButton = styled.button`
    color: ${props => props.active ? 'white' : 'black'};
    background-color: ${props => props.active ? 'orange' : 'white'};
    border: none;
    border-radius: 2px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    font-size: 18px;
    padding: 3px 10px;
    text-align: center;
`;
const FilterValuesContainer = styled.div`
    border: 2px solid orange;
    display: flex;
    justify-content: space-around;
`;
const FilterValue = styled.div`
    border: 2px solid green;
`;

export default class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.dotGrid = React.createRef();
        this.mousePosition = { x: 100, y: 100 },

        this.state = {
            mapView: true,
            groups: undefined,
            showTooltip: false,
            tooltipContent: '',
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
    handleTooltip = (showTooltip, tooltipContent) => {
        this.setState({
            showTooltip,
            tooltipContent
        });
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

        const chromaColor = chroma
            .scale(['white', 'orange'])
            .domain([0, 23401])
            .mode('lab');

        return (
            <div onMouseMove={e => {
                this.mousePosition = {x: e.clientX, y: e.clientY};
            }}>
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
                        <MarkedText color={chromaColor(23401)}>{'23.401'}</MarkedText>
                        {' physicians there were '}
                        <MarkedText color={chromaColor(12587)}>{'12.587'}</MarkedText>
                        {' medical students, '}
                        <MarkedText color={chromaColor(5012)}>{'5.012'}</MarkedText>
                        {' dental medicine students and '}
                        <MarkedText color={chromaColor(2345)}>{'2.345'}</MarkedText>
                        {' pharmaceutic students who went to '}
                        <MarkedText color={chromaColor(14)}>{'14'}</MarkedText>
                        {' institutions and came from '}
                        <MarkedText color={chromaColor(4233)}>{'4.233'}</MarkedText>
                        {' places between '}
                        <MarkedText color={chromaColor(1860)}>{'1860'}</MarkedText>
                        {' and '}
                        <MarkedText color={chromaColor(1980)}>{'1980'}</MarkedText>
                        {'. We also know that there were '}
                        <MarkedText color={chromaColor(4301)}>{'4.301'}</MarkedText>
                        {' male and '}
                        <MarkedText color={chromaColor(2021)}>{'2.021'}</MarkedText>
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
                    <FilterValuesContainer>
                        {
                            this.state.groups
                                ? Object.keys(this.state.groups).map((key, index) => {
                                    const group = this.state.groups[key];
                                    return (
                                        <FilterValue>
                                            <div>{group.length}</div>
                                            <div>{'X %'}</div>
                                        </FilterValue>
                                    )
                                })
                                : (
                                    <FilterValue>
                                        {'All'}    
                                    </FilterValue>
                                )
                        }
                    </FilterValuesContainer>
                    <SearchDotGrid
                        ref={this.dotGrid}
                        groupsCallback={groups => this.setState({ groups })}
                        tooltipCallback={(showTooltip, content) => this.handleTooltip(showTooltip, content)}
                    />
                    <FilterValuesContainer>
                        {
                            this.state.groups
                                ? Object.keys(this.state.groups).map((key, index) => {
                                    return (
                                        <FilterValue>
                                            {key}    
                                        </FilterValue>
                                    )
                                })
                                : (
                                    <FilterValue>
                                        {'All'}    
                                    </FilterValue>
                                )
                        }
                    </FilterValuesContainer>
                </ExploreContainer>
                <Tooltip
                    active={this.state.showTooltip}
                    position={this.mousePosition}
                    content={this.state.tooltipContent}
                >
                    {this.state.tooltipContent}
                </Tooltip>
            </div>
        );
    }
}
