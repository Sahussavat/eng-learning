import { Button, Tab, Tabs } from "react-bootstrap"
import guessPageCss from '../../css/GuessPage.module.css'

export function HintSectionView(props : { word: string; }){
    const hints_arr = [
        ['ดิกชันนารี่', `https://www.online-english-thai-dictionary.com/?word=${props.word}&d=1&m=0&p=1`],
        ['สำนวน 1', `https://idioms.thefreedictionary.com/${props.word}`],
        ['สำนวน 2', `https://www.merriam-webster.com/dictionary/${props.word}`]
    ]
    
    function generate_hints(){
        let hints = []
        for(let i=0;i<hints_arr.length;i++){
            let hind_data = hints_arr[i]
            hints.push(
                <Tab eventKey={i} title={hind_data[0]}>
                <iframe src={hind_data[1]}
                className={guessPageCss.iframe_window}></iframe>
                </Tab>
            )
        }
        return <Tabs defaultActiveKey="1">
                    {hints}
                    <Tab eventKey={hints.length} title="ค้นหา">
                        <div className={guessPageCss.iframe_window+" "+guessPageCss.search_google_btn}>
                            <Button size="lg" onClick={()=>{
                                window.open("https://www.google.com/search?q="+props.word+"%20%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%A7%E0%B9%88%E0%B8%B2", "_blank")
                            }}>กดเพื่อค้นหาผ่าน Google</Button>
                        </div>
                    </Tab>
                </Tabs>
    }
    return (generate_hints());
}