import React from 'react'
import {View} from 'react-native'

class FixWebView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            let newHeight = this.state.height == 0 ? 1 : 0
            this.setState({
                height: newHeight
            })
        }, 100)
    }

    render() {
        return (
            <View style={{ width: 1, height: this.state.height}} />
        )
    }
}

export default FixWebView