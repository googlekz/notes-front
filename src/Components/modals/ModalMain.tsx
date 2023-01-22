import React from 'react'
import './ModalMain.scss'
import UiDelete from '../Ui/UiDelete'

const ModalMain = ({ typeModal, closeModal, deleteGroup }: any) => {
  if (!typeModal) {
    return null
  }
  return (
        <div className="modal-main">
            <div className="modal-main__content">
                <UiDelete
                    onClick={closeModal}
                    className="modal-main__close"
                />
                <h1 className="modal-main__title">Удалить группу?</h1>
                <div className="modal-main__buttons">
                    <button
                        className="modal-main__button modal-main__button_yes"
                        onClick={deleteGroup}
                    >Да</button>
                    <button
                        className="modal-main__button modal-main__button_no"
                        onClick={closeModal}
                    >Нет</button>
                </div>
            </div>
        </div>
  )
}

export default ModalMain
