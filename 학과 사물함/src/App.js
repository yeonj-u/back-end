import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
// 아래 import들 사물함 기능 추가
import Control from "./components/Control"
import Lockerroom from "./components/Lockerroom"
import LockerReservation from './components/LockerReservation'
import Locker_check from './components/Locker_check'


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wid Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({ contents:_contents });
        console.log(_title, _desc)
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({ contents:_contents });
        console.log(_title, _desc)
      }.bind(this)}></UpdateContent>
    } 
    //return문 전까지 사물함 기능 추가
    else if (this.state.mode === 'locker') {
      _article = <Lockerroom
        onClickReserve={() => this.setState({ mode: 'reserve' })}// 예약 화면 전환 
        onClickCheck={() => this.setState({ mode: 'check' })}//예약확인 화면 전환
      />;
    } else if (this.state.mode === 'reserve') {
      _article = <LockerReservation onBack={function(){
        this.setState({ mode: 'locker' }); // 다시 사물함 화면으로
      }.bind(this)} />;
    } else if (this.state.mode === 'check') {
      _article = <Locker_check 
        onClickBack={() => this.setState({ mode: 'locker' })}
      />;
    }
    return _article;
  }

  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'})
          }.bind(this)}
        ></Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
