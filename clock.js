import React from 'react';
import './App.css';

class clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    tick() {
        this.setState({date: new Date()});
    }
    componentDidMount(){    
        this.timer = setInterval(() => this.tick(), 1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            
            <th>{this.state.date.toLocaleTimeString()}</th>
            
        )
    }
}

export default clock; 