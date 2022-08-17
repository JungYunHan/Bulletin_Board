import { useState, useFetch, useParams } from 'react';

const EditBoard = () => {
  let { id } = useParams();

  const { data: board, isPending } = useFetch(
    `http://localhost:3001/boards/${id}`
  );

  const [inputs, setInputs] = useState({
    title: board.title,
    author: board.author,
  });
  const [body, setBody] = useState(board.body);
  const { title, author } = inputs;
  const date = new Date();

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/boards', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        author,
        createdAt: date.toLocaleString('ko-kr'),
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className='create'>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          name='title'
          type='text'
          required
          value={title}
          onChange={onChange}
        />
        <label>내용</label>
        <textarea
          type='text'
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>작성자</label>
        <input
          name='author'
          type='text'
          required
          value={author}
          onChange={onChange}
        />
        <button>수정</button>
      </form>
    </div>
  );
};

export default EditBoard;
