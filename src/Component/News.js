import InfiniteScroll from "react-infinite-scroll-component";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component { 
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
          loading: true,
          page:1,
          totalResults: 0,
      }
      document.title = `NewsMonkey | ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});  
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
      this.setState({loading: false});
      this.setState({articles: parsedData.articles});
      this.setState({
        totalResults: parsedData.totalResults,
      })
      this.props.setProgress(100)
  }

    async componentDidMount(){
      
      this.updateNews();
      // this.props.setProgress(100)
    }
    // handleNextClick = async ()=>{
    //   this.setState({
    //     page: this.state.page+1,
    //   })
    //   this.updateNews();
    // }
    
    // handlePrevClick = async () =>{
    //   this.setState({
    //     page: this.state.page-1,
    //   })
    //   this.updateNews();
    // }


    fetchMoreData = async () => {
      this.setState({page:this.state.page+1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true});  
    let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({loading: false});
      this.setState({articles: this.state.articles.concat(parsedData.articles)});
      // this.setState({
      //   totalResults: parsedData.totalResults,
      // })
    };

  render() {
    return (
      <div className="container my-3 mx-9">
      {this.state.loading && <Spinner />}
        <h1 className="text-center">News Monkey Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1> 
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length < this.state.totalResults)}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
        {/* {!this.state.loading && */} {this.state.articles.map((element) => { 
            return (
                element != null ?
                    <div className="col-md-4 my-3" key={element.title}>
                        <NewsItem  publish = {element.publishedAt.slice(0,10)} title={ element.title ? element.title.slice(0,74) : ""} description={element.description?element.description.slice(0,100):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author}/>
                    </div> : ""
            )
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around my-5">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&lt;&nbsp; Prev</button>
        <button disabled={Math.ceil(this.state.totalResults/this.props.pagesize) < this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &nbsp; &gt;</button>
        
        </div> */}
      </div> 
    );
  }
}

export default News;
