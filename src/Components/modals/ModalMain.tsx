import React from 'react'
import './ModalMain.scss'
import UiDelete from '../Ui/UiDelete'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'

const ModalMain = ({ modalData, closeModal, refreshData, groups }: any): any => {
  if (!modalData.modalActive) {
    return null
  }
  const typeModal = modalData.modalActive
  return (
        <div className="modal-main">
            <div className="modal-main__content">
                <UiDelete
                    onClick={closeModal}
                    className="modal-main__close"
                />
                {
                    (typeModal === 'delete' && modalData?.deleteGroup !== null)
                      ? <ModalDelete
                            group={modalData.deleteGroup}
                            closeModal={closeModal}
                            refreshData={refreshData}
                        />
                      : null
                }
                {
                    (typeModal === 'edit' && modalData?.noteActive !== null)
                      ? <ModalEdit
                            groups={groups}
                            note={modalData.noteActive}
                            closeModal={closeModal}
                            refreshData={refreshData}
                        />
                      : null
                }
            </div>
        </div>
  )
}

export default ModalMain
