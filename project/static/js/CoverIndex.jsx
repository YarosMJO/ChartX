//////////////////////////////////////////
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import AppRender from './index';

// export default class CoverIndex extends Component {
//     constructor() {
//         super();
//         this.state = {
//             title: 'Chartex'
//         };
//     }
//     render() {
//         return <AppRender title={this.state.title} //img_src={this.state.img_src}
//           // changeMovie={this.changeMovie.bind(this)}
//           />;
//     }
//     submit() {
//         this.setState({
//             title: 'Back to the Future'
//         });
//     }
// }
// ReactDOM.render(<CoverIndex/>, document.getElementById("content"));
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import BarChart from './BarChart';
export default class CoverIndex extends Component {
   render() {
   return (
      <div className='App'>
      <div className='App-header'>
      <h2>BarChart</h2>
      </div>
      <div>
      <BarChart data={[5,10,1,3]} size={[500,500]} />
      </div>
      </div>
   );
   }
}
ReactDOM.render(<CoverIndex/>, document.getElementById("content"));