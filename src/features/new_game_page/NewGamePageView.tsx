import { confirmable, createConfirmation, type ConfirmDialogProps } from 'react-confirm';
import Modal from 'react-bootstrap/Modal';
import newGameCustomConfirm from './NewGamePage.module.css'
import { Button } from 'react-bootstrap';
import type { MainPageViewModel } from '../main_page/MainPageViewModel';

const CustomConfirm = ({ show, proceed, vm }: ConfirmDialogProps<{ vm: MainPageViewModel }, boolean>) => (
  <Modal show={show}>
        <Modal.Header>
      <p className={newGameCustomConfirm.msg}>ต้องการจะเริ่มใหม่หรือไม่</p>
        </Modal.Header>
        <Modal.Body>
            <div className={newGameCustomConfirm.startAtInputBox}>
                <div><label>เริ่มที่คำที่</label></div>
                <div>
                    <div><input type='number' max={vm.max_words_total}
                    defaultValue={1}
                     onChange={vm.set_start_i_input}>
                    </input>
                    </div>
                    <div>/ {vm.max_words_total}</div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => proceed(true)}>ใช่</Button>
        <Button variant="secondary" onClick={() => proceed(false)}>ไม่</Button>
        </Modal.Footer>
    </Modal>
);

export const new_game_confirm = createConfirmation(confirmable(CustomConfirm));