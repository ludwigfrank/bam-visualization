import * as React from 'react'
import styled from 'styled-components'

import storyImage1 from '../images/stories/story-1.png';
import storyImage2 from '../images/stories/story-2.png';
import storyImage3 from '../images/stories/story-3.png';

const StoriesTileGridStyle = styled.div`
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const StoryTile = styled.div`
    border: 2px solid red;
    width: 40%;
`;
const StoryImage = styled.img`
    width: 100%;
`;

const documentTiles = [
    {
        imageSrc: storyImage1,
        name: 'Louis T. Wright',
        description: 'The medicin in the US-South-West in the 1820s'
    },
    {
        imageSrc: storyImage2,
        name: 'Dorothy L. Brown',
        description: 'The discovery of the insulinThe discovery of the insulin'
    },
    {
        imageSrc: storyImage3,
        name: 'Leonidas Berry',
        description: 'Meharry Medical School in the 1840s'
    }
];

export default class StoriesTileGrid extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <StoriesTileGridStyle>
                {
                    documentTiles.map((tile, index) => {
                        return (
                            <StoryTile
                                key={`key-${index}`}
                            >   
                                <StoryImage src={tile.imageSrc} />
                                {tile.description}
                            </StoryTile>
                        )
                    })
                }
            </StoriesTileGridStyle>
        );
    }
}
