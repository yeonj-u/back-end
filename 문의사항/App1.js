import React, { Component } from 'react';

class App1 extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 1;
    this.state = {
      contents: [],
      selectedContentId: null,  
      answerInput: ''          
    };
  }

  AnswerChange = (e) => {
    this.setState({ answerInput: e.target.value });
  };

  AnswerSubmit = () => {
    const newContents = this.state.contents.map(content => {
      if (content.id === this.state.selectedContentId) {
        return { ...content, answer: this.state.answerInput }; 
      }
      return content;
    });
    this.setState({ contents: newContents, answerInput: '' });
    console.log('답변 등록:', this.state.answerInput);
  };

  render() {
    const selectedContent = this.state.contents.find(content => content.id === this.state.selectedContentId);

    return (
      <div className="App">
        <CreateContentInline 
          onSubmit={(_title, _desc) => {
            this.max_content_id += 1;
            const newContents = [...this.state.contents, {
              id: this.max_content_id,
              title: _title,
              desc: _desc,
              answer: ''
            }];
            this.setState({ contents: newContents });
            console.log('등록된 내용:', _title, _desc);
          }}
          onDelete={() => {
            if (this.state.contents.length > 0) {
              const newContents = this.state.contents.slice(0, -1);
              this.setState({ contents: newContents, selectedContentId: null });
              console.log('문의사항 삭제');
            }
          }}
        />

        <h2>등록된 문의사항</h2>
        <ul>
          {this.state.contents.map(content => (
            <li 
              key={content.id}
              onClick={() => {
                this.setState(prevState => ({
                  selectedContentId: prevState.selectedContentId === content.id ? null : content.id,
                  answerInput: content.answer || ''
                }));
              }}
              style={{
                cursor: 'pointer',
                textDecoration: this.state.selectedContentId === content.id ? 'underline' : 'none'
              }}
            >
              {content.title}
            </li>
          ))}
        </ul>

        {selectedContent && (
          <div>
            <h3>내용</h3>
            <p>{selectedContent.desc}</p>
            
            <h3>답변</h3>
            {selectedContent.answer ? (
              <p>{selectedContent.answer}</p>
            ) : (
              <div>
                <textarea
                  value={this.state.answerInput}
                  onChange={this.AnswerChange}
                  placeholder="답변을 입력하세요"
                  style={{ width: '300px', height: '100px' }}
                />
                <br />
                <button onClick={this.AnswerSubmit}>답변 등록</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

// 내부에 포함된 CreateContent1 컴포넌트
class CreateContentInline extends Component {
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
    this.props.onDelete(); // 삭제 버튼 누를 경우 부모에 알림
  };

  render() {
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

export default App1;
