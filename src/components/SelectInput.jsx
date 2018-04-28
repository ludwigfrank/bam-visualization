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
    handleChange = (option) => {
        console.log(option);
        if (this.props.selectCallback) {
            this.props.selectCallback(option);
        }
        this.setState({ selectedOption: option });
    }
    render () {
        const { selectedOption } = this.state;
        return (
            <Select
                name="form-field-name"
                value={selectedOption}
                wrapperStyle={this.props.wrapperStyle}
                onChange={this.handleChange}
                options={this.props.options}
                placeholder={this.props.placeholder}
            />
        );
    }
}
