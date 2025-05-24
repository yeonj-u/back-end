--데이터베이스 생성
CREATE DATABASE locker_db;

--사용할 데이터 베이스 지정
USE locker_db;

--테이블 생성
CREATE TABLE locker_save(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lockerNumber INT NOT NULL,
    studentID VARCHAR(10) NOT NULL,
    studentNAME VARCHAR(50) NOT NULL
);

--id 자동으로 숫자 매김, 기본키
--lockerNumber 정수형으로 받음
--studentID 문자열로 받음
--studentNAME 문자열로 받음음

--테이블 확인
SELECT * FROM locker_save