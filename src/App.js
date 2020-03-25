import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { newsOriginalStore } from './store.js'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      newsId : 0,
      searchText : "",
      newsStore : newsOriginalStore
    }
  }

  //This function changes the newsId to be shown when a news headline is clicked 
  selectNews( newsId ) {
    this.setState({ newsId });
  }

  //This function filters which news to be shown depending on the search term(ignoring case)
  filterNews(event) {

    this.setState({
      searchText : event.target.value
    })

    var searchText = event.target.value
    var news = this.state.newsStore
    
    if(searchText && searchText !== "" && searchText !== " ")
    {
      searchText = event.target.value.toLowerCase()
      var filteredNews = news.filter(( response )=> ( response.headline.toLowerCase().includes( searchText ) || response.person.toLowerCase().includes( searchText ) || response.date.toLowerCase().includes( searchText ) || response.news.toLowerCase().includes( searchText )))
      
      this.setState({ newsStore : filteredNews })
      if(filteredNews && filteredNews.length>0 )
       this.setState({ newsId : filteredNews[0].id-1 })
    } 
    else
      this.setState({ newsStore : newsOriginalStore , newsId : 0 })

  }
  
  render(){
 
  return ( 
      <Container fluid style={{ marginTop:'10px' }}>
        <Row>
          <Col  sm={ 4 } >
            <Row>
              <Col >
                <input style={{ display:'block', width: '99%', marginBottom:'5px' }} placeholder="Search..." value={ this.state.searchText } type=" text " onChange={ this.filterNews.bind( this ) }/>
              </Col>
            </Row>
            <Row>
              <Col style = {{ height:'671px', overflow:'auto' }}>
              {
              <ListGroup>
                {this.state.newsStore.map(( newsItem, index) =>  <ListGroupItem key={ index } active={ newsItem.id-1 === this.state.newsId } eventKey={ index } onClick={ this.selectNews.bind( this, newsItem.id-1 )}>
                <Row>
                  <Col sm={ 6 }>{ newsItem.headline }</Col>
                  <Col sm={ 6 } className=" text-right ">
                    <div>{ newsItem.date }</div>
                    <div>{ newsItem.person }</div>
                  </Col>
                </Row>
                </ListGroupItem>)}
              </ListGroup>
              }
              </Col>
            </Row>
          </Col>
          <Col sm={ 8 }>
              <Card border=" primary " >
                <Card.Header>{ newsOriginalStore[ this.state.newsId ].headline }</Card.Header>
                <Card.Body>
                  <Card.Subtitle className=" mb-2 text-muted text-right ">{ newsOriginalStore[ this.state.newsId ].person }</Card.Subtitle>
                  <Card.Subtitle className=" mb-2 text-muted text-right ">{ newsOriginalStore[ this.state.newsId ].date }</Card.Subtitle>
                  <Card.Text style={{ height:'570px', overflow:'auto' }}>
                    { newsOriginalStore[ this.state.newsId ].news}
                  </Card.Text> 
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
      );
    }
}

export default App;
