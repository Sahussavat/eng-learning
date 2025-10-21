
import Button from 'react-bootstrap/Button';
import choicesPageCss from './ChoicesPage.module.css'
import { GoogleSheetJSON } from '../../util/googlesheetjson.tsx'

function ChoicesPage() {
    const parser = new GoogleSheetJSON("1SMrtUHsHCzi5tyO_NTIBRTV3LY63QQuk0ZspYtHOkdQ", {
        sheetName: "ชีต1",
        start: 1,
        end: 8
    })
    parser.parse().then((d)=>{
        console.log(d)
    })
    let items : string[] = ["ยักษ์", "เล็ก", "ไก่"]

    let choices = []

    for (let i = 0; i < items.length; i++) {
        choices.push(
            <div>
                <Button variant="secondary" className={choicesPageCss.choice_btn}>
                    {String.fromCharCode(65+i)}: {items[i]}</Button>
            </div>
        );
    }

  return (
    <div className={choicesPageCss.bg}>
        <div className={choicesPageCss.question_box}>
            <div className={choicesPageCss.question}>
                <p className={choicesPageCss.question_text}>Finished</p>
            </div>
            <div className={choicesPageCss.choices}>
                {choices}
            </div>
            <div className={choicesPageCss.nextBtn}>
                <Button variant="primary" size='lg'>ต่อไป</Button>
            </div>
        </div>    
    </div>
  )
}

export default ChoicesPage
