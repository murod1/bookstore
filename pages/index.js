import { useState } from 'react';
import Link from 'next/link';

const initialBooks = [
  { id: 1, title: 'React 입문', author: '김개발', quantity: 10 },
  { id: 2, title: 'Next.js 활용', author: '이프론트', quantity: 5 },
  { id: 3, title: 'JavaScript 기초', author: '박코딩', quantity: 7 },
  // ... 더 많은 샘플 데이터
];

export default function Home() {
  const [books, setBooks] = useState(initialBooks);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 검색 필터링
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    book.author.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const currentBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 책 추가 핸들러
  const addBook = (newBook) => {
    newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
    setBooks([...books, newBook]);
  };

  // 책 삭제 핸들러
  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="container">
      <h1>온라인 서점 - 책 관리</h1>

      {/* 검색 영역 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="제목 검색"
          value={searchTitle}
          onChange={(e) => { setSearchTitle(e.target.value); setCurrentPage(1); }}
        />
        <input
          type="text"
          placeholder="저자 검색"
          value={searchAuthor}
          onChange={(e) => { setSearchAuthor(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* 책 추가 폼 */}
      <div className="add-book-form">
        <AddBookForm onAdd={addBook} />
      </div>

      {/* 책 목록 */}
      <ul className="book-list">
        {currentBooks.map(book => (
          <li key={book.id} className="book-item">
            <Link legacyBehavior href={`/books/${book.id}`}>
              <a className="book-link">
                <span className="book-title">{book.title}</span> - {book.author} (수량: {book.quantity})
              </a>
            </Link>
            <button className="delete-btn" onClick={() => deleteBook(book.id)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          이전
        </button>
        <span>
          {currentPage} / {totalPages || 1}
        </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          다음
        </button>
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
        .search-container {
          margin-bottom: 20px;
          text-align: center;
        }
        .search-container input {
          margin: 0 10px;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 200px;
        }
        .add-book-form {
          text-align: center;
          margin-bottom: 20px;
        }
        .book-list {
          list-style: none;
          padding: 0;
          max-width: 800px;
          margin: 0 auto;
        }
        .book-item {
          background: #fff;
          padding: 15px 20px;
          margin-bottom: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .book-link {
          text-decoration: none;
          color: #333;
        }
        .book-title {
          font-weight: bold;
        }
        .delete-btn {
          background-color: #ff4d4f;
          border: none;
          padding: 8px 12px;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .delete-btn:hover {
          background-color: #ff7875;
        }
        .pagination {
          margin-top: 20px;
          text-align: center;
        }
        .pagination button {
          margin: 0 5px;
          padding: 8px 12px;
          font-size: 16px;
          border: none;
          background-color: #1890ff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .pagination button:disabled {
          background-color: #d6e4ff;
          cursor: not-allowed;
        }
        .pagination span {
          margin: 0 10px;
          font-size: 16px;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}

function AddBookForm({ onAdd }) {
  const [newBook, setNewBook] = useState({ title: '', author: '', quantity: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    onAdd({ ...newBook, quantity: parseInt(newBook.quantity, 10) });
    setNewBook({ title: '', author: '', quantity: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="책 제목"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="저자"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        type="number"
        placeholder="수량"
        value={newBook.quantity}
        onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
        style={{ width: '80px' }}
      />
      <button type="submit">책 추가</button>

      <style jsx>{`
        form {
          display: inline-block;
        }
        input {
          margin: 0 5px 10px 5px;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 8px 12px;
          font-size: 16px;
          border: none;
          background-color: #52c41a;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #73d13d;
        }
      `}</style>
    </form>
  );
}
