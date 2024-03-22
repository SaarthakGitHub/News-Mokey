import './App.css';
import React, {useState} from 'react';
import Navbar from "./Component/Navbar";
import News from './Component/News';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  let apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  
  function setProgressfunc(progress){
    setProgress(progress)
  }
  let pageSize = "10";
    return (
      <Router>
        <Navbar />
        <LoadingBar 
          color="#ff0000"
          progress={progress}
          // transitionTime="9000"
          // loaderSpeed="2000"
          // waitingTime="3000"
          // shadow={false}
          // background='3'
        />
        <Routes>
        <Route exact path="/" element={<News apikey={apiKey} setProgress={setProgressfunc} key="general" pageSize={pageSize} country="in" category="general"/>} />
        <Route exact path="/sports" element={<News apikey={apiKey} setProgress={setProgressfunc} key="sports" pageSize={pageSize} country="in" category="sports"/>} />
        <Route exact path="/entertainment" element={<News apikey={apiKey} setProgress={setProgressfunc} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
        <Route exact path="/general" element={<News apikey={apiKey} setProgress={setProgressfunc} key="general1" pageSize={pageSize} country="in" category="general"/>} />
        <Route exact path="/business" element={<News apikey={apiKey} setProgress={setProgressfunc} key="business" pageSize={pageSize} country="in" category="business"/>} />
        <Route exact path="/science" element={<News apikey={apiKey} setProgress={setProgressfunc} key="science" pageSize={pageSize} country="in" category="science"/>} />
        <Route exact path="/technology" element={<News apikey={apiKey} setProgress={setProgressfunc} key="technology" pageSize={pageSize} country="in" category="technology"/>} />
        <Route exact path="/health" element={<News apikey={apiKey} setProgress={setProgressfunc} key="health" pageSize={pageSize} country="in" category="health"/>} />
        </Routes>
      </Router>
        
    )
  }

