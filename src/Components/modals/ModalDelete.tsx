import React from 'react'
import axios from 'axios'
import './ModalDelete.scss'
import { mainUrl } from '../../config'

const ModalDelete = ({ closeModal, refreshData, group }: any): any => {
  const deleteGroup = async (isDeleteNote: boolean): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await axios.delete(`${mainUrl}/groups/${group?.id}?isDeleteNote=${isDeleteNote}`)
    refreshData()
    closeModal()
  }
  return (
        <div className="modal-delete">
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <p className="modal-delete__title">Удалить группу с заметками ({`${group.count_notes}`})?</p>
            <div className="modal-delete__buttons">
                <button
                    className="modal-delete__button modal-delete__button_yes"
                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                    onClick={async () => { await deleteGroup(true) }}
                >
                    Да
                </button>
                <button
                    className="modal-delete__button modal-delete__button_no"
                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                    onClick={async () => { await deleteGroup(false) }}
                >
                    Нет
                </button>
            </div>
        </div>
  )
}

export default ModalDelete
