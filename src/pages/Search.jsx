import * as React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar';
import SearchDotGrid from '../components/SearchDotGrid';
import DocumentTiles from '../components/DocumentTiles';
import DropdownBar from '../components/DropdownBar.jsx';
import Tooltip from '../components/Tooltip.jsx';

const SearchPage = styled.div`
    // border: 3px solid green;
    bottom: 0;
    height: calc(100% - 50px);
    position: absolute;
    top: 50px;
    width: 100%;
`;
export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.mousePosition = { x: 100, y: 100 };

        this.state = {
            documentView: false,
            showTooltip: false,
            tooltipContent: ''
        };
    }
    handleTooltip = (showTooltip, tooltipContent) => {
        this.setState({
            showTooltip,
            tooltipContent
        });
    }
    render() {
        const dropdownOptions = [
            {
                options: [
                    { value: 'physicians', label: 'Physicians' },
                    { value: 'documents', label: 'Documents' },
                ],
                type: 'Type'
            },
            {
                options: [
                    { value: 'boston', label: 'Boston' },
                    { value: 'new-york', label: 'New York' },
                ],
                type: 'Place'
            },
            {
                options: [
                    { value: 'dentalMedicine', label: 'dental medicine' },
                    { value: 'physician', label: 'physician' },
                ],
                type: 'Profession'
            },
            {
                options: [
                    { value: 'female', label: 'female' },
                    { value: 'male', label: 'male' },
                    { value: 'femaleMale', label: 'female & male' },
                ],
                type: 'Gender'
            },
            {
                options: [
                    { value: 'dentalMedicine', label: 'dental medicine' },
                    { value: 'physician', label: 'physician' },
                ],
                type: 'Time'
            },
            {
                options: [
                    { value: 'dentalMedicine', label: 'dental medicine' },
                    { value: 'physician', label: 'physician' },
                ],
                type: 'Other'
            },
        ];

        return (
            <SearchPage onMouseMove={e => {
                this.mousePosition = {x: e.clientX, y: e.clientY};
            }}>
               <SearchBar />
               <DropdownBar
                    options={dropdownOptions}
                    selectCallback={() => this.setState({ documentView: !this.state.documentView })}
                />
               {
                   this.state.documentView ? (
                        <DocumentTiles />
                   ) : (
                        [
                            <SearchDotGrid
                                ref={this.dotGrid}
                                // groupsCallback={(groups, doctorsLength) => this.setState({ groups, doctorsLength })}
                                tooltipCallback={(showTooltip, content) => this.handleTooltip(showTooltip, content)}
                            />,
                            <Tooltip
                                active={this.state.showTooltip}
                                position={this.mousePosition}
                                content={this.state.tooltipContent}
                            >
                                {this.state.tooltipContent}
                            </Tooltip>
                        ]
                   )
               }
            </SearchPage>
        )
    }
}
