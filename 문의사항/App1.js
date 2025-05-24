import React, { Component } from 'react';

class App1 extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 1;
    this.state = {
      contents: [],
      selectedContentId: null,
      answerInput: '',
      isAdmin: true,            
      isEditingAnswer: false    
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
    this.setState({ 
      contents: newContents,
      answerInput: '',
      isEditingAnswer: false
    });
  };

  render() {
    const { contents, selectedContentId, answerInput, isAdmin, isEditingAnswer } = this.state;
    const selectedContent = contents.find(content => content.id === selectedContentId);

    return (
      <div className="App">
        <CreateContent 
          onSubmit={(_title, _desc) => {
            this.max_content_id += 1;
            const newContents = [...contents, {
              id: this.max_content_id,
              title: _title,
              desc: _desc,
              answer: ''
            }];
            this.setState({ contents: newContents });
          }}
        />

        <h2>등록된 문의사항</h2>
        <ul>
          {contents.map(content => (
            <li 
              key={content.id}
              onClick={() => {
                this.setState(prevState => ({
                  selectedContentId: prevState.selectedContentId === content.id ? null : content.id,
                  answerInput: content.answer || '',
                  isEditingAnswer: false
                }));
              }}
              style={{
                cursor: 'pointer',
                textDecoration: selectedContentId === content.id ? 'underline' : 'none'
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

            {!selectedContent.answer && isAdmin && (
              <div>
                <textarea
                  value={answerInput}
                  onChange={this.AnswerChange}
                  placeholder="답변을 입력하세요"
                  style={{ width: '300px', height: '100px' }}
                />
                <br />
                <button onClick={this.AnswerSubmit}>답변 등록</button>
              </div>
            )}

            {selectedContent.answer && !isEditingAnswer && (
              <div>
                <p>{selectedContent.answer}</p>
                {isAdmin && (
                  <button
                    onClick={() =>
                      this.setState({
                        isEditingAnswer: true,
                        answerInput: selectedContent.answer || ''
                      })
                    }
                  >
                    수정
                  </button>
                )}
              </div>
            )}

            {selectedContent.answer && isEditingAnswer && isAdmin && (
              <div>
                <textarea
                  value={answerInput}
                  onChange={this.AnswerChange}
                  placeholder="답변을 수정하세요"
                  style={{ width: '300px', height: '100px' }}
                />
                <br />
                <button onClick={this.AnswerSubmit}>수정</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

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
