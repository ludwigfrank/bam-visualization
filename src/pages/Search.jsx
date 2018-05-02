import * as React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar';
import SearchDotGrid from '../components/SearchDotGrid';
import DocumentTiles from '../components/DocumentTiles';
import DropdownBar from '../components/DropdownBar.jsx';
import Tooltip from '../components/Tooltip.jsx';

import dotDetailImage from '../images/dot-detail.png';

const SearchPage = styled.div`
    // border: 3px solid green;
    bottom: 0;
    height: calc(100% - 50px);
    position: absolute;
    top: 50px;
    width: 100%;
`;
const DotDetailImage = styled.img`
    // border: 3px solid green;
    width: 98%;
`;
export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.mousePosition = { x: 100, y: 100 };

        this.state = {
            documentView: false,
            showTooltip: false,
            tooltipContent: '',
            detailtView: false
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
                    { value: 'virginia', label: 'Virginia' },
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

        console.log(this.state.detailtView, this.state.documentView);

        return (
            <SearchPage onMouseMove={e => {
                this.mousePosition = {x: e.clientX, y: e.clientY};
            }}>
               <SearchBar />
               <DropdownBar
                    options={dropdownOptions}
                    selectCallback={(value) => {
                        const changedValue = value.value;
                        if (changedValue === 'documents') {
                            this.setState({ documentView: true });
                        } else if (changedValue === 'physicians') {
                            this.setState({ documentView: false });
                        } else {
                            this.setState({ detailtView: !this.state.detailtView });
                        }
                    }}
                />
                {
                    this.state.documentView && (
                        <DocumentTiles />
                    )
                }
                {
                    (!this.state.documentView && !this.state.detailtView) && (
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
               {
                   this.state.detailtView && !this.state.documentView ? (
                        <DotDetailImage src={dotDetailImage} />
                   ) : null
               }
            </SearchPage>
        )
    }
}
