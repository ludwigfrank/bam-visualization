import * as React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js'

import Sidebar from '../components/Sidebar';
import FilterSidebar from '../components/FilterSidebar';
import DropdownBar from '../components/DropdownBar.jsx';
import HexMap from '../components/HexMap';
import SearchDotGrid from '../components/SearchDotGrid';
import Tooltip from '../components/Tooltip.jsx';
// import Map from '../components/Map.jsx';

const ExploreContainer = styled.div`
    // border: 2px solid red;
    height: 100%;
    right: 0;
    padding: 70px 3% 30px 3%;
    position: absolute;
    top: 0;
    width: 75%;
`;
const MarkedText = styled.span`
    background-color: ${props => props.color};
`;
const FilterButtonContainer = styled.div`
    // border: 2px solid red;
    display: flex;
    justify-content: space-between;
    margin: 0 30% 30px 30%;
    width: 40%;
`;
const FilterButton = styled.button`
    color: ${props => props.active ? 'white' : 'black'};
    background-color: ${props => props.active ? 'orange' : 'white'};
    border: none;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    cursor: pointer;
    font-size: 1em;
    padding: 3px 10px;
    text-align: center;
`;
const FilterValuesContainer = styled.div`
    // border: 2px solid orange;
    display: flex;
    font-family: plex-semibold;
    justify-content: space-around;
    margin: 10px 0;
`;
const FilterValuesContainerBottom = styled.div`
    display: flex;
    font-family: plex-semibold;
    justify-content: space-around;
    margin: 10px 0;
    position: absolute;
    bottom: 30px;
    position: absolute;
    width: 100%;
`;
const FilterValue = styled.div`
    // border: 2px solid green;
    font-family: plex-semibold;
    text-align: center;
`;
const FilterValueAmount = styled.div`
    margin-bottom: 3px;
`;
const FilterValuePercentage = styled.div`
    font-family: plex-regular;
    font-size: 14px;
`;

export default class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.dotGrid = React.createRef();
        this.mousePosition = { x: 100, y: 100 },

        this.state = {
            mapView: true,
            groups: undefined,
            doctorsLength: undefined,
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
                    active: false
                },
                {
                    value: 'sex',
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
                label: 'I want to see the physicians',
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
                <FilterSidebar
                    backCallback={() => this.handleView}
                    showBackButton
                />
                <ExploreContainer mapView={this.state.mapView}>
                    {
                        this.props.showDropdownBar ? (
                            <DropdownBar
                                options={this.state.dropdownOptions}
                                showHelp
                                showWorldButton
                                selectCallback={(selectedOption) => this.handleSelectChange(selectedOption)}
                                placeholder={'placeholder'}
                            />
                        ) : (
                            <FilterButtonContainer>
                                {
                                    this.state.filterValues.map((filterValue, index) => {
                                        return (
                                            <FilterButton
                                                onClick={() => {
                                                    const updatedFilterValues = this.state.filterValues;
                                                    updatedFilterValues.forEach((value, i) => {
                                                        if (index === i) {
                                                            updatedFilterValues[i].active = true
                                                        } else {
                                                            updatedFilterValues[i].active = false
                                                        }
                                                    });
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
                    <FilterValuesContainer>
                        {
                            this.state.groups
                                ? Object.keys(this.state.groups).map((key, index) => {
                                    const group = this.state.groups[key];
                                    const groupPercentage = group.length / this.state.doctorsLength * 100;
                                    return (
                                        <FilterValue>
                                            <FilterValueAmount>{group.length}</FilterValueAmount>
                                            <FilterValuePercentage>{`${groupPercentage.toFixed()}%`}</FilterValuePercentage>
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
                        groupsCallback={(groups, doctorsLength) => this.setState({ groups, doctorsLength })}
                        tooltipCallback={(showTooltip, content) => this.handleTooltip(showTooltip, content)}
                    />
                    <FilterValuesContainerBottom>
                        {
                            this.state.groups
                                ? Object.keys(this.state.groups).map((key, index) => {
                                    const value = typeof key !== 'string' || key === '' ? 'no data' : key;
                                    return (
                                        <FilterValue>
                                            {value}    
                                        </FilterValue>
                                    )
                                })
                                : (
                                    <FilterValue>
                                        {'All'}    
                                    </FilterValue>
                                )
                        }
                    </FilterValuesContainerBottom>
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
