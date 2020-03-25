import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { newsStore } from './store.js'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      newsId : 0,
      searchText : "",
      news : newsStore
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
    var news = this.state.news
    
    if(searchText && searchText !== "" && searchText !== " ")
    {
      searchText = event.target.value.toLowerCase()
      var filteredNews = news.filter(( response )=> ( response.headline.toLowerCase().includes( searchText ) || response.person.toLowerCase().includes( searchText ) || response.date.toLowerCase().includes( searchText ) || response.news.toLowerCase().includes( searchText )))
      this.setState({ news : filteredNews })
    } 
    else
      this.setState({ news : newsStore , newsId : 0 })

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
                {this.state.news.map(( response, index) =>  <ListGroupItem key={ index } eventKey={ index } onClick={ this.selectNews.bind( this, response.id-1 )}>
                <Row>
                  <Col sm={ 6 }>{ response.headline }</Col>
                  <Col sm={ 6 } className=" text-right ">
                    <div>{ response.date }</div>
                    <div>{ response.person }</div>
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
                <Card.Header>{ newsStore[ this.state.newsId ].headline }</Card.Header>
                <Card.Body>
                  <Card.Subtitle className=" mb-2 text-muted text-right ">{ newsStore[ this.state.newsId ].person }</Card.Subtitle>
                  <Card.Subtitle className=" mb-2 text-muted text-right ">{ newsStore[ this.state.newsId ].date }</Card.Subtitle>
                  <Card.Text>
                    <div style={{ height:'570px', overflow:'auto' }}>{ newsStore[ this.state.newsId ].news}</div>
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
