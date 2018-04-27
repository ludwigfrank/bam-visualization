import * as React from 'react'
import styled from 'styled-components'
import HelpButton from '../components/HelpButton';


const SearchBarContainer = styled.div`
    border: 2px solid blue;
    height: 100px;
    position: relative;
    width: 100%;

    input[type=text] {
        border: none;
        border-bottom: 2px solid gray;
        font-size: 18px;
        padding: 5px;
        width: 50vw;
    }
    input[type=submit] {
        background-color: orange;
        border: none;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        padding: 10px 30px;
        margin-left: 30px;
    }
`;
const FormContainer = styled.div`
    display: inline-table;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
                <HelpButton />
                <FormContainer>
                    <form>
                        <label>
                            <input
                                type={'text'}
                                name={'search'}
                                placeholder={'Enter physician’s name, school, place or search for document content'}
                            />
                            <input type={'submit'} value={'Seach Archive'} />
                        </label>
                    </form>
                </FormContainer>
            </SearchBarContainer>
        );
    }
}
