import React from 'react';

export class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            seconds: 0,
        }
    }
    componentDidMount(){
        this.timerID = setInterval(
            ()=> this.tick(), 1000);
    }

    tick(){
        this.setState({
            seconds: this.state.seconds + 1,
        })
    }
    render(){
        return(
            <div className="timer">{this.props.seconds} sec</div>
        );
    }
}