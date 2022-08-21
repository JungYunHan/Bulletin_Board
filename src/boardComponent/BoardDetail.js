import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../util/useFetch';

const BoardDetail = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const { data: board, isPending } = useFetch(
    `http://localhost:3001/boards/${id}`
  );

  const handleDeleteClick = async () => {
    fetch(`http://localhost:3001/boards/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .catch((board) => console.log(board));
    navigate('/');
    alert('게시글이 삭제되었습니다.');
    window.location.reload();
  };

  return (
    <div className='board-details'>
      {isPending && <div>Loading...</div>}
      {board && (
        <article>
          <h2>{board.title}</h2>
          <span>작성자 {board.author}</span>
          <span>작성 시간 {board.createdAt}</span>
          <div>{board.body}</div>
          <button className='links'>
            <Link to={`/edit/${board.id}`}>게시글 수정</Link>
          </button>
          <button className='links' onClick={handleDeleteClick}>
            delete
          </button>
        </article>
      )}
    </div>
  );
};

export default BoardDetail;
