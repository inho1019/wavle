import React, { useState } from 'react';

const MyPageReview = (props) => {
    const {styles} = props

    // 더보기 구현용 state
    const [more,setMore] = useState(false)
    // DTO를 JSON 형식의 state로 만듬
    const [content,setContent] = useState('')
    // 이미지 파일 blob 저장용 - multifle이 아닌 3개 고정이기에 3개짜리 배열
    const [images,setImages] = useState([{},{},{}])

    const onContent = (e) => {
        //500자까지 제한
        if(e.target.value.length <= 500) {
            setContent(e.target.value)
        }
    }
 
    // 이미지 파일을 넣었을때 실행되는 함수
    const onImage = (e) => {
        //length로 이미지 존재여부 판별(팝업창에서 취소를 누르면 length가 0으로옴)
        if(e.target.files.length > 0) {
        const img = e.target.files[0]

            const imageArray = [...images]
            
            //name값을 이미지 배열의 index로 사용
            imageArray[e.target.name] = {
                name : img.name,
                src : URL.createObjectURL(img) //이미지 블룹 처리해서 임시 저장 - 미리보기 띄우기 용
             }

            setImages(imageArray)
        } else {
            //만약 취소를 눌러 이미지가 오지않을 경우 해당 값을 비움
            const imageArray = [...images]
            
            imageArray[e.target.name] = {}

            setImages(imageArray)
        }
    }

    // 취소 - 따로 주어지지 않아서 리셋으로 설정
    const onReset = () => {

        //input에 남아있는 잔여데이터를 지운다 - 이유는 단순히 배열만 비우면 동일한 이미지를 올렸을때 이미 올라가있는 이미지를 넣는다고 생각해서 반응을 안하기 때문
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {input.value = ''});
      
        setImages([{},{},{}])
        setContent('')
    }

    //등록하기
    const onSubmit = () => {
        //내용이 30자 미만일 경우 유효성 검사
        if( content.length < 30 ) {
            alert('내용을 30자 이상으로 입력해주세요')//따로 가이드 라인이 없어서 alert로 띄움
        //내용이 500자 초과일 경우 유효성
        } else if( content.length > 500 ) {
            alert('내용을 500자 이하로 입력해주세요')
        } else {
            //리뷰 dto를 잡음
            const reviewDTO = { content : content , //내용
                        fileNum : images.filter(img => img.name).length,  //이미지 개수를 이미지이름 존재여부로 filter처리해서 length를 받는다
                        fileName : [...images.filter(img => img.name).map(item => item.name)]} //마찬가지로 filter처리해서 name을 반환받아서 배열로 넣는다
    
            //과제 목표를 console로 찍는다
            console.log('후기 데이터 - 내용 : ' + reviewDTO.content + ' 파일 개수 : ' + reviewDTO.fileNum + ' 파일 원본 이름 : [' + reviewDTO.fileName + ']')

            //완료후 입력값 초기화
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {input.value = ''});
            setImages([{},{},{}])
            setContent('')
        }
    }

    return (
        <div className={styles.reviewContainer}>
            {/* 리뷰 폼 */}
            <div className={styles.reviewForm}>
                <div className={styles.reviewFormTop}>
                    <h2>싱글 직장인 와인 파티</h2>
                    <h3>20대 후반~30대 초반</h3>
                </div>
                <div className={styles.reviewFormTitle}>
                    <h2 style={{color:'#222222'}}>모임 일자</h2>
                    <h2 style={{color:'#444444'}}>2월 10일 토요일 오후 5시</h2>
                </div>
                <textarea minLength={30} maxLength={500} rows={6}
                    value={content}
                    onChange={(e) => onContent(e)}
                    className={styles.reviewFormTextArea}
                    placeholder={`내용을 입력하세요\n30자~500자 등록 가능`}/>
                <div className={styles.fileBox}>
                    <div className={styles.fileItem}>
                        <input type='file' name={0} accept="image/*" onChange={(e) => onImage(e)}/>{/* name으로 배열에서 쓸 index를 설정 */}
                        {/* images에서 해당 인덱스의 값이 있는지 판별 조건문을 걸어 이미지를 띄우거나 텍스트를 띄움 */}
                        {images[0].name ? 
                        <img src={images[0].src} className={styles.fileImg} alt='1번 이미지'/> 
                        :<div className={styles.fileItemTxt}>
                            <div>+</div>
                            <p>사진 첨부</p>
                        </div>}
                    </div>
                    <div className={styles.fileItem}>
                        <input type='file' name={1} accept="image/*" onChange={(e) => onImage(e)}/>
                        {images[1].name ? 
                        <img src={images[1].src} className={styles.fileImg} alt='2번 이미지'/> 
                        :<div className={styles.fileItemTxt}>
                            <div>+</div>
                            <p>사진 첨부</p>
                        </div>}
                    </div>
                    <div className={styles.fileItem}>
                        <input type='file' name={2} accept="image/*" onChange={(e) => onImage(e)}/>
                        {images[2].name ? 
                        <img src={images[2].src} className={styles.fileImg} alt='3번 이미지'/> 
                        :<div className={styles.fileItemTxt}>
                            <div>+</div>
                            <p>사진 첨부</p>
                        </div>}
                    </div>
                </div>
                <div className={styles.butContainer}>
                    <button className={styles.butSubmit} onClick={onSubmit}>등록하기</button>
                    <button className={styles.butCancel} onClick={onReset}>취소</button>
                </div>
            </div>
            {/* 하단 리뷰 폼 - 실제 동작용은 아님 */}
            <div className={styles.reviewForm} style={{minHeight: '220px'}}>
                <div className={styles.reviewFormTop}>
                    <h2 style={{color:'#222222'}}>모임 일자</h2>
                    <h2 style={{color:'#444444'}}>2월 10일 토요일 오후 5시</h2>
                </div>
                <div className={styles.reviewFormTitle}>
                    <h2>모임 일자</h2>
                    <h2>2월 10일 토요일 오후 5시</h2>
                </div>
                <p>후기를 작성해주세요.<br/>
                소정의 포인트가 지급됩니다.</p>
                <div className={styles.butContainer}>
                    <button className={styles.butSubmit}>후기 수정</button>
                    <button className={styles.butCancel}>후기 보기</button>
                </div>
            </div>
            {/* 더보기 */}
            {/* more에따라 영억 보임 숨김 설정 */}
            {more && <div style={{minHeight:'400px'}}></div> }
            <button className={styles.moreBut} onClick={() => setMore(!more)}>{more ? '접기' : '더 보기'}</button>
        </div>
    );
};

export default MyPageReview;