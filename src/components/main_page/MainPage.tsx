
import Button from 'react-bootstrap/Button';
import mainPageCss from './MainPage.module.css'

function MainPage() {

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
                <Button variant="primary" size='lg'>Start</Button>
            </div>
        </div>    
    </div>
  )
}

export default MainPage
