import * as React from 'react'
import styled from 'styled-components'

import searchImage1 from '../images/search/search-1.png';
import searchImage2 from '../images/search/search-2.png';
import searchImage3 from '../images/search/search-3.png';
import searchImage4 from '../images/search/search-4.png';
import searchImage5 from '../images/search/search-5.png';
import searchImage6 from '../images/search/search-6.png';
import searchImage7 from '../images/search/search-7.png';
import searchImage8 from '../images/search/search-8.png';
import searchImage9 from '../images/search/search-9.png';
import searchImage10 from '../images/search/search-10.png';
import searchImage11 from '../images/search/search-11.png';
import searchImage12 from '../images/search/search-12.png';


const DocumentTileContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
    border: 2px solid green;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
`;
const DocumentTile = styled.div`
    border: 2px solid red;
    border-radius: 4px;
    margin-bottom: 30px;
    position: relative;
    min-width: calc(100% / 6);
    width: calc(100% / 6);
`;
const Image = styled.img`
    border: 2px solid pink;
    height: auto;
    width: 100%;
`;
const Text = styled.div`
    font-family: plex-semibold;
    margin-bottom: 25px;
    padding: 0 5%;
`;
const Label = styled.div`
    background-color: ${props => props.color};
    bottom: 0;
    display: inline-block;
    margin-left: 5%;
    position: absolute;
`;

export default class DocumentTiles extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    handleClick = () => {
        console.log('document clicked');
    }
    render () {
        const documents = [
            {
                src: searchImage1,
                text: 'Dr. Brown has made it to the top of the professional ladd…',
                type: 'letter'
            },
            {
                src: searchImage2,
                text: 'Press Release: Outstanding Teacher, Physician, Civic an…',
                type: 'magazine'
            },
            {
                src: searchImage3,
                text: 'Poem written about Dorothy Brown by Elizabeth Jackson',
                type: 'newsletter'
            },
            {
                src: searchImage4,
                text: 'The Great Lie About Interest in the Black and the Poor',
                type: 'newspaper'
            },
            {
                src: searchImage5,
                text: 'To tell it like it is! Physicians as public servants',
                type: 'poem'
            },
            {
                src: searchImage6,
                text: 'A Dream in My Heart by Dorothy Brown',
                type: 'manuscript'
            },
            {
                src: searchImage7,
                text: 'W. Montague Cobb In First Person: An Oral History',
                type: 'interview'
            },
            {
                src: searchImage8,
                text: 'Publications by Staff Members. Department of…',
                type: 'interview'
            },
            {
                src: searchImage9,
                text: 'Letter of materials to guide Ken Manning',
                type: 'interview'
            },
            {
                src: searchImage10,
                text: 'Colloquium on African american history',
                type: 'interview'
            },
            {
                src: searchImage11,
                text: 'Elite Blacks Recall Segregated Capital',
                type: 'interview'
            },
            {
                src: searchImage12,
                text: 'Segregated Washington: Memories of Live in the Shadow',
                type: 'interview'
            }
        ];
        const highlightColors = {
            letter: 'pink',
            newsletter: 'orange',
            newspaper: 'purple',
            magazine: 'blue',
            interview: 'green',
            poem: 'gray',
            manuscript: 'lightblue',
        };
        const documentsLabels = {
            letter: 'Letter',
            newsletter: 'Newsletter',
            newspaper: 'Newspaper',
            magazine: 'Magazine Article',
            interview: 'Interview',
            poem: 'Poem',
            manuscript: 'Manuscript'
        }
        return (
            <DocumentTileContainer>
                {
                    documents.map((document, index) => {
                        return (
                            <DocumentTile
                                onClick={this.handleClick}
                                key={`document-${index}`}
                            >
                                <Image src={document.src} />
                                <Text>{document.text}</Text>
                                <Label color={highlightColors[document.type]}>
                                    {documentsLabels[document.type]}
                                </Label>
                            </DocumentTile>
                        )
                    })
                }
            </DocumentTileContainer>
        );
    }
}
