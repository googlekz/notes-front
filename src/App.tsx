import React, { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import NotesItem from './Components/NotesItem'
import LeftMenu from './Components/LeftMenu'
import NoteForms from './Components/forms/NoteForms'
import ModalMain from './Components/modals/ModalMain'
import { mainUrl } from "./config"

function App (): any {
  const [rendered, setRendered] = useState(null)
  const [notes, setNotes] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState({})
  const [modalActive, setModalActive] = useState(null)
  const [deleteGroupId, setDeleteGroupId] = useState(null)

  useEffect(() => {
    if (!rendered) {
      // @ts-expect-error TEST
      setRendered(true)
      return
    }
    getNotes()
    getGroups()
  }, [rendered])

  const getNotes = async (): Promise<void> => {
    const { data } = await axios.get(`${mainUrl}/notes`)
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

  const refreshData = async () => {
    await getNotes()
    await getGroups()
  }

  const sortNotes = async (groupNote: any): Promise<void> => {
    const check = groupNote === selectedGroup ? null : groupNote?.id
    const { data } = await axios.get(`${mainUrl}/notes`, {
      params: {
        group: check
      }
    })
    setSelectedGroup(check !== null ? groupNote : null)
    setNotes(data)
  }

  const closeModal = (): void => {
    setModalActive(null)
  }

  const deleteGroup = async (): Promise<void> => {
    await axios.delete(`${mainUrl}/groups/${deleteGroupId}`)
    setDeleteGroupId(null)
    setModalActive(null)
    await refreshData();
  }

  const showDeleteModal = ({ id }: any): any => {
    // @ts-expect-error test
    setModalActive('delete')
    setDeleteGroupId(id)
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
                    change={refreshData}
                    groups={groups}
                />
                <div className="app__notes">
                    {
                        notes.map((item: any) =>
                            <NotesItem
                                deleteItem={deleteNote}
                                key={item.id}
                                item={item}
                            />
                        )
                    }
                </div>
            </div>
            <ModalMain
                deleteGroup={deleteGroup}
                closeModal={closeModal}
                typeModal={modalActive}
            />
        </div>
  )
}

export default App
