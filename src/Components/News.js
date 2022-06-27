import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setloading] = useState(true)
  const [totalResults, settotalResults] = useState(0)

  // document.title = `${this.capitalizeFirstLetter(props.category)} | News Bhaskar`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews= async ()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&catogery=${props.catogery}&category=${props.category}&apiKey=c965b89fe9594fa48c1f71d56b70b3f2&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    console.log(parsedData);

    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

    const fetchMoreData = async() => {
          const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&catogery=${props.catogery}&category=${props.category}&apiKey=c965b89fe9594fa48c1f71d56b70b3f2&page=${page+1}&pageSize=${props.pageSize}`;
          setpage(page+1)
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData);
          setarticles(articles.concat(parsedData.articles))
          settotalResults(parsedData.totalResults)
      };



    return (
      < >
        <h1 className="text-center">News Bhaskar - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
            
            <div className="container">

            
            <div className="row" >
                  {articles.map((elmnt) => {
                  return <div className="col-md-4" key={elmnt.url}>
                        <NewsItem title={elmnt.title ? elmnt.title.slice(0, 75) : ""} description={elmnt.description ? elmnt.description.slice(0, 85) : ""} imageUrl={elmnt.urlToImage} newsUrl={elmnt.url} author={elmnt.author} time={elmnt.publishedAt} source={elmnt.source.name} />
                  </div>

          })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  catogery: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  catogery: PropTypes.string
}

export default News

 




























/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */


// handlePrevclick = async () => {
  //   console.log("Previous")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&catogery=${props.catogery}&category=${props.category}&apiKey=c965b89fe9594fa48c1f71d56b70b3f2&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }

  // handleNextclick = async () => {
  //   console.log("Next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&catogery=${props.catogery}&category=${props.category}&apiKey=c965b89fe9594fa48c1f71d56b70b3f2&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })
  //   }
  // }