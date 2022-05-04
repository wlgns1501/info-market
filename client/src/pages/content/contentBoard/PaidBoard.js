import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/* 폰트어썸, 더보기, 글작성 디자인 */
import axios from 'axios';

function PaidBoard() {
  const [isPaidList, setPaidList] = useState();

  /* 목록 더보기 이벤트 */
  const handleClick = () => {};

  return (
    <div>
      <div>
        <h3>여기는 유료게시판</h3>
      </div>
      <div>
        누르면 유료글작성이동
        <Link to="/paidboard/writepaid">
          <li>글작성</li>
        </Link>
      </div>
    </div>
  );
}

export default PaidBoard;
