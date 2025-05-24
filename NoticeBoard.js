import React, { useState } from "react";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [editIndex, setEditIndex] = useState(null); // 수정 중인 인덱스

  const addNotice = () => {
    if (titleInput.trim() === "" || contentInput.trim() === "") return;

    const date = new Date().toLocaleString();
    const newNotice = {
      title: titleInput,
      content: contentInput,
      date: date,
      isOpen: false,
    };

    setNotices([...notices, newNotice]);
    setTitleInput("");
    setContentInput("");
  };

  const deleteNotice = (index) => {
    const updated = notices.filter((_, i) => i !== index);
    setNotices(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setTitleInput(notices[index].title);
    setContentInput(notices[index].content);
  };

  const saveEdit = () => {
    const updated = notices.map((notice, index) =>
      index === editIndex
        ? {
            ...notice,
            title: titleInput,
            content: contentInput,
          }
        : notice
    );
    setNotices(updated);
    setTitleInput("");
    setContentInput("");
    setEditIndex(null);
  };

  const toggleNotice = (index) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice, i) =>
        i === index ? { ...notice, isOpen: !notice.isOpen } : notice
      )
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold" }}>학과 공지사항</h2>

      <input
        type="text"
        placeholder="공지 제목 입력"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <textarea
        placeholder="공지 내용 입력"
        value={contentInput}
        onChange={(e) => setContentInput(e.target.value)}
        rows={4}
        cols={100}
        style={{ verticalAlign: "top", marginRight: "5px" }}
      />
      {editIndex === null ? (
        <button onClick={addNotice}>추가</button>
      ) : (
        <button onClick={saveEdit}>수정 완료</button>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notices.map((notice, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              textAlign: "left",
            }}
          >
            <div
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => toggleNotice(index)}
            >
              {notice.title}
            </div>
            <div style={{ fontSize: "0.8rem", color: "gray" }}>
              {notice.date}
            </div>
            {notice.isOpen && (
              <div style={{ marginTop: "5px", color: "#333" }}>
                {notice.content}
              </div>
            )}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => startEdit(index)}
                style={{ marginRight: "5px" }}
              >
                수정
              </button>
              <button onClick={() => deleteNotice(index)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
