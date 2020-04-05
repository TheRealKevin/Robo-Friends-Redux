import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/scroll';
import './App.css';
import {setSearchField,requestRobots} from '../action';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error : state.requestRobots.error
    }
}

//Didn't understand why we are using onSearchChange
const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component{

    componentDidMount(){
        this.props.onRequestRobots();
    }

    render(){
        const {robots,searchField,onSearchChange,isPending} = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ? <h1>Loading</h1> : 
        (
            <div className = 'tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                    <CardList robots = {filteredRobots}/>;
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);