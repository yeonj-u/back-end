import React, { Component } from 'react';

//사물함 소개
class Lockerroom extends Component{
  render(){
    console.log('Lockerroom render');
    return (
      <article>
        <h2>학과 사물함 예약</h2>
        <p>
          [ 학과 사물함 안내 ]<br></br>
          본 사물함은 한경대 소프트웨어 융합(SC) 학과 학생들을 위한 사물함 입니다.<br></br>
          사용을 원하시면 아래의 예약하기로 예약 완료후 과사를 방문해주세요.<br></br><br></br>
          위치 : 제 2 공학관 4층<br></br>
          사용 기간 : 졸업, 휴학, 자퇴 후 2주 내까지<br></br>
          금액 : 1000원 (자물쇠 별도 : 1000원)
        </p>
        <button onClick={this.props.onClickReserve}>예약하러 가기</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.props.onClickCheck}>예약확인</button>
      </article>
    );
  }
}
//<button ><Link to="/reserv_check">예약 확인</Link></button>
export default Lockerroom;