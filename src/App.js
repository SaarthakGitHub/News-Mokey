import './App.css';
import React, {Component} from 'react';
import Navbar from "./Component/Navbar";
import News from './Component/News';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
// import "dotenv/config"

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  constructor(){
    super();
    this.state = {
      progress:0,
    }
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    })
  }
  pageSize = "10";
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar 
          color="#ff0000"
          progress={this.state.progress}
          // transitionTime="9000"
          // loaderSpeed="2000"
          // waitingTime="3000"
          // shadow={false}
          // background='3'
          
        />
        {/* <News setProgress=this.setProgress() pageSize={this.pageSize} country="in" category="sports"/> */}
        <Routes>
        <Route exact path="/" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
        <Route exact path="/sports" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
        <Route exact path="/entertainment" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
        <Route exact path="/general" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
        <Route exact path="/business" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"/>} />
        <Route exact path="/science" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"/>} />
        <Route exact path="/technology" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
        <Route exact path="/health" element={<News apikey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"/>} />
        </Routes>
      </Router>
        
    )
  }
}
