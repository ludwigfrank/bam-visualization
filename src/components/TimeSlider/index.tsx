import * as React from 'react'
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
    // border: 1px solid pink;
    bottom: 50px;
    right: 30px;
    position: absolute;
    z-index: 999;
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
        const sliderWidth = 900;
        const data = this.props.data.map((d, index) => [
            sliderWidth / this.props.data.length * index,
            // Math.floor(Math.random() * 20)
            10
        ]);

        return (
            <Slider>
                <Brush
                    data={data}
                    size={[sliderWidth, 50]}
                    brushCallback={(sliderValues: any) => { // tslint:disable-line: no-any
                        this.props.sliderValuesCallback(sliderValues)
                        this.setState({
                            sliderValues
                        })
                    }}
                    extend={this.state.sliderValues}
                />
            </Slider>
        )
    }
}
