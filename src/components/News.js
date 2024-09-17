import React, { Component} from "react";
import NewsItem from "./NewsItem";
import spinner from "./spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: 'general',
    
  }
  static PropsTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }

  constructor(){
    super();
    console.log("hello , i am constructor from news component")
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  } 
  async componentDidMount(){
    let url=`https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-17&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}&page=1&pageSize=${this.props.pageSize}`;
    // let url=`https://newsdata.io/api/1/latest?apikey=${process.env.REACT_APP_API_KEY_2}`
    console.log(url)
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
  }

  handlePrevClick = async () =>{
    console.log("Previous");
    let url=`https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-16&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading:false
    })
  }
  handleNextClick = async() =>{
    if (!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
      console.log("Next");
      let url=`https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-17&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data=await fetch(url);
      let parsedData= await data.json()
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles,
        loading:false
      })
  }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey-Top Headlines</h1>
        {this.state.loading && <spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage}  newsUrl={element.url }/>    
            </div>
        })}
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
          </div>
            
        </div>
      </div>
    );
  }
}

export default News;
