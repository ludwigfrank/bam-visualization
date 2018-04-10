import * as React from 'react'
import { Range } from 'rc-slider'
import BarChart from '../Chart'
import 'rc-slider/assets/index.css'

interface TimeSliderProps {
    sliderValuesCallback: (sliderValues: Array<number>) => void
}
interface TimeSliderStates {
    sliderValues: Array<number>
}

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
        return (
            <div>
                <BarChart
                    data={[
                        5 * this.state.sliderValues[1],
                        10,
                        1,
                        3
                    ]}
                    size={[600, 400]}
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
            </div>
        )
    }
}
