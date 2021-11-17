import React, { useState } from 'react';
import styles from './Modal.module.scss';
import Button from '../Buttons/Button';
import ReactDOM from 'react-dom';

const Modal = (props) => {

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <>
            {ReactDOM.createPortal(
                <div onClick={props.onExit} className={styles.modal}>
                    <div onClick={stopPropagation} className={styles['modal-inner']}>
                        <div className={styles.modalHeader}>
                            <h1 className={styles.title}>{props.title}</h1>
                            <Button onClick={props.onExit} text="x"styling="closeButton"/>
                        </div>
                        <div className={styles.modalBody}>
                            {props.children}
                        </div>
                        <div className={styles.modalFooter}>
                            {props.showLoading && <p>Loading..</p>}
                            {props.showError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
                            {props.showSuccess && <p className={styles.successMessage}>{props.successMessage}</p>}
                        </div>
                    </div>
                </div>,
                document.getElementById('modal')
            )}
        </>
    );
};

export default Modal;