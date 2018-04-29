import * as React from 'react'
import styled from 'styled-components'

const PhysicianContainer = styled.div`
    border: 2px solid gray;
    display: flex;
    width: 29%;
`;
const InformationContainer = styled.div`
    border: 2px solid green;
`;
const Image = styled.img`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    min-height: 60px;
    min-width: 60px;
    height: 60px;
    width: 60px;
`;
const Name = styled.div`
    border: 2px solid red;
`;
const Desciption = styled.div`
    border: 2px solid red;
    font-family: plex-semibold;
`;

export default class PhysicianTile extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <PhysicianContainer>
                <Image src={this.props.imageSrc} />
                <InformationContainer>
                    <Name>
                        {this.props.name}
                    </Name>
                    <Desciption>
                        {this.props.description}
                    </Desciption>
                </InformationContainer>
            </PhysicianContainer>
        );
    }
}
