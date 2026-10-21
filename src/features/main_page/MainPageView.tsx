
import Button from 'react-bootstrap/Button';
import mainPageCss from './MainPage.module.css'
import loadingPageCss from '../../shared/components/loading/loadingComponent.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import { NewGameBtn } from './components/new_game_btn/NewGameBtnView';
import { MainPageViewModel, PAGE } from './MainPageViewModel';
import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from '../../shared/components/loading/loadingComponent';

function MainPage() {
    const vm = MainPageViewModel();
    const navigate = useNavigate();
    return (
        <div className={mainPageCss.bg}>
            <div className={(vm.page === PAGE.LOADING ? loadingPageCss.loading_box : mainPageCss.hide)}>
                <LoadingComponent></LoadingComponent>
            </div>
            <div className={(vm.page === PAGE.HOME_PAGE ? mainPageCss.start_box : mainPageCss.hide)}>
                <div className={mainPageCss.header}>
                    <p className={mainPageCss.title_text}>ฝึกศัพท์</p>
                </div>
                <div className={mainPageCss.body}>
                    <div className={mainPageCss.hight_score_text}>
                        <p>คำที่ไม่ได้กดเฉลยสูงสุด: <span>{vm.highest_score} คำ</span></p>
                    </div>
                    <div className={mainPageCss.btn_box}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col className={vm.progress_repo.is_have_save() ? "":mainPageCss.hide}>
                            <Button variant="primary" size='lg' onClick={()=>{
                                navigate('/guess');
                            }}>เล่นต่อ</Button>
                            </Col>
                            <Col>
                            <NewGameBtn vm={vm}></NewGameBtn>
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
