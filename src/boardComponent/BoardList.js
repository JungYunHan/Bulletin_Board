import { Link } from 'react-router-dom';

const BoardList = ({ boards }) => {
  return (
    <div className='board-list'>
      {boards.map((board) => (
        <div className='board-preview' key={board.id}>
          <Link to={`/boards/${board.id}`}>
            <h2>{board.title}</h2>
            <p>작성 시간: {board.createdAt}</p>
            <p>작성자: {board.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
