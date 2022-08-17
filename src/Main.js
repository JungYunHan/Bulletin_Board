import BoardList from './boardComponent/BoardList';
import Loading from './component/Loading';

const Main = ({ boards, isPending }) => {
  return (
    <div className='main'>
      {isPending && <Loading />}
      {boards && <BoardList boards={boards} />}
    </div>
  );
};

export default Main;
