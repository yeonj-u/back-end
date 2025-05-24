import { Component } from 'react';
import CreateContent1 from "./components/CreateContent1"; // 이름 변경

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
        <CreateContent1 
          onSubmit={function(_title, _desc){
            this.max_content_id += 1;
            const newContents = [...this.state.contents, {id: this.max_content_id, title: _title, desc: _desc, answer: ''}];
            this.setState({ contents: newContents });
            console.log('등록된 내용:', _title, _desc);
          }.bind(this)}
          onDelete={function(){
            if (this.state.contents.length > 0) {
              const newContents = this.state.contents.slice(0, -1);
              this.setState({ contents: newContents, selectedContentId: null });
              console.log('문의사항 삭제');
            }
          }.bind(this)}
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
              
              style={{ cursor: 'pointer', textDecoration: this.state.selectedContentId === content.id ? 'underline' : 'none' }}
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

export default App1;
