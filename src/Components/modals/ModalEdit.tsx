import React from 'react'
import './ModalEdit.scss'
import NoteForms from '../forms/NoteForms'
import axios from 'axios'
import { mainUrl } from '../../config'

interface test {
  id: number
}

const ModalEdit = ({ groups, note, closeModal, refreshData }: any): any => {
  const editNoteModal = async (item: test): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!item) {
      return
    }
    await axios.put(`${mainUrl}/notes/${item.id}`, {
      ...item
    })
    refreshData()
    closeModal()
  }
  return (
        <div>
            <NoteForms groups={groups} change={editNoteModal} data={note}/>
        </div>
  )
}

export default ModalEdit
