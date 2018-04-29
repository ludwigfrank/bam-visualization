import * as React from 'react'
import styled from 'styled-components'

import SelectInput from './SelectInput.jsx'
import HelpButton from './HelpButton';
import WorldButton from './WorldButton';

const ProjectTitleContainer = styled.div`
    border: 2px solid red;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export default class DropdownBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        const wrapperStyle = {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px',
            borderRadius: '4px',
            display: 'inline-block',
            flex: 1,
            // margin: '0 10px'
        };

        console.log(this.props);

        return (
            <ProjectTitleContainer>
                {
                    this.props.showWorldButton && (
                        <WorldButton />
                    )
                }
                {
                    this.props.options.map((option, index) => {
                        return (
                            <SelectInput
                                name="form-field-name"
                                key={`selectInput-${index}`}
                                wrapperStyle={wrapperStyle}
                                selectCallback={this.props.selectCallback}
                                options={option.options}
                                placeholder={option.type}
                            />
                        );
                    })
                }
                {
                    this.props.showHelp && (
                        <HelpButton />
                    )
                }
            </ProjectTitleContainer>
        );
    }
}
