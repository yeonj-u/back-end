import React, { useState } from 'react';
import prof1 from '../assets/prof1.jpg';
import prof2 from '../assets/prof2.jpg';
import prof3 from '../assets/prof3.jpg';
import prof4 from '../assets/prof4.jpg';
import prof5 from '../assets/prof5.jpg';

// 교육과정 표 데이터
const courseTableData = [
  { grade: "1학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "컴퓨터공학입문과파이썬", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "1학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "프로그래밍입문", credit: 3, theory: 2, practice: 2, design: 0 },
  
  { grade: "2학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "자료구조", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "객체지향프로그래밍1", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "리눅스시스템프로그래밍", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "데이터사이언스기초", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "웹프로그래밍", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "알고리즘", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "컴퓨터 구조", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "객체지향프로그래밍2", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "이산수학", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "2학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "게임프로그래밍", credit: 3, theory: 2, practice: 2, design: 0 },

  { grade: "3학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "컴퓨터 네트워크", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "머신러닝", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "시스템분석및설계", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "프로그래밍언어", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "모바일프로그래밍", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "데이터베이스", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "소프트웨어공학", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "운영체제", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "딥러닝", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "컴퓨터그래픽스", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "3학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "융합소프트웨어프로젝트", credit: 3, theory: 2, practice: 2, design: 0 },

  { grade: "4학년", semester: "1학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "융합소프트웨어종합설계1", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "4학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "디지털영상처리", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "4학년", semester: "1학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "IoT프로그래밍", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "4학년", semester: "2학기", category: "전공선택", track: "트랙선택(소프트웨어융합_기본트랙)", name: "멀티미디어공학", credit: 3, theory: 2, practice: 2, design: 0 },
  { grade: "4학년", semester: "2학기", category: "전공선택", track: "트랙필수(소프트웨어융합_기본트랙)", name: "융합소프트웨어종합설계2", credit: 3, theory: 2, practice: 2, design: 0 },
];

function Test() {
  return (
    <div className="department-intro">
      <Header />
      <AboutDepartment />
      <CourseTable />
      <FacultyList />
      <Footer />
    </div>
  );
}

// Header component
function Header() {
  return (
    <header>
      <h1>학과 소개</h1>
    </header>
  );
}

// AboutDepartment component
function AboutDepartment() {
  return (
    <section className="about-department">
      <h1>소프트웨어융합전공</h1>
      <h3>소프트웨어를 중심으로 변화, 발전하는 IT 융합산업 시대의 요구에 상응하는 능력을 갖춘 학생들을 위한 전공이다.</h3>
      <p>
        기존 소프트웨어 관련 교육체계의 한계를 극복하고 소프트웨어융합 패러다임(소프트웨어, 멀티미디어, IoT, 머신러닝)에 맞는 인재를 육성한다.
        또한 산업체 전문가들과 함께 하는 프로젝트, 인턴십 등 맞춤형 교육과정을 통하여 확고한 비전을 갖는 고급 전문가로의 성장을 위한 발판을 마련한다.
        전문 프로그래머, 시스템 엔지니어, 통신/보안 전문가 등 다양한 직종으로 진출할 수 있다.
        보다 구체적으로 소프트웨어, 정보통신, 컴퓨터보안, IoT, 딥러닝 등 IT 관련 국내외 기업 또는 공공기관, 금융, 국방 등 IT관련 기술을 필요로 하는 다양한 응용 산업체에 진출할 수 있다.
        또한 본교를 비롯한 국내외 우수한 대학원 진학이 가능하다.
      </p>
      <h4>위치</h4>
      <p>제 2공학관 402-2호</p>
      <h4>전화</h4>
      <p>031-670-5350</p>
      <h4>팩스</h4>
      <p>031-670-5359</p>
      <h4>메일</h4>
      <p>yoonhk@hknu.ac.kr</p>
    </section>
  );
}

// CourseTable component (학년별 버튼 + 접었다 폈다 기능)
function CourseTable() {
  const [open, setOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('1학년');
  const grades = ['1학년', '2학년', '3학년', '4학년'];
  const filteredCourses = courseTableData.filter(course => course.grade === selectedGrade);

  return (
    <section style={{margin: '32px 0'}}>
      <h2>교육과정</h2>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #1976d2',
          background: open ? '#1976d2' : '#fff',
          color: open ? '#fff' : '#1976d2',
          cursor: 'pointer',
          marginBottom: '12px'
        }}
      >
        {open ? '교육과정 접기 ▲' : '교육과정 펼치기 ▼'}
      </button>
      {open && (
        <>
          {/* 학년 선택 버튼 */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                style={{
                  marginRight: '10px',
                  padding: '8px 18px',
                  backgroundColor: selectedGrade === grade ? '#1976d2' : '#e0e0e0',
                  color: selectedGrade === grade ? '#fff' : '#222',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: selectedGrade === grade ? 'bold' : 'normal'
                }}
              >
                {grade}
              </button>
            ))}
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse', background: '#fff', textAlign: 'center'}}>
            <thead>
              <tr>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>학년</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>학기</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>이수구분</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>트랙이수구분</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>교육과정명</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>학점</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>이론시수</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>실습시수</th>
                <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>설계시수</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((row, idx) => (
                <tr key={idx}>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.grade}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.semester}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.category}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.track}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee', textAlign: 'left'}}>{row.name}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.credit}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.theory}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.practice}</td>
                  <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{row.design}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

// FacultyList component (상세정보 기능 포함, 줄바꿈 적용)
function FacultyList() {
  const faculty = [
    {
      name: '이계식 교수님',
      photo: prof1,
      detail: '데이터과학, 프로그래밍언어론 전공\n 소프트웨어공학전공.\n연락처: 031-670-5354\n연구실: 제2공학관 407호'
    },
    {
      name: '이창훈 교수님',
      photo: prof2,
      detail: '소프트웨어공학 전공\n 소프트웨어융합전공.\n연락처: 031-670-5351\n연구실: 제2공학관 404호'
    },
    {
      name: '전병태 교수님',
      photo: prof3,
      detail: '멀티미디어영상처리 전공\n 소프트웨어융합전공.\n연락처: 031-670-5352\n연구실: 제2공학관 406호'
    },
    {
      name: '신정호 교수님',
      photo: prof4,
      detail: '영상정보기술 전공\n 소프트웨어융합전공.\n연락처: 031-670-5353\n연구실: 제2공학관 405호'
    },
    {
      name: '심규성 교수님',
      photo: prof5,
      detail: '컴퓨터 네트워크 전공\n 소프트웨어융합전공.\n연락처: 031-670-5355\n연구실: 제2공학관 403호'
    }
  ];

  const [selected, setSelected] = useState(null);

  return (
    <section className="faculty-list">
      <h2>교수진 소개</h2>
      <ul style={{listStyle: 'none', padding: 0}}>
        {faculty.map((prof, idx) => (
          <li
            key={idx}
            style={{marginBottom: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}
            onClick={() => setSelected(prof)}
          >
            <img 
              src={prof.photo} 
              alt={prof.name} 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                marginRight: '16px',
                objectFit: 'cover',
                border: '2px solid #eee'
              }}
            />
            <span>{prof.name}</span>
          </li>
        ))}
      </ul>
      {/* 상세정보 영역 */}
      {selected && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>{selected.name} 상세정보</h3>
          <img src={selected.photo} alt={selected.name} style={{width: '100px', borderRadius: '50%'}} />
          <p style={{marginTop: '10px', whiteSpace: 'pre-line'}}>
            {selected.detail}
          </p>
          <button onClick={() => setSelected(null)} style={{marginTop: '10px'}}>닫기</button>
        </div>
      )}
    </section>
  );
}

// Footer component
function Footer() {
  return (
    <footer>
      <p>© 한경대학교 소프트웨어융합전공</p>
    </footer>
  );
}

export default Test;