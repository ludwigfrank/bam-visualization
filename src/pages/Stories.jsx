import * as React from 'react'
import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';
import styled from 'styled-components'

import PhysicianTileGrid from '../components/PhysicianTileGrid.jsx';
import StoriesTileGrid from '../components/StoriesTileGrid.jsx';

import articleImageSrc from '../images/stories/story-article.png';

const StoriesPage = styled.div`
    // overflow-y: scroll;
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
               {/* <Sidebar
                    border={true}
                    header={'Stories told with the archive'}
                    buttonLabel={'I want to add missing data'}
                    buttons={sidebarButtons}
                >
                   {"Lorem ipsum dolor amet disrupt cornhole keytar coloring book umami. Tacos bespoke slow-carb umami humblebrag. Forage actually typewriter pok pok chambray readymade flexitarian. Quinoa hexagon vexillologist small batch, hoodie swag paleo subway tile bespoke. Blog kale chips salvia direct trade shabby chic yr readymade portland ugh gastropub echo park organic chillwave. Roof party 90's tbh cronut, fanny pack keytar subway tile fixie. Single-origin coffee marfa waistcoat +1 leggings hammock."}
               </Sidebar> */}
               <Sidebar
                    border={true}
                    header={'Stories told with the archive'}
                    buttonLabel={'I want to add missing data'}
                    buttons={sidebarButtons}
                >
                    <SidebarList showBackButton={true} />
               </Sidebar>

               <StoriesContainer>
                    {/* <StoriesContainerInner>
                        <StoriesBar>
                            <Headline>
                                {'Stories about our physicians'}
                            </Headline>
                        </StoriesBar>
                        <Content>
                            <PhysicianTileGrid />
                        </Content>
                    </StoriesContainerInner>
                    <StoriesContainerInner>
                        <StoriesBar>
                            <Headline>
                                {'Stories about our archive'}
                            </Headline>
                        </StoriesBar>
                        <Content>
                            <StoriesTileGrid />
                        </Content>
                    </StoriesContainerInner> */}
                    <div>
                        <h3>{'An extraordinary man in a golden age'}</h3>
                    </div>
                    <div>
                        {'Wright was born in LaGrange, Georgia. His father, Ceah Ketchan Wright, was born a slave but obtained formal education, finishing medical school as valedictorian but later giving up his medical practice to be a Methodist minister.[4] Ceah died shortly after Loui`s birth and his mother, a sewing teacher named Lula Tompkins, remarried in 1899. Also a physician, Louis`s step-father, William Fletcher Penn, was the '}
                        <MarkedText color={'#00ff00'}>{'first African-American to graduate'}</MarkedText>
                        {'from Yale School of Medicine.[5] Penn, who became a prominent doctor in Atlanta and was the first African-American to own an automobile in the city, had a strong influence on Louis both as a physician and through the racism Louis watched him endure.'}
                    </div>
                    <ArticleImageContainer>
                        <ArticleImage src={articleImageSrc} alt={'Louis T. Wright looking at a patient'} />
                        <ArticleImageDescription>
                            {'Louis T. Wright looking at a patient'}
                        </ArticleImageDescription>
                    </ArticleImageContainer>
                    <div>
                        {'Shortly after completing medical school and moving back to Georgia, '}

                        <MarkedText color={'#0000ff'}>
                            {'Wright joined the Army Medical Corps, serving as a lieutenant during World War I'}
                        </MarkedText>

                        {' , stationed in France. While there he introduced intradermal vaccination for smallpox and was awarded the Purple Heart after a gas attack. Louis T. Wright and colleagues at patient bedside, Harlem Hospital, New York, N.Y. From left to right: Dr. Lyndon M. Hill, Dr. Louis T. Wright, '}

                        <MarkedText color={'#ff9900'}>
                            {'Dr. Myra Logan'}
                        </MarkedText>

                        {' , Dr. Aaron Prigot, unidentified African American woman patient, and unidentified hospital employee. Upon returning to the United States in 1919, he moved to New York amid racial tensions in Georgia to set up a private practice in Harlem and established ties to the Harlem Hospital, where he was the first African-American on the surgical staff. In 1929 he was also appointed to serve as the '}

                        <MarkedText color={'#ff0000'}>
                            {'first African-American police surgeon'}
                        </MarkedText>

                        {' with the New York Police Department. In his thirty years at the hospital he started the Harlem Hospital Bulletin, headed the team that first used chlortetracycline on humans, founded the hospita`s cancer research center, and earned a reputation as an expert on head injuries. He was a Fellow of the American College of Surgeons and the American Medical Association. Lorem ipsum dolor amet disrupt cornhole keytar coloring book umami. Tacos bespoke slow-carb umami humblebrag. Dorothy L. Brown pok pok chambray readymade flexitarian. Quinoa hexagon vexillologist small batch, hoodie swag paleo subway tile bespoke. Blog kale chips salvia direct trade shabby chic yr readymade portland ugh gastropub echo park organic chillwave. Urage actually with cronut, fanny pack keytar subway tile fixie. Single-origin coffee marfa waistcoat +1 leggings hammock. Blog lumbersexual art party etsy meh ennui. Beard put a bird on it succulents bitters hot chicken tattooed biodiesel roof party freegan fam selfies chicharrones hammock pok pok scenester. Jean shorts green juice polaroid roof party helvetica chia cornhole copper mug la croix. Lyft organic cred, skateboard pabst pinterest direct trade pug meh yr brooklyn. Pabst kitsch shoreditch austin hashtag, freegan narwhal gochujang. Lorem ipsum dolor amet disrupt cornhole keytar coloring book umami. Tacos bespoke slow-carb umami humblebrag. Forage actually typewriter pok pok chambray readymade flexitarian. Quinoa hexagon vexillologist small batch, hoodie swag paleo subway tile bespoke. Blog kale chips salvia direct trade shabby chic yr readymade portland ugh gastropub echo park organic chillwave. Roof party 90`s tbh cronut, fanny pack keytar subway tile fixie. Single-origin coffee marfa waistcoat +1 leggings hammock. Blog lumbersexual art party etsy meh ennui. Beard put a bird on it succulents bitters hot chicken tattooed biodiesel roof party freegan fam selfies chicharrones hammock pok pok scenester. Jean shorts green juice polaroid roof party helvetica chia cornhole copper mug la croix. Lyft organic cred, skateboard pabst pinterest direct trade pug meh yr brooklyn. Pabst kitsch shoreditch austin hashtag, freegan narwhal gochujang.'}
                    </div>
               </StoriesContainer>
            </StoriesPage>
        )
    }
}
