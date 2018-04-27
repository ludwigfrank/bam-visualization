import * as React from 'react'
import styled from 'styled-components'
import HelpButton from '../components/HelpButton';


const SearchBarContainer = styled.div`
    border: 2px solid blue;
    width: 100%;
`;

export default class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <SearchBarContainer>
                {'search bar container'}
                <HelpButton />
            </SearchBarContainer>
        );
    }
}
