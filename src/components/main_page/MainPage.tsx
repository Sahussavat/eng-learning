
import Button from 'react-bootstrap/Button';
import mainPageCss from './MainPage.module.css'
import { useNavigate } from 'react-router-dom';
import { GuessSystem } from '../global/GuessSystem';
import { Score } from '../global/Score';
import { confirm } from '../confirm/CustomConfirm';
import { SaveNLoad } from '../global/SaveNLoad';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';

function MainPage() {
    const navigate = useNavigate();
    const [highest_score, setHighestScore] = useState(0);
    const scoreSys = useRef(new Score())

    useEffect(()=>{
        scoreSys.current.set_continue()
        setHighestScore(scoreSys.current.get_highest_score())
    }, [])

    return (
        <div className={mainPageCss.bg}>
            <div className={mainPageCss.start_box}>
                <div className={mainPageCss.header}>
                    <p className={mainPageCss.title_text}>ฝึกศัพท์</p>
                </div>
                <div className={mainPageCss.body}>
                    <div className={mainPageCss.hight_score_text}>
                        <p>คะแนนสูงสุด: <span>{highest_score} คำ</span></p>
                    </div>
                    <div className={mainPageCss.btn_box}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col className={SaveNLoad.is_has_save(SaveNLoad.CONTINUE_SAVE_NAME) ? "":mainPageCss.hide}>
                            <Button variant="primary" size='lg' onClick={()=>{
                                navigate('/guess');
                            }}>Continue</Button>
                            </Col>
                            <Col>
                            <Button variant="primary" size='lg' onClick={async()=>{
                                if(SaveNLoad.is_has_save(SaveNLoad.CONTINUE_SAVE_NAME)){
                                    let res = await confirm({ 
                                        message: 'ต้องการจะเริ่มใหม่หรือไม่?' 
                                    })
                                    if(res){
                                        (new GuessSystem).continue_reset();
                                        (new Score).score_reset_current_score();
                                        navigate('/guess');
                                    }
                                } else {
                                    navigate('/guess');
                                }
                                
                            }}>เริ่มใหม่</Button>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                </div>
            </div>    
        </div>
  )
}

export default MainPage
