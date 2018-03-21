import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppRender from './authorize';

export default class CoverAuthorize extends Component {
    constructor() {
        super();
        this.state= {
             title: 'Chartex',
        // img_src: "https://ucarecdn.com/5e0a6047-d3e0-46f4-bbe6-c095fb64996a/"
        };
    }

    render() {
        return <AppRender title={this.state.title} //img_src={this.state.img_src}
           // changeMovie={this.changeMovie.bind(this)}
           />;
    }
    changeMovie() {
        this.state= {
            title: 'Chart'
        };
    }

}
if (global.d==1){
    ReactDOM.render(<CoverAuthorize/>, document.getElementById("contentLog"));
    global.d=0;
}
else ReactDOM.render(<CoverAuthorize/>, document.getElementById("contentReg"));