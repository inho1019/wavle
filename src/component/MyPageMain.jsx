import React, { useState } from 'react';
import MyPageNav from './MyPageNav';
import MyPageReview from './MyPageReview';
import styles from '../css/myPage.module.css'

const MyPageMain = () => {


    const [page,setPage] = useState(4)

    // 자식에게 넘겨주기 위한 함수 구현
    const onPage = (num) => {
        setPage(num)
    } 

    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <h1>마이페이지</h1>
            </header>
            {/* 후에 재사용성을 위해 navBar 잡기 */}
                <MyPageNav styles={styles} page={page} onPage={onPage}/>
            {/* navbar에서 받아오는 page값에 따라 변경, 현재는 후기만 구현 */}
                {page === 4 && <MyPageReview styles={styles} />}
                {/* {page === 0 && 신청 내역 }
                {page === 1 && 찜한 모임 }
                {page === 2 && 포인트 }
                {page === 3 && 내정보 }
                {page === 5 && 문의 내역 } */}
        </div>
    );
};

export default MyPageMain;