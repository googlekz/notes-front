import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import NotesItem from './Components/NotesItem'
import LeftMenu from './Components/LeftMenu'
import NoteForms from './Components/forms/NoteForms'
import ModalMain from './Components/modals/ModalMain'
import { mainUrl } from "./config"

interface paramsNotes {
    group: Number,
}

function App(): any {
    const [rendered, setRendered] = useState(null)
    const [notes, setNotes] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState({}) as any
    const [modalData, setModalData] = useState({
        modalActive: null,
        deleteGroupId: null,
        noteActive: null,
    });

    useEffect(() => {
        if (!rendered) {
            // @ts-expect-error TEST
            setRendered(true)
            return
        }
        getNotes()
        getGroups()
    }, [rendered]);

    useEffect(() => {
        if (rendered) {
            getNotes()
        }
    }, [selectedGroup])

    const getNotes = async (): Promise<void> => {
        const params = {} as paramsNotes;
        if (selectedGroup?.id) {
            params.group = selectedGroup.id
        }
        const {data} = await axios.get(`${mainUrl}/notes`, {params})
        setNotes(data)
    }

    const getGroups = async (): Promise<void> => {
        const {data} = await axios.get(`${mainUrl}/groups`)
        setGroups(data)
    }

    const deleteNote = async (id: number): Promise<void> => {
        await axios.delete(`${mainUrl}/notes/${id}`)
        await refreshData()
    }

    const editNote = async (item: any): Promise<void> => {
        setModalData({
            // @ts-ignore
            modalActive: 'edit',
            deleteGroupId: null,
            noteActive: item,
        })
    }

    const refreshData = async () => {
        await getNotes()
        await getGroups()
    }

    const sortNotes = (group: any) => {
        if (group?.id === selectedGroup?.id) {
            setSelectedGroup({})
            return;
        }
        setSelectedGroup(group)
    }

    const closeModal = (): void => {
        setModalData({
            modalActive: null,
            deleteGroupId: null,
            noteActive: null,
        });
    }

    const showDeleteModal = ({id}: any): any => {
        setModalData({
            noteActive: null,
            // @ts-ignore
            modalActive: 'delete',
            deleteGroupId: id,
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
                    change={refreshData}
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
