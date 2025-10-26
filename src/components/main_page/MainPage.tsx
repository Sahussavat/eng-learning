
import Button from 'react-bootstrap/Button';
import mainPageCss from './MainPage.module.css'
import { useNavigate } from 'react-router-dom';
import { GuessSystem } from '../global/GuessSystem';
import { Score } from '../global/Score';
import { confirm } from '../confirm/CustomConfirm';
import { SaveNLoad } from '../global/SaveNLoad';

function MainPage() {
    const navigate = useNavigate();
    

    return (
        <div className={mainPageCss.bg}>
            <div className={mainPageCss.start_box}>
                <div className={mainPageCss.header}>
                    <p className={mainPageCss.title_text}>ewqeqweqwe</p>
                </div>
                <div className={mainPageCss.body}>
                    <div className={mainPageCss.hight_score_text}>
                        <p>Previous Correct Percent: <span>0</span></p>
                    </div>
                    <span className={mainPageCss.btns}>
                    <Button className={SaveNLoad.is_has_save(SaveNLoad.CONTINUE_SAVE_NAME) ? "":mainPageCss.hide}
                     variant="primary" size='lg' onClick={()=>{
                        navigate('/guess');
                    }}>Continue</Button>
                    </span>
                    <span className={mainPageCss.btns}>
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
                        
                    }}>Start</Button>
                    </span>
                </div>
            </div>    
        </div>
  )
}

export default MainPage
