import React from 'react';

const MyPageNav = (props) => {
    //부모에게 상속 받은 props
    const {styles,page,onPage} = props

    return (
        <div className={styles.navContainer}>
            <div
                //페이지 설정 
                onClick={() => onPage(0)}
                // 현재 페이지인 nav항목은 bold처리
                style={{fontWeight: page === 0 && 'bold' }}
            >신청 내역</div>
            <div
                onClick={() => onPage(1)}
                style={{fontWeight: page === 1 && 'bold' }}
            >찜한 모임</div>
            <div
                onClick={() => onPage(2)}
                style={{fontWeight: page === 2 && 'bold' }}
            >포인트</div>
            <div
                onClick={() => onPage(3)}
                style={{fontWeight: page === 3 && 'bold' }}
            >내정보</div>
            <div
                onClick={() => onPage(4)}
                style={{fontWeight: page === 4 && 'bold' }}
            >후기 관리</div>
            <div
                onClick={() => onPage(5)}
                style={{fontWeight: page === 5 && 'bold' }}
            >문의 내역</div>
        </div>
    );
};

export default MyPageNav;