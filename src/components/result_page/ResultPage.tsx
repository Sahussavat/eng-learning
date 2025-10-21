
import Button from 'react-bootstrap/Button';
import resultPageCss from './ResultPage.module.css'

function ResultPage() {

  return (
    <div className={resultPageCss.bg}>
        <div className={resultPageCss.start_box}>
            <div className={resultPageCss.header}>
                <p className={resultPageCss.title_text}>Finished</p>
            </div>
            <div className={resultPageCss.body}>
                <div className={resultPageCss.hight_score_text}>
                    <p>Previous Correct Percent: <span>0</span></p>
                    <p>Correct Percent: <span>0</span></p>
                </div>
                <Button variant="primary" size='lg'>Start Again</Button>
            </div>
        </div>    
    </div>
  )
}

export default ResultPage
