import React, {useState} from 'react'
import UiTag from './Ui/UiTag'
import './NotesItem.scss'
import UiDelete from './Ui/UiDelete'
import UiEdit from './Ui/UiEdit'

const NotesItem = ({item, deleteItem, editItem}: any) => {
    const getBackground = () => {
        return {
            background: item.background || null
        }
    }

    const getText = () => {
        return setLinksInStr(item.text)
    }

    const setLinksInStr = (str: string) => {
        let localStr = str;
        if (!localStr) {
            return localStr
        }
        const arrLinks: string[] | null = localStr.match(/https:\/\/[\w\-./]+/g)
        if ((arrLinks != null) && arrLinks.length > 0) {
            arrLinks.forEach((item: string) => {
                localStr = localStr.replace(item, addLink(item))
            })
        }
        return localStr
    }

    const addLink = (str: string) => {
        return `<a href="${str}" target="_blank">${str}</a>`
    }

    const deleteNote = () => {
        deleteItem(item.id)
    }

    const editNote = () => {
        editItem(item)
    }

    return (
        <div
            className="notes"
            style={getBackground()}
        >
            <UiEdit
                className="notes__edit"
                onClick={editNote}
            />
            <UiDelete
                className="notes__delete"
                onClick={deleteNote}
            />
            <div
                className="notes__content"
            >
                <h4 className="notes__title">{item.title}</h4>
                <p className="notes__text" dangerouslySetInnerHTML={{__html: getText()}}></p>
                <div className="notes__buttons">
                    {
                        item.groups?.map((group: any) =>
                            <UiTag
                                key={group.id}
                                item={group}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NotesItem
