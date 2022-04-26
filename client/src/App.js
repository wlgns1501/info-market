// import logo from '../src/images/logo.png';
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import Home from './pages/user/Home';
import SideBar from './component/MypageCompo/SideBar';
import FreeWriting from './component/MypageCompo/FreeWriting';
import SalesWriting from './component/MypageCompo/SalesWriting';
import MyPosts from './component/MypageCompo/MyPosts';
import PaidPosts from './component/MypageCompo/PaidPosts';
import ChargedPointList from './component/MypageCompo/ChargedPointList';
import RefundList from './component/MypageCompo/RefundList';
import UserInfoChange from './component/MypageCompo/UserInfoChange';
import UserInfo from './component/MypageCompo/UserInfo';
import Mypage from './pages/user/Mypage';
import Mainpage from './pages/user/Mainpage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="main" element={<Mainpage />}>
            {/* <Route path="freePostList">
              <Route index element={<FreePostList />} />
              <Route path=":postId" element={<FreePost />} />
            </Route>
            <Route path="salesPostList">
              <Route index element={<SalesPostList />} />
              <Route path=":postId" element={<SalesPost />} />
            </Route> */}
          </Route>
          <Route path="mypage" element={<SideBar />}>
            <Route index element={<Mypage />} />
            <Route path="info" element={<UserInfo />}>
              <Route path="change" element={<UserInfoChange />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="paidPosts" element={<PaidPosts />} />
              <Route path="chargedPointList" element={<ChargedPointList />} />
              <Route path="refundList" element={<RefundList />} />
            </Route>
            <Route path="freeWriting" element={<FreeWriting />} />
            <Route path="salesWriting" element={<SalesWriting />} />
          </Route>
          {/* <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
