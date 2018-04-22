import * as React from 'react'
import styled from 'styled-components'
// import HexMap from './components/HexMap'
import DotGrid from '../components/DotGrid/index.jsx'

const FilterButtonContainer = styled.div`
    border: 2px solid red;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const FilterButton = styled.button`
    background-color: ${props => props.active ? 'orange' : 'white'};
    border: none;
    border-radius: 2px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    font-size: 18px;
    padding: 3px 10px;
    text-align: center;
`;

class Physicians extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterValues: [
                {
                    value: 'program',
                    buttonLabel: 'Progam',
                    active: true
                },
                {
                    value: 'gender',
                    buttonLabel: 'Gender',
                    active: false
                },
                {
                    value: 'institution',
                    buttonLabel: 'Institution',
                    active: false
                }
            ]
        };
    }
    render() {
        return (
            <div className="physicians">
                <FilterButtonContainer>
                    {
                        this.state.filterValues.map((filterValue, index) => {
                            return (
                                <FilterButton
                                    onClick={() => {
                                        console.log('filter button');
                                        const updatedFilterValues = this.state.filterValues;
                                        updatedFilterValues[index].active = !updatedFilterValues[index].active
                                        this.setState({
                                            filterValues: updatedFilterValues
                                        });
                                    }}
                                    active={filterValue.active}
                                >
                                    {filterValue.buttonLabel}
                                </FilterButton>
                            );
                        })
                    }
                </FilterButtonContainer>
                <DotGrid />
            </div>
        )
    }
}

export default Physicians
