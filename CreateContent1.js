import React, { Component } from 'react';

class CreateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };
  }

  Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Submit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.title, this.state.desc);
    this.setState({ title: '', desc: '' }); 
  };

  handleClear = () => {
    this.setState({ title: '', desc: '' }); 
  };

  render() {
    console.log('Content render');
    return (
      <article>
        <h2>문의사항 등록</h2>
        <form onSubmit={this.Submit}>
          <p>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={this.state.title}
              onChange={this.Change}
              style={{ width: '300px', height: '30px' }} 
            />
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="내용을 입력하세요"
              value={this.state.desc}
              onChange={this.Change}
              style={{ width: '300px', height: '100px' }} 
            />
          </p>
          <p>
            <input type="submit" value="등록" />
            <button type="button" onClick={this.handleClear} style={{ marginLeft: '15px' }}>삭제</button>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
