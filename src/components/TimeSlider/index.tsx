import * as React from 'react'
import { Range } from 'rc-slider'
// import BarChart from '../Chart'
import Brush from '../Brush'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'

interface TimeSliderProps {
    sliderValuesCallback: (sliderValues: Array<number>) => void,
    data: Array<number>
}
interface TimeSliderStates {
    sliderValues: Array<number>
}

const Slider = styled.div`
    bottom: 50px;
    left: 0;
    position: absolute;
    z-index: 1;
`;

export default class TimeSlider extends React.Component<TimeSliderProps, TimeSliderStates> {
    constructor(props: TimeSliderProps) {
        super(props)

        this.state = {
            sliderValues: [0, 1]
        }
    }
    onRef() {
        this.log('on ref')
    }
    log(msg: any) { // tslint:disable-line: no-any
        const f = console.log.bind(console)
        f(msg)
    }
    render() {
        const data = this.props.data.map(d => Math.random().toFixed(1))
        return (
            <Slider>
                <Brush
                    data={data.splice(0, 10)}
                    size={[window.innerWidth, 200]}
                />
                <Range
                    min={0}
                    max={1}
                    defaultValue={[0, 1]}
                    step={0.01}
                    // value={[]}
                    onChange={sliderValues => {
                        this.props.sliderValuesCallback(sliderValues)
                        this.setState({
                            sliderValues
                        })
                    }}
                    disabled={false}
                />
            </Slider>
        )
    }
}
