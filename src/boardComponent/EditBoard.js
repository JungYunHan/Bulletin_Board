import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBoard = () => {
  let { id } = useParams();
  const [board, setBoard] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const date = new Date();

  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:3001/boards/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((board) => {
          setIsPending(false);
          setBoard(board);
          setTitle(board.title);
          setBody(board.body);
        })
        .catch((err) => {
          setIsPending(false);
        });
    }, 1000);
  }, []);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/boards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        author: board.author,
        createdAt: date.toLocaleString('ko-kr'),
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate(`/boards/${id}`);
    alert('게시글이 수정되었습니다.');
    window.location.reload();
  };

  return (
    <div className='create'>
      {isPending && <div>Loading...</div>}
      {board && (
        <div>
          <h2>게시글 수정</h2>
          <form onSubmit={handleSubmit}>
            <label>제목</label>
            <input
              type='text'
              required
              value={title}
              onChange={onChange}
              placeholder='제목을 입력하세요.'
            />
            <label>내용</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='내용을 입력하세요.'
            ></textarea>
            <button>등록</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBoard;
