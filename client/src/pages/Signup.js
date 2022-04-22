import React from 'react'
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

  const handleCreateId = () => {
    navigate(`/login`)
  }


  return (
    <>
      <Header />
      <div>
        여기가 회원가입
      </div>
      <button onClick={handleCreateId}>가입완료</button>
      <Footer />
    </>
  )
}

export default Signup