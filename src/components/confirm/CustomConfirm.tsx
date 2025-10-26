import { confirmable, createConfirmation, type ConfirmDialogProps } from 'react-confirm';
import Modal from 'react-bootstrap/Modal';
import customConfirm from './CustomConfirm.module.css'
import { Button } from 'react-bootstrap';

const CustomConfirm = ({ show, proceed, message }: ConfirmDialogProps<{ message: string }, boolean>) => (
  <Modal show={show}>
        <Modal.Header>
      <p className={customConfirm.msg}>{message}</p>
        </Modal.Header>

        <Modal.Footer>
        <Button variant="primary" onClick={() => proceed(true)}>Yes</Button>
        <Button variant="secondary" onClick={() => proceed(false)}>No</Button>
        </Modal.Footer>
    </Modal>
);

export const confirm = createConfirmation(confirmable(CustomConfirm));