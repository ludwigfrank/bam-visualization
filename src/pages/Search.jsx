import * as React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar';
import SearchDotGrid from '../components/SearchDotGrid';
import DropdownBar from '../components/DropdownBar.jsx';

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

        this.state = {
        };
    }
    render() {
        return (
            <SearchPage>
               <SearchBar />
               <DropdownBar />
               <SearchDotGrid />
            </SearchPage>
        )
    }
}
