import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

function App(props) {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [detail, setDetail] = useState();
  const [history, setHistory] = useState()


  useEffect(() => {
    console.log('bisa')
    axios({
      method: 'get',
      url: `http://s3.ap-southeast-1.amazonaws.com/files.catchup-in.com/index.json`,
    })
    .then(({ data }) => {
        console.log(data)
        setCategories([...data.data])
    })
  },[])

  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/:category/:id">
              {detail? <div className='dataCard'>
                  <img src={detail.img}  alt='gambar'></img>
                  
                  <div className='dataText'>
                      <h3>{ detail.name }</h3>
                      <p>{ detail.desc}</p>
                  </div>
                              
              </div>: <h1>Loading...</h1>}
        </Route>
        <Route path="/:category">
            <div className="list">
              {
                  category? category.map((datum, index) => {
                      return (
                      <Link className="card" to={"/" + history + "/" + datum.id} key={index} onClick={e => {
                        setDetail({
                          ...datum
                        })
                      }}>
                          <div className='category'>
                          <img  src={datum.img}  alt='gambar'></img>
                          
                          <div className='dataText'>
                              <h3>{ datum.name }</h3>
                          </div>
                              
                          </div>
                      </Link>
                      )
                  }) : <h1>Loading...</h1>
              }    
            </div>
          </Route>
          <Route path="/">
            <div className="list">
              {
                  categories? categories.map((datum, index) => {
                      return (
                      <Link className="card" to={"/" + datum.name} key={index} onClick={e => {
                        axios({
                          method: 'get',
                          url: `http://s3.ap-southeast-1.amazonaws.com/files.catchup-in.com/${datum.listData}`,
                        })
                        .then(({ data }) => {
                            setCategory([...data.data])
                            setHistory(datum.name);
                        })
                      }}>
                          <div className='dataCard'>
                          <img src={datum.img}  alt='gambar'></img>
                          
                          <div className='dataText'>
                              <h3>{ datum.name }</h3>
                          </div>
                              
                          </div>
                      </Link>
                      )
                  }) : <h1>Loading...</h1>
              }    
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
