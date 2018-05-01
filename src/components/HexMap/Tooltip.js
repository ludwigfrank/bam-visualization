import React, {Component} from 'react'
import styled from 'styled-components'
import Dropdown from '../Dropdown'
import Label from '../Text/Label'

const Wrapper = styled('div').attrs({
    style: props => ({
        transform: `translate(${props.x + 25 - window.innerWidth * 0.25}px, ${props.y - 140}px)`
    })
})`
    position: absolute;
    z-index: 10;
`

const ItemWrapper = styled('ul')`
    list-style: none;
    margin: 0px;
`

const Item = styled('li')`
    list-style-type: none;
    width: 130px;
    * {
        display: inline-block;
    }
    *:nth-child(2) {
        float: right;
    }
`


export default class Tooltip extends Component {
    state = {
        mousePosition: [0, 0]
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = (e) => {
        this.setState({
            mousePosition: [e.screenX, e.screenY]
        })
    }

    renderData = (data) => {
        const citiesWithOccurrence = data.reduce((acc, cur, ind, arr) => {
            const { city } = cur.location
            const accCity = acc.find((data) => data.city === city)
            if (!accCity) {
                return [...acc, { city, occurrence: 1}]
            } else {
                accCity.occurrence ++
                return acc
            }
        }, [])

        const sortedCities = citiesWithOccurrence.sort((a, b) => {
            return b.occurrence - a.occurrence
        }).slice(0, 4)

        return (
            <ItemWrapper>
                {sortedCities.map(data => {
                    return <Item key={data.city}>
                        <Label> {data.city} </Label>
                        <Label hint> {data.occurrence} </Label>
                    </Item>
                })}
            </ItemWrapper>
        )
    }

    render () {
        const { hoveredHexagon } = this.props
        const { mousePosition } = this.state
        const data = hoveredHexagon ? hoveredHexagon.data : []
        return (
            <Wrapper x={mousePosition[0]} y={mousePosition[1]}>
                {
                    hoveredHexagon && <Dropdown>
                        {this.renderData(data)}
                    </Dropdown>
                }
            </Wrapper>
        )
    }
}