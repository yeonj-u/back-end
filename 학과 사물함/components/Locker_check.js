import React, { useState, useEffect } from 'react';
import axios from 'axios';

//사물함 예약 체크
function Locker_check({ onClickBack }) {
  //학번, 이름, 검색결과, 팝업 표시 여부, 모든 예약 조회
  const [studentID, setStudentID] = useState('');
  const [studentNAME, setStudentNAME] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false); // 검색 여부 추가

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:4000/locker_save')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };
  //예약 취소 함수
  const handleDeleteByStudentID = () => {
    const found = data.find(d => d.studentID === studentID);
    
    if(!found){
      alert('해당 정보로 된 예약이 없습니다.');
      return;
    }

    if (window.confirm(`${found.studentID} 학번의 예약내역을 취소하시겠습니까?`)) {
      axios.delete(`http://localhost:4000/locker_save/${found.id}`)
        .then(() => {
          alert('예약 취소가 완료되었습니다.');
          fetchData();
          setResults(prev => prev.filter(r => r.id !== found.id)); 
        })
        .catch(err => {
          console.error(err);
          alert('예약 취소에 실패하였습니다.');
        });
    }
  };

  //검색함수
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:4000/locker_save/search', {
        params: { studentID, studentNAME }
      }); 
      setResults(res.data);
      setSearched(true); // 검색 시도 플래그 설정
    } catch (error) {
      alert('검색 중 오류가 발생했습니다.');
      console.error(error);
    }
  };
  
  return (
    <div>
      
      <div style={{ width: '170px', margin: '0 auto'}}>

        <h2>사물함 예약 검색</h2>
        <form  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="학번"
            value={studentID}
            onChange={e => setStudentID(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="이름"
            value={studentNAME}
            onChange={e => setStudentNAME(e.target.value)}
            required
          />
          <button type="submit">검색</button>
          <button onClick={onClickBack}>취소</button>
        </form>
        <div>
          {searched ? (
            results.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <table border="3" cellPadding="5" style={{ width:'500px', marginTop: '10px' }}>
                  <thead >
                    <tr>
                      <th style={{ width: '30%', textAlign: 'center' }}>사물함 번호</th>
                      <th style={{ width: '40%', textAlign: 'center' }}>학번</th>
                      <th style={{ width: '30%', textAlign: 'center' }}>이름</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: 'center' }}>{r.lockerNumber}</td>
                        <td style={{ textAlign: 'center' }}>{r.studentID}</td>
                        <td style={{ textAlign: 'center' }}>{r.studentNAME}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={handleDeleteByStudentID}type="button"style={{ marginTop: '15px' }}>
                  예약 취소
                </button>
              </div>
            ) : (
              <p style={{ width: '170px', margin: '20px auto 0', textAlign: 'center' }}>검색 결과가 없습니다.</p>           
            )
          ):null}
        </div>
      </div>
    </div>
  );
}

export default Locker_check;
