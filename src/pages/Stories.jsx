import * as React from 'react'
import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';
import styled from 'styled-components'
import Article from '../components/Article'

import articleImageSrc from '../images/stories/story-article.png';

const StoriesPage = styled.div`
   overflow-y: scroll;
`;
const StoriesContainer = styled.div`
    border: 2px solid green;
    height: 100%;
    line-height: 1.7em;
    overflow-y: scroll;
    padding: 100px 25% 100px 45px;
    position: absolute;
    right: 0;
    top: 0;
    width: 75%;
`;
const StoriesContainerInner = styled.div`
    border: 2px solid orange;
    height: 50%;
    width: 100%;
`;
const StoriesBar = styled.div`
    border: 2px solid blue;
    width: 100%;
`;
const Headline = styled.h3`
    border: 2px solid yellow;
    margin-bottom: 45px;
`;
const Content = styled.div`
    border: 2px solid blue;
`;
const ArticleImageContainer = styled.div`
    margin: 30px 0;
`;
const ArticleImage = styled.img`
    // border: 2px solid blue;
    height: auto;
    width: 100%;
`;
const ArticleImageDescription = styled.div`
    font-size: 14px;
    font-style: italic;
`;
const MarkedText = styled.span`
    background-color: ${props => props.color};
`;

export default class Stories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        const sidebarButtons = [
            {
                label: 'I want to contribute',
                src: '/contribute',
                filled: true
            }
        ];
        return (
            <StoriesPage>
                <Article />
            </StoriesPage>
        )
    }
}
