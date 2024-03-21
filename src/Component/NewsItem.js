import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, publish, author} = this.props;
    return (
      <div>
        <div className="card" style={{height:"30rem"}}>
  <img src={imgUrl} className="card-img-top" alt="Not visible" height="200px" />
  <div className="card-body">
    <p className="card-text text-muted mb-0">Last updated on {publish}</p>
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text text-muted">Authored By <b><u>{author || "Unknown"}</u></b></p>
    <a href={newsUrl} className="btn btn-sm btn-outline-dark" target="blank">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem