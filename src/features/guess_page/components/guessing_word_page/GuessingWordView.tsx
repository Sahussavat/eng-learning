import { Button, Col, Container, Row } from "react-bootstrap";
import { HintSectionView } from "../hint_section/HintSectionView";
import { confirm } from "../../../../shared/components/confirm/CustomConfirm";
import guessPageCss from '../../css/GuessPage.module.css'
import type { GuessPageViewModel } from "../../GuessPageViewModel";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function GuessingWordView(props : { vm : GuessPageViewModel }) {
    const vm = props.vm;
    const navigate = useNavigate();
    const is_pressed_button = useRef<boolean>(false);
    return (
        <div>
            <div className={guessPageCss.count_readed_word}>
                <p className={guessPageCss.readed_text}>{vm.current_i} / {vm.max_words_total}</p>
            </div>
            <div className={guessPageCss.question}>
                <p className={guessPageCss.question_text}>{vm.word}</p>
            </div>
            <div className={guessPageCss.guess}>
                <div className={guessPageCss.hiding_box+" "+
                    (vm.show_hint? guessPageCss.disabled : "")
                }>
                    <Button variant="warning" size='lg' className={guessPageCss.give_up_btn}
                    onClick={()=>{
                        vm.do_show_hint();
                        }}>เฉลย</Button>
                </div>
                <HintSectionView word={vm.word}/>
                <Container className={guessPageCss.nextBtn}>
                    <Row>
                        <Col>
                        <Button variant="secondary" size='lg' onClick={async()=>{
                                let res = await confirm({message: 'ต้องการจะเริ่มใหม่หรือไม่?'})
                                if(res){
                                    vm.do_reset();
                                }
                            }}>ลองใหม่</Button>
                        </Col>
                        <Col>
                        <Button variant="secondary" size='lg'
                        onClick={()=>{
                            navigate("/home");
                            }}>Home</Button>
                        </Col>
                        <Col>
                        <Button variant="primary" size='lg'
                        onClick={async()=>{
                            if (is_pressed_button.current || vm.is_wait_load_data) return;
                            is_pressed_button.current = true;
                            await vm.do_next_word();
                            is_pressed_button.current = false;
                            }}>{vm.is_wait_load_data ? "..." : "ต่อไป"}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}