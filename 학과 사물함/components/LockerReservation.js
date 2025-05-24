import React, { useState,  useEffect } from 'react';
import axios from 'axios';

//사물함 예약
function LockerReservation({ onBack }) {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [reservedLockers, setReservedLockers] = useState([]);
  const [studentID, setStudentID] = useState('');
  const [studentNAME, setStudentNAME] = useState('');

  useEffect(() => {
    // 서버에서 예약된 사물함 데이터 불러오기
    axios.get('http://localhost:4000/locker_save')
      .then(res => {
        const lockers = res.data.map(item => item.lockerNumber); // 예약된 번호만 추출
        setReservedLockers(lockers); // 상태에 저장
      })
      .catch(err => {
        console.error('예약 정보를 불러오는 중 오류 발생:', err);
      });
  }, []);

  const tableConfigs = [
    {start: 1, rows: 4, cols: 4},
    {start: 17, rows: 6, cols: 6},
    {start: 53, rows: 4, cols: 8}
  ];
  const lockerNumber = (start, rows, cols) => {
    const lockers = Array.from({ length: rows * cols }, (_, i) => start + i); // [1, 2, ..., 10]
    const number = [];
    for(let r = 0; r < rows; r++){
      number.push(lockers.slice(r*cols,(r+1)*cols));
    }
    return number;
  }
  
  const handleReserve = () => {
    if (selectedLocker === null) {
      alert('사물함을 선택해주세요.');
      return;
    } 
    else if (!studentID.trim() || !studentNAME.trim()) {
      alert('학번과 이름을 모두 입력해주세요.');
      return;
    }
    else if (!/^\d+$/.test(studentID)) {
      alert('학번은 숫자로 입력해주세요.');
      return;
    }
    else if (studentID.length !== 10) {
      alert('학번은 10자리여야 합니다.');
      return;
    }

    // 서버로 예약 정보 보내기
    axios.post('http://localhost:4000/locker_save', {
      studentID: studentID,
      studentNAME: studentNAME,
      lockerNumber: selectedLocker
    })
    .then(res => {
      setReservedLockers(prev => [...prev, selectedLocker]); //예약 리스트에 추가
      alert(`${selectedLocker}번 사물함 예약이 완료되었습니다.`); // 문자열 템플릿 사용
      setSelectedLocker(null); //선택초기화
      // 예약 목록 다시 불러오기
      axios.get('http://localhost:4000/locker_save')
      .then(res => {
        const lockers = res.data.map(item => item.lockerNumber);
        setReservedLockers(lockers);  // 최신 상태 반영
      })
      .catch(err => {
        console.error('예약 목록 갱신 중 오류 발생:', err);
      });
      onBack(); //이전 화면으로 돌아가기
    })
    .catch(err => {
      if (err.response && err.response.status === 400) { // 동작상 실행되지 않을거임
        alert(err.response.data.message); // 서버에서 온 메시지를 그대로 표시
      } else {
        alert(err);
        console.error(err);
      }
    });
  };
  

  return (
    <div>
      <h2 style={{display: 'flex', justifyContent: 'center'}}>■ 사물함 예약 ■</h2>
      <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
        {tableConfigs.map(({ start, rows, cols }, i) => {
          const grid = lockerNumber(start, rows, cols);
          return (
            <table key={i} style={{ overflowX: 'auto', maxWidth: '100%', 
              borderSpacing: '8px', margin: '-12px' }}>
              <tbody> {grid.map((row, rowIndex) => (
                  <tr key={rowIndex}> {row.map((locker) => (
                      <td key={locker}>
                        <button
                          onClick={() => setSelectedLocker(locker)}
                          disabled={reservedLockers.includes(locker)}
                          style={{
                            width: 
                              (locker >= 1 && locker <= 16) || (locker >= 53 && locker <= 84)
                                ? '60px'
                                : '60px',
                            height: 
                              (locker >= 1 && locker <= 16) || (locker >= 53 && locker <= 84)
                                ? '90px'
                                : '60px',
                            backgroundColor: reservedLockers.includes(locker)
                              ? 'gray'
                              : selectedLocker === locker
                              ? 'lightgreen'
                              : 'deepskyblue'
                          }}>
                          {locker}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', margin: '30px auto', textAlign: 'center'}}>
        <p>
          학번 : <input type="text" name="학번" 
          value={studentID} onChange={(e) => setStudentID(e.target.value)}></input>
          &nbsp; &nbsp; 
          이름 : <input type="text" name="이름"  
          value={studentNAME} onChange={(e) => setStudentNAME(e.target.value)}></input>
        </p>
        <div style={{textAlign: 'center'}}>
          <button style={{width: '80px', height: '30px'}} onClick={handleReserve}>예약</button>{'    '}
          <button style={{width: '80px', height: '30px'}} onClick={onBack}>취소</button>
        </div>
        <p>
          <span style={{display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: 'deepskyblue',
                border: '1px solid black'}}></span> 예약 가능
          &nbsp; &nbsp;
          <span style={{display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: 'gray',
                border: '1px solid black'}}></span> 예약 완료
        </p>
      </div>
    </div>
  );
}

export default LockerReservation;
