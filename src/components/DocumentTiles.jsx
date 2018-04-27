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
    height: 150px;
    min-width: calc(100% / 6);
    width: calc(100% / 6);
`;
const Image = styled.img`
    border: 2px solid pink;
    height: 100px;
    width: 100%;
`;
const Label = styled.div`
    background-color: lightgray;
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
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            },
            {
                src: './path',
                text: 'document text',
                label: 'document label'
            }
        ];
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
                                <Label>{document.label}</Label>
                            </DocumentTile>
                        )
                    })
                }
            </DocumentTileContainer>
        );
    }
}
