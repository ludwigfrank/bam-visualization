import * as React from 'react'
import DotGrid from '../components/DotGrid';


export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <div>
               {'Search'}
               <DotGrid />
            </div>
        )
    }
}
