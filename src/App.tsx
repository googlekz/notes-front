import React, { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import NotesItem from './Components/NotesItem'
import LeftMenu from './Components/LeftMenu'
import NoteForms from './Components/forms/NoteForms'
import ModalMain from './Components/modals/ModalMain'
import { mainUrl } from './config'

function App (): any {
  const [rendered, setRendered] = useState<boolean | null>(null)
  const [notes, setNotes] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState({}) as any
  const [modalData, setModalData] = useState({
    modalActive: null,
    deleteGroup: null,
    noteActive: null
  }) as any

  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!rendered) {
        // eslint-disable-next-line
        setRendered(true)
        return
      }
      await refreshData()
    })()
  }, [rendered])

  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (rendered) {
        await getNotes()
      }
    })
  }, [selectedGroup])

  const getNotes = async (): Promise<void> => {
    const params = {} as any
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (selectedGroup?.id) {
      params.group = selectedGroup.id
    }
    const { data } = await axios.get(`${mainUrl}/notes`, { params })
    setNotes(data)
  }

  const getGroups = async (): Promise<void> => {
    const { data } = await axios.get(`${mainUrl}/groups`)
    setGroups(data)
  }

  const deleteNote = async (id: number): Promise<void> => {
    await axios.delete(`${mainUrl}/notes/${id}`)
    await refreshData()
  }

  const editNote = async (item: any): Promise<void> => {
    setModalData({
      modalActive: 'edit',
      deleteGroup: null,
      noteActive: item
    })
  }

  const refreshData = async (): Promise<void> => {
    await getNotes()
    await getGroups()
  }

  const sortNotes = (group: any): void => {
    if (group?.id === selectedGroup?.id) {
      setSelectedGroup({})
      return
    }
    setSelectedGroup(group)
  }

  const closeModal = (): void => {
    setModalData({
      modalActive: null,
      deleteGroup: null,
      noteActive: null
    })
  }

  const showDeleteModal = (group: any): any => {
    setModalData({
      noteActive: null,
      modalActive: 'delete',
      deleteGroup: group
    })
  }

  return (
    <div className="app">
      <LeftMenu
        activeGroup={selectedGroup}
        sortNotes={sortNotes}
        deleteGroup={showDeleteModal}
        change={getGroups}
        groups={groups}
      />
      <div className="app__content">
        <NoteForms
          selectedGroup={selectedGroup}
          change={async () => { await refreshData() }}
          groups={groups}
        />
        <div className="app__notes">
          {
            notes.map((item: any) =>
              <NotesItem
                deleteItem={deleteNote}
                editItem={editNote}
                key={item.id}
                item={item}
              />
            )
          }
        </div>
      </div>
      <ModalMain
        groups={groups}
        refreshData={refreshData}
        modalData={modalData}
        closeModal={closeModal}
      />
    </div>
  )
}

export default App
