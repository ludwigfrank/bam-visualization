import * as React from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
    border: 2px solid red;
    position: relative;
    width: 300px;
`;
const ListRow = styled.div`
    border: 2px solid green;
    display: flex;
    width: 100%;
`;
const RowItemLeft = styled.div`
    border: 2px solid orange;
    width: 30%;
`;
const RowItemRight = styled.div`
    border: 2px solid orange;
    width: 70%;
`;

export default class SidebarList extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <ListContainer>
                <ListRow>
                    <RowItemLeft>
                        <img src={'../../images/doctor-dot.png'} />
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'Louis T. Wright'}</div>
                        <div>{'1891 - 1952'}</div>
                        <div>{'Washington'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Birthdate'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'07/23/1891'}</div>
                        <div>{'LaGrang, Georgia'}</div>
                        <div>{'Male'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'item left'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'right item'}</div>
                    </RowItemRight>
                </ListRow>
            </ListContainer>
        );
    }
}
