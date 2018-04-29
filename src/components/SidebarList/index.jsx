import * as React from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
    border: 2px solid red;
    margin-top: 20px;
    position: relative;
    width: 100%;
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
    render() {
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
                        {'Known for'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'First African-American surgeon at Harlem Hospital; chairman of the NAACP'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Medical Education'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'Clark Atlanta University 1908-1911'}</div>
                        <div>{'Harvard Medical School 1911-1915'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Geo locations'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'map image'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Professional Positions'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'Army Medical Corps France 1915-1918'}</div>
                        <div>{'Private Practice Harlem, New York 1915-1918'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Related Physicians'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'Dr. Myra Adele Logan'}</div>
                        <div>{'Dr. Dorothy Lavinia Brown'}</div>
                    </RowItemRight>
                </ListRow>
                <ListRow>
                    <RowItemLeft>
                        {'Related Documents'}
                    </RowItemLeft>
                    <RowItemRight>
                        <div>{'Press Release: Outstanding Teacher, Physician, Civic an…'}</div>
                    </RowItemRight>
                </ListRow>
            </ListContainer>
        );
    }
}
