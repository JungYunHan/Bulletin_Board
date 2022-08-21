import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import useFetch from './util/useFetch';

const Main = React.lazy(() => import('./Main'));
const Navbar = React.lazy(() => import('./component/Navbar'));
const Loading = React.lazy(() => import('./component/Loading'));
const BoardDetail = React.lazy(() => import('./boardComponent/BoardDetail'));
const CreateBoard = React.lazy(() => import('./boardComponent/CreateBoard'));
const EditBoard = React.lazy(() => import('./boardComponent/EditBoard'));

function App() {
  const { data, isPending } = useFetch(`http://localhost:3001/boards`);
  return (
    <div className='App'>
      <Navbar />
      <div className='content'>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              exact
              path='/'
              element={<Main boards={data} isPending={isPending} />}
            />
            <Route path='/boards/:id' element={<BoardDetail />} />
            <Route path='/create' element={<CreateBoard />} />
            <Route path='/edit/:id' element={<EditBoard />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
