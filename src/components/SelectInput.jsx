import * as React from 'react'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectInput extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            selectedOption: ''
        }
    }
    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }
    render () {
        const { selectedOption } = this.state;
        return (
            <Select
                name="form-field-name"
                value={selectedOption}
                wrapperStyle={this.props.wrapperStyle}
                onChange={this.handleSelectChange}
                options={this.props.options}
            />
        );
    }
}
