import React from "react";

const NewsItem = (props)=> {

    let { title, description, imageUrl, newsUrl,author, time, source} = props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absoluite',
            right: '0'
        }

        }>

       
      <span class=" badge rounded-pill bg-danger" style={{left: "355px", zIndex: "1"}}>{source}
      
  </span>
  </div>
          <img src={!imageUrl?"https://source.unsplash.com/random":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem