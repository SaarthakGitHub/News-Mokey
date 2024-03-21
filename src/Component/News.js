
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component { 
  // API_KEY = "5452378c412843aabacf97cf45327e7f";
  API_KEY = process.env.API_KEY;
  static defaultPropTypes = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes ={
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props){
      super(props);
      this.state = {
          articles: [],
          loading: false,
          page:1,
          API_KEY:""
      }
      document.title = `NewsMonkey | ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API_KEY}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});  
    let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({loading: false});
      this.setState({articles: parsedData.articles});
      // document.title = "News Monkey - " + this.props.category;
  }

    async componentDidMount(){
      this.updateNews();
    }
    handleNextClick = async ()=>{
      this.setState({
        page: this.state.page+1,
      })
      this.updateNews();
    }
    
    handlePrevClick = async () =>{
      this.setState({
        page: this.state.page-1,
      })
      this.updateNews();
    }

  render() {
    return (
      
      <div className="container my-3 mx-9">
        <h1 className="text-center">News Monkey Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1> 
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
            return (
                element != null ?
                    <div className="col-md-4 my-3" key={element.url}>
                        <NewsItem  publish = {element.publishedAt.slice(0,10)} title={ element.title ? element.title.slice(0,74) : ""} description={element.description?element.description.slice(0,100):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author}/>
                    </div> : ""
            )
        })}
        </div>
        <div className="container d-flex justify-content-around my-5">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&lt;&nbsp; Prev</button>
        <button disabled={Math.ceil(this.state.totalResults/this.props.pagesize) < this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &nbsp; &gt;</button>
        
        </div>
      </div> 
    );
  }
}

export default News;
