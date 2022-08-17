import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1>자유 게시판</h1>
      </Link>
      <div className='links'>
        <Link to='/create'>게시글 작성</Link>
      </div>
    </nav>
  );
};

export default Navbar;
