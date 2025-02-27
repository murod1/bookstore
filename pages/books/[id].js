import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const sampleBooks = [
  { id: 1, title: 'React 입문', author: '김개발', quantity: 10 },
  { id: 2, title: 'Next.js 활용', author: '이프론트', quantity: 5 },
  { id: 3, title: 'JavaScript 기초', author: '박코딩', quantity: 7 },
];

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(null);

  useEffect(() => {
    if (id) {
      const foundBook = sampleBooks.find(b => b.id === parseInt(id, 10));
      setBook(foundBook);
      setEditedBook(foundBook);
    }
  }, [id]);

  if (!book) return <div className="container"><p>책 정보를 찾을 수 없습니다.</p></div>;

  const handleSave = () => {
    setBook(editedBook);
    setEditMode(false);
  };

  const handleQuantityChange = (delta) => {
    setEditedBook({ ...editedBook, quantity: editedBook.quantity + delta });
  };

  return (
    <div className="container">
      <h1>책 상세 정보</h1>
      <div className="detail-card">
        {editMode ? (
          <div>
            <div className="input-group">
              <label>제목:</label>
              <input
                className="edit-input"
                type="text"
                value={editedBook.title}
                onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>저자:</label>
              <input
                className="edit-input"
                type="text"
                value={editedBook.author}
                onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>수량:</label>
              <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={editedBook.quantity <= 0}>-</button>
              <span className="quantity-display">{editedBook.quantity}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <div className="button-group">
              <button className="save-btn" onClick={handleSave}>저장</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>취소</button>
            </div>
          </div>
        ) : (
          <div>
            <p><strong>제목:</strong> {book.title}</p>
            <p><strong>저자:</strong> {book.author}</p>
            <p><strong>수량:</strong> {book.quantity}</p>
            <button className="edit-btn" onClick={() => { setEditMode(true); setEditedBook(book); }}>편집 모드</button>
          </div>
        )}
      </div>
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => router.back()}>목록으로 돌아가기</button>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          min-height: 100vh;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        .detail-card {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .input-group {
          margin-bottom: 15px;
        }
        .input-group label {
          display: block;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .edit-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .input-group .quantity-btn {
          padding: 6px 10px;
          font-size: 16px;
          border: none;
          background-color: #1890ff;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }
        .quantity-display {
          font-size: 16px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .button-group {
          margin-top: 20px;
        }
        .save-btn, .cancel-btn, .edit-btn, .back-btn {
          padding: 8px 12px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
          transition: background-color 0.3s;
        }
        .save-btn {
          background-color: #52c41a;
          color: #fff;
        }
        .save-btn:hover {
          background-color: #73d13d;
        }
        .cancel-btn {
          background-color: #ff4d4f;
          color: #fff;
        }
        .cancel-btn:hover {
          background-color: #ff7875;
        }
        .edit-btn {
          background-color: #1890ff;
          color: #fff;
        }
        .edit-btn:hover {
          background-color: #40a9ff;
        }
        .back-btn-container {
          text-align: center;
        }
        .back-btn {
          background-color: #666;
          color: #fff;
        }
        .back-btn:hover {
          background-color: #888;
        }
      `}</style>
    </div>
  );
}
