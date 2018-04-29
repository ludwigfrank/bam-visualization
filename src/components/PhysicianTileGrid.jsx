import * as React from 'react'
import styled from 'styled-components'

import PhysicianTile from './PhysicianTile.jsx';

import doctorImage1 from '../images/stories/doctor-1.png';
import doctorImage2 from '../images/stories/doctor-2.png';
import doctorImage3 from '../images/stories/doctor-3.png';
import doctorImage4 from '../images/stories/doctor-4.png';
import doctorImage5 from '../images/stories/doctor-5.png';
import doctorImage6 from '../images/stories/doctor-6.png';

const PhysicianGridStyle = styled.div`
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const doctorTiles = [
    {
        imageSrc: doctorImage1,
        name: 'Louis T. Wright',
        description: 'An extraordinary man in a golden age'
    },
    {
        imageSrc: doctorImage2,
        name: 'Dorothy L. Brown',
        description: 'The story of Dorothy L. Brown'
    },
    {
        imageSrc: doctorImage3,
        name: 'Leonidas Berry',
        description: 'A spokesperson of a big community'
    },
    {
        imageSrc: doctorImage4,
        name: 'William M. Cobb',
        description: 'Memories of Live in the Shadow'
    },
    {
        imageSrc: doctorImage5,
        name: 'Lowell C. Wormley',
        description: 'Colloquium on African american history'
    },
    {
        imageSrc: doctorImage6,
        name: 'Kenneth R. Manning',
        description: 'Seeing the bigger picture'
    }
]

export default class PhysicianTileGrid extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <PhysicianGridStyle>
                {
                    doctorTiles.map((doctor, index) => {
                        return (
                            <PhysicianTile
                                key={`key-${index}`}
                                imageSrc={doctor.imageSrc}
                                name={doctor.name}
                                description={doctor.description}
                            />
                        )
                    })
                }
            </PhysicianGridStyle>
        );
    }
}
