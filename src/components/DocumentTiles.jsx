import * as React from 'react'
import styled from 'styled-components'

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
    height: 180px;
    min-width: calc(100% / 6);
    width: calc(100% / 6);
`;
const Image = styled.img`
    border: 2px solid pink;
    height: 100px;
    width: 100%;
`;
const Label = styled.div`
    background-color: ${props => props.color};
    display: inline-block;
`;
const Text = styled.div`
    font-family: plex-semibold;
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
                src: './path',
                text: 'Dr. Brown has made it to the top of the professional ladd…',
                type: 'letter'
            },
            {
                src: './path',
                text: 'Dr. Brown has made it to the top of the professional ladd…',
                type: 'magazine'
            },
            {
                src: './path',
                text: 'Dr. Brown has made it to the top of the professional ladd…',
                type: 'newsletter'
            },
            {
                src: './path',
                text: 'document text',
                type: 'newspaper'
            },
            {
                src: './path',
                text: 'document text',
                type: 'poem'
            },
            {
                src: './path',
                text: 'document text',
                type: 'manuscript'
            },
            {
                src: './path',
                text: 'document text',
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
