import * as React from 'react'
import styled from 'styled-components'
// import HexMap from './components/HexMap'
import DotGrid from '../components/DotGrid/index.jsx'

const FilterButton = styled.button`
    border: 2px solid red;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
`;

class Physicians extends React.Component {
    render() {
        const filterValues = [
            {
                value: 'program',
                buttonLabel: 'Progam'
            },
            {
                value: 'gender',
                buttonLabel: 'Gender'
            },
            {
                value: 'institution',
                buttonLabel: 'Institution'
            }
        ];

        return (
            <div className="physicians">
                {
                    filterValues.map(filterValue => {
                        return (
                            <FilterButton
                                onClick={() => console.log('filter button')}
                            >
                                {filterValue.buttonLabel}
                            </FilterButton>
                        );
                    })
                }
                <DotGrid />
            </div>
        )
    }
}

export default Physicians
