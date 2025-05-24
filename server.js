const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위해 필요

// MySQL 연결 설정
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hm09080908',
  database: 'locker_db'
});

// 서버 확인용 라우트
app.get('/', (req, res) => {
  res.send('Locker reservation server is running.');
});

// 모든 예약 조회 API
app.get('/locker_save', (req, res) => {
  db.query('SELECT * FROM locker_save', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 예약된 사물함 번호만 조회
app.get('/reserved_lockers', (req, res) => {
  const sql = 'SELECT lockerNumber FROM locker_save';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const lockerNumbers = results.map(row => row.lockerNumber);
    res.json(lockerNumbers);
  });
});

// 사물함 예약 추가 API
app.post('/reserve', (req, res) => {
  const { studentID, studentNAME, lockerNumber } = req.body;
  const checkSql = 'SELECT * FROM locker_save WHERE studentID = ? OR lockerNumber = ?';
  
  db.query(sql, [studentID, studentNAME, lockerNumber], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0){
      return res.status(400).json({ message: '이미 예약된 사물함입니다.' });
    }
    const insertSql = 'INSERT INTO locker_save (studentID, studentNAME, lockerNumber) VALUES (?, ?, ?)';
    db.query(insertSql, [studentID, studentNAME, lockerNumber], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '예약 성공' });
    });
  });
});

// 사물함 예약 취소 API
app.delete('/locker_save/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM locker_save WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: '해당 사물함 예약이 존재하지 않습니다.' });
    }
    res.json({ message: '예약이 취소되었습니다.' });
  });
});

// 사물함 예약 확인
app.get('/locker_save/search', (req, res) => {
  const { studentID, studentNAME } = req.query;

  const sql = 'SELECT * FROM locker_save WHERE studentID = ? AND studentNAME = ?';
  db.query(sql, [studentID, studentNAME], (err, results) => {
    console.log("검색 요청:", req.query);
    if (err) {
      console.error('DB 검색 오류:', err);
      return res.status(500).json({ error: 'DB 조회 실패' });
    }0
    res.json(results);
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
