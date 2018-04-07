import * as React from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface TimeSliderProps {
    sliderValuesCallback: (sliderValues: Array<number>) => void;
}

export default class TimeSlider extends React.Component<TimeSliderProps> {
    constructor(props: TimeSliderProps) {
        super(props)
    }
    log(msg: any) { // tslint:disable-line: no-any
        const f = console.log.bind(console);
        f(msg);
    }
    render() {
        return (
            <Range
                min={0}
                max={1}
                defaultValue={[0, 1]}
                step={0.01}
                // value={[]}
                onChange={sliderValues => {
                    this.props.sliderValuesCallback(sliderValues)
                }}
                disabled={false}
            />
        )
    }
}
