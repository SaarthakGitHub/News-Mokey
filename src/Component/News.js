import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default function News(props) { 
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  async function updateNews(){
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);  
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsMonkey | ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
    updateNews();
    // eslint-disable-next-line 
  }, []);
  async function fetchMoreData(){
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1);
  let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
  };
  return (
    <div className="container mx-9">
    {loading && <Spinner />}
      <h1 className="text-center " style={{marginTop : '70px'}}>News Monkey Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1> 
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={(articles.length < totalResults)}
        loader={<Spinner />}
      >
      <div className="container">
      <div className="row">
      {/* {!loading && */} {articles.map((element) => { 
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
    </div> 
  );
}

News.defaultPropTypes = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes ={
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
