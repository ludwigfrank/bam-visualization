import * as React from 'react'
import styled from 'styled-components'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SidebarContainer = styled.div`
    border-right: 2px solid gray;
    background-color: white;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: ${props => props.expanded ? 'translate(20%)' : 'translate(0%)'};
    transition: transform 1s;
    width: 300px;
`;
const BackButton = styled.div`
    border: 2px solid red;
    padding-top: 10px;
    position: relative;

    &::before {
        background-color: white;
        border: 2px solid gray;
        border-radius: 100%;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        content: '<';
        height: 30px;
        left: 0;
        line-height: 28px;
        top: 0;
        position: absolute;
        width: 30px;
    }
`;
const SidebarContent = styled.div`
    border: 2px solid red;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 100%;
`  
const AddDataButton = styled.button`
    background-color: orange;
    bottom: 0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border: none;
    border-radius: 2px;
    color: white;
    font-size: 16px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 150px;
`;

    export default class Sidebar extends React.Component {
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
        return (
            <SidebarContainer expanded={this.state.expanded}>
                <BackButton
                    onClick={this.hideSidebar}
                >
                    {'Back to map'}
                </BackButton>
                
                <SidebarContent>
                    {'I want to see'}
                    <span>
                        <Select
                            name="form-field-name"
                            value={selectedOption}
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
                            onChange={this.handleSelectChange}
                            options={[
                                { value: '1980', label: '1980' },
                                { value: '1981', label: '1981' },
                            ]}
                        />
                        {'.'}
                        {'I want to see'}
                        {'who are'}
                        <Select
                            name="form-field-name"
                            value={selectedOption}
                            onChange={this.handleSelectChange}
                            options={[
                                { value: 'female', label: 'female' },
                                { value: 'male', label: 'male' },
                                { value: 'femaleMale', label: 'female male' }
                            ]}
                        />
                        {'.'}
                    </span>

                </SidebarContent>

                <AddDataButton
                    onClick={this.addMissingData}
                >
                    {'I want to add missing data'}
                </AddDataButton>
            </SidebarContainer>
        );
    }
}
