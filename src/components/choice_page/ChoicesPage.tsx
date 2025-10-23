
import Button from 'react-bootstrap/Button';
import choicesPageCss from './ChoicesPage.module.css'
import { GoogleSheetJSON } from '../../util/googlesheetjson.tsx'
import { Tab, Tabs } from 'react-bootstrap';

function ChoicesPage() {
    const parser = new GoogleSheetJSON("1SMrtUHsHCzi5tyO_NTIBRTV3LY63QQuk0ZspYtHOkdQ", {
        sheetName: "ชีต1",
        start: 1,
        end: 8
    })
    parser.parse().then((d)=>{
        
    })

  return (
    <div className={choicesPageCss.bg}>
        <div className={choicesPageCss.question_box}>
            <div className={choicesPageCss.question}>
                <p className={choicesPageCss.question_text}>Finished</p>
            </div>
            <div className={choicesPageCss.choices}>
                <div className={choicesPageCss.hiding_box}>
                    <Button variant="warning" size='lg' className={choicesPageCss.give_up_btn}>เฉลย</Button>
                </div>
                <Tabs defaultActiveKey="first">
                    <Tab eventKey="first" title="ดิกชันนารี่">
                    <iframe src='https://www.online-english-thai-dictionary.com/?word=armor&d=1&m=0&p=1'
                    className={choicesPageCss.iframe_window}></iframe>
                    </Tab>
                    <Tab eventKey="second" title="สำนวน 1">
                    <iframe src='https://www.online-english-thai-dictionary.com/?word=armor&d=1&m=0&p=1'
                    className={choicesPageCss.iframe_window}></iframe>
                    </Tab>
                    <Tab eventKey="third" title="สำนวน 2">
                    <iframe src='https://www.online-english-thai-dictionary.com/?word=armor&d=1&m=0&p=1'
                    className={choicesPageCss.iframe_window}></iframe>
                    </Tab>
                </Tabs>
            </div>
            <div className={choicesPageCss.nextBtn}>
                <Button variant="primary" size='lg'>ต่อไป</Button>
            </div>
        </div>    
    </div>
  )
}

export default ChoicesPage
