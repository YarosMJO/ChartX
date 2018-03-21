
import React, { Component } from 'react'
// import './App.css';
import BubbleChart from './BubbleChart'
import ReactDOM from 'react-dom';
  let data = {
  "children": [
    { "id": 1,
      "title": "oneField",
      "size": 150,
      "g": 80
    },
    { "id": 2,
      "title": "Teaser",
      "size": 30,
      "g": 50
    },
    { "id": 3,
      "title": "Crazy",
      "size": 70,
      "g": 80
    }
  ]
}
export default class CoverIndex extends Component {
   constructor() {
        super();
        this.state = {
            title: 'Chartex'
        };
    }


render() {
       return (
          <div className='App'>
          <div className='App-header'>
          <h2>d3Es6 dashboard</h2>
          </div>
          <div>
          <BubbleChart data={data}/>
          </div>
          </div>
       )
    }
}

ReactDOM.render(<CoverIndex/>, document.getElementById("content"));