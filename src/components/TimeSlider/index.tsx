import * as React from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class TimeSlider extends React.Component {
    constructor(props: object) {
        super(props)

        this.state = {
            sliderValues: [0, 0]
        }
    }
    log(msg: any) { // tslint:disable-line: no-any
        const f = console.log.bind(console);
        f(msg);
    }
    render() {
        return (
            <div>
                <Range
                    min={0}
                    max={1}
                    defaultValue={[0, 1]}
                    step={0.01}
                    // value={this.state.sliderValues}
                    onChange={value => {
                        this.log(value)
                        this.setState({ sliderValues: value })
                    }}
                    disabled={false}
                />
            </div>
        )
    }
}
