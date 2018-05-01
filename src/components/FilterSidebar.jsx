import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Select from 'react-select';

import 'react-select/dist/react-select.css';

const SidebarContainer = styled.div`
    border-right: 1px solid lightgray;
    background-color: white;
    height: 100%;
    left: 0;
    line-height: 1.5em;
    padding: 80px 1% 0 1%;
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
    margin-bottom: 40px;
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
    
    a {
        color: black;
        text-decoration: none;
    }
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
const SidebarHeadline = styled.h2`
    font-family: plex-semibold;
    font-size: 16px;
`;

export default class FilterSidebar extends React.Component {
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
    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }
    render () {
        const { selectedOption } = this.state;

        const wrapperStyle = {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px',
            borderRadius: '4px',
            display: 'inline-block',
            flex: 1,
            margin: '0 10px',
            top: '6px',
            width: '120px'
        };
        const wrapperStyleDate = {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px',
            borderRadius: '4px',
            display: 'inline-block',
            flex: 1,
            margin: '0 10px',
            top: '6px',
            width: '80px'
        };

        return (
            <SidebarContainer expanded={this.state.expanded} border>
                    {
                        this.props.showBackButton && (
                            <BackButton
                                onClick={this.props.backCallback()}
                            >
                                <Link to={'/explore'}>{'Back to map'}</Link>
                            </BackButton>
                        )
                    }
                    <SidebarHeadline>{'I want to see'}</SidebarHeadline>
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyle}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: 'dentalMedicine', label: 'dental medicine' },
                            { value: 'physician', label: 'physician' },
                        ]}
                    />
                    {'students at'}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyle}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: 'allInstitutions', label: 'all institutions' },
                            { value: 'havard', label: 'havard' },
                        ]}
                    />
                    {'who came from'}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyle}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: 'virginia ', label: 'Virginia ' },
                            { value: 'newYork', label: 'New York' },
                        ]}
                    />
                    {'between'}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyleDate}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: '1860', label: '1860' },
                            { value: '1861', label: '1861' },
                        ]}
                    />
                    {'and'}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyleDate}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: '1980', label: '1980' },
                            { value: '1981', label: '1981' },
                        ]}
                    />
                    {'. '}
                    {'I want to see '}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyle}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: 'female', label: 'female' },
                            { value: 'male', label: 'male' },
                            { value: 'femaleMale', label: 'female & male' }
                        ]}
                    />
                    {'who are'}
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        placeholder={'test'}
                        wrapperStyle={wrapperStyle}
                        onChange={this.handleSelectChange}
                        options={[
                            { value: 'female', label: 'female' },
                            { value: 'male', label: 'male' },
                            { value: 'femaleMale', label: 'female & male' }
                        ]}
                    />
                    {'.'}

                <AddDataButton
                    onClick={this.addMissingData}
                >
                    {'I want to add missing data'}
                </AddDataButton>
            </SidebarContainer>
        );
    }
}
