import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBoard = () => {
  const [inputs, setInputs] = useState({ title: '', author: '' });
  const [body, setBody] = useState('');
  const { title, author } = inputs;
  const date = new Date();

  let navigate = useNavigate();

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
      method: 'POST',
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

    navigate('/');
    alert('게시글이 등록되었습니다.');
    window.location.reload();
  };

  return (
    <div className='create'>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          name='title'
          type='text'
          required
          value={title}
          onChange={onChange}
          placeholder='제목을 입력하세요.'
        />
        <label>내용</label>
        <textarea
          type='text'
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='내용을 입력하세요.'
        ></textarea>
        <label>작성자</label>
        <input
          name='author'
          type='text'
          required
          value={author}
          onChange={onChange}
          placeholder='닉네임을 입력하세요.'
        />
        <button>등록</button>
      </form>
    </div>
  );
};

export default CreateBoard;
