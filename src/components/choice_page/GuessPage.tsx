
import Button from 'react-bootstrap/Button';
import guessPageCss from './GuessPage.module.css'
import loadingPageCss from './LoadingPage.module.css'
import scorePageCss from './ScorePage.module.css'
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { GuessSystem } from './GuessSystem';
import { Constant } from '../global/constant';
import type { Data } from '../../util/googlesheetjson';
import { Score } from './Score';
import { confirm } from '../confirm/CustomConfirm';

function GuessPage() {
    const Page = {
        Loading: 'Loading',
        Guess: 'Guess',
        Score: 'Score',
    } as const;
    
    const [current_score, setCurrentScore] = useState(0);
    const [highest_score, setHighestScore] = useState(0);
    const [hidingAni, setHidingAni] = useState(false);
    const [current_page, setCurrentPage] = useState(Page.Loading as string);
    const [word, setWord] = useState<string|null>("Word");
    const [readed_word, setReadedWord] = useState(0);
    const [max_words, setMaxWords] = useState(0);
    const [show_loading, setShowLoading] = useState(false);
    const hiding_box = useRef(null);
    const is_do_increase_score = useRef(true);
    const words = useRef([] as Data[])
    const is_loading_data = useRef(false)

    const hind_arr = [
        ['ดิกชันนารี่', `https://www.online-english-thai-dictionary.com/?word=${word}&d=1&m=0&p=1`],
        ['สำนวน 1', `https://idioms.thefreedictionary.com/${word}`],
        ['สำนวน 2', `https://www.merriam-webster.com/dictionary/${word}`]
    ]

    const guessSys = useRef(new GuessSystem())
    const scoreSys = useRef(new Score())

    function give_up_btn(){
        if(!hidingAni){
            setHidingAni(true)
        }
    }

    async function next_segment(){
        setShowLoading(true)
        await guessSys.current.get_next_data().then((d)=>{
            words.current = d
            setShowLoading(false)
        })
    }

    async function next_word(is_do_count = true){
        let w : string | null = null
        let index = ((guessSys.current.get_current_i()) % (guessSys.current.get_n_in_segment()))
        if(!words.current.length || !index){
            if(is_do_count){
                guessSys.current.reset_seed()
            }
            await next_segment()
        } 
        if(words.current.length && guessSys.current.get_current_i() < guessSys.current.get_max_guess()){
            w = words.current[index][Constant.WORD_COL_NAME]
        }
        return w
    }

    function generate_hinds(){
        let hind = []
        for(let i=0;i<hind_arr.length;i++){
            let hind_data = hind_arr[i]
            hind.push(
                <Tab eventKey={i} title={hind_data[0]}>
                <iframe src={hind_data[1]}
                className={guessPageCss.iframe_window}></iframe>
                </Tab>
            )
        }
        return <Tabs defaultActiveKey="1">
                    {hind}
                    <Tab eventKey={hind.length} title="ค้นหา">
                        <div className={guessPageCss.iframe_window+" "+guessPageCss.search_google_btn}>
                            <Button size="lg" onClick={()=>{
                                window.open("https://www.google.com/search?q="+word+"%20%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%A7%E0%B9%88%E0%B8%B2", "_blank")
                            }}>กดเพื่อค้นหาผ่าน Google</Button>
                        </div>
                    </Tab>
                </Tabs>
    }

    async function set_next_word(is_do_count = true){
        if(is_do_count){
            guessSys.current.increase_current_i()
        }
        let w = await next_word(is_do_count)
        setWord(w)
        if(is_do_count){
            setReadedWord(readed_word+1)
        }
        setMaxWords(guessSys.current.get_max_guess())
        guessSys.current.continue_save()
        setHidingAni(false)
        show_result_when_no_next(w)
    }

    useEffect(()=>{
        init()
    },[])

    async function init(){
        guessSys.current.set_continue()
        scoreSys.current.set_continue()
        setReadedWord(Math.max(guessSys.current.get_current_i()+1, 1))
        await set_next_word(false)
        setCurrentPage(Page.Guess)
    }

    function show_result_when_no_next(word : string | null){
        if(!word){
            setCurrentScore(scoreSys.current.get_currnet_score())
            scoreSys.current.set_cap_highest_score(guessSys.current.get_max_guess())
            setHighestScore(scoreSys.current.get_highest_score())
            guessSys.current.continue_reset();
            scoreSys.current.score_reset_current_score();
            setCurrentPage(Page.Score)
        }
    }

  return (
    <div className={guessPageCss.bg}>
        <div className={(current_page === Page.Loading ? loadingPageCss.loading_box : guessPageCss.hide)}>
            <Spinner className={loadingPageCss.loading_spinner} animation="border" variant="light" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        <div className={(current_page === Page.Guess ? guessPageCss.question_box : guessPageCss.hide)}>
            <div className={guessPageCss.count_readed_word}>
                <p className={guessPageCss.readed_text}>{readed_word} / {max_words}</p>
            </div>
            <div className={guessPageCss.question}>
                <p className={guessPageCss.question_text}>{word}</p>
            </div>
            <div className={guessPageCss.guess}>
                <div className={guessPageCss.hiding_box+" "+
                    (hidingAni? guessPageCss.disabled : "")
                } ref={hiding_box}>
                    <Button variant="warning" size='lg' className={guessPageCss.give_up_btn}
                    onClick={()=>{
                        is_do_increase_score.current = false
                        give_up_btn()
                        }}>เฉลย</Button>
                </div>
                {generate_hinds()}
                <Container className={guessPageCss.nextBtn}>
                    <Row>
                        <Col>
                        <Button variant="secondary" size='lg' onClick={async()=>{
                                let res = await confirm({message: 'ต้องการจะเริ่มใหม่หรือไม่?'})
                                if(res){
                                    (new GuessSystem).continue_reset();
                                    (new Score).score_reset_current_score();
                                    window.location.reload()
                                }
                            }}>ลองใหม่</Button>
                        </Col>
                        <Col>
                        <Button variant="primary" size='lg'
                        onClick={async()=>{
                            if(!is_loading_data.current){
                                is_loading_data.current = true
                                if(is_do_increase_score.current){
                                    scoreSys.current.increase_score()
                                    scoreSys.current.set_highest_score(scoreSys.current.get_currnet_score())
                                    scoreSys.current.score_save()
                                } else {
                                    is_do_increase_score.current = true
                                }
                                await set_next_word();
                                is_loading_data.current = false
                            }
                            }}>{show_loading ? "Loading . . ." : "ต่อไป"}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>    
        <div className={(current_page === Page.Score ? scorePageCss.score_box : guessPageCss.hide)}>
            <div className={scorePageCss.body}>
                <div className={scorePageCss.hight_score_text}>
                    <p>คำที่ไม่ได้กดเฉลยสูงสุด: <span>{Number(highest_score/guessSys.current.get_max_guess()*100).toFixed(2)} คำ</span></p>
                </div>
                <div className={scorePageCss.hight_score_text}>
                    <p>คำที่ไม่ได้กดเฉลยที่ทำ: <span>{Number(current_score/guessSys.current.get_max_guess()*100).toFixed(2)} คำ</span></p>
                </div>
                <Button variant="primary" size='lg' onClick={()=>{
                        window.location.reload()
                    }}>เริ่มใหม่</Button>
            </div>
        </div>
    </div>
  )
}

export default GuessPage
