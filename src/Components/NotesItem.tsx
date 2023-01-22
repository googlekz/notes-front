import React, { useState } from 'react'
import UiTag from './Ui/UiTag'
import './NotesItem.scss'
import UiDelete from './Ui/UiDelete'

const NotesItem = ({ item, deleteItem }: any) => {
  const getBackground = () => {
    return {
      background: item.background || null
    }
  }

  const getText = () => {
    return setLinksInStr(item.text)
  }

  const setLinksInStr = (str: string) => {
    let localStr = str
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

  return (
        <div
            className="notes"
            style={getBackground()}
        >
            <UiDelete
                className="notes__delete"
                onClick={deleteNote}
            />
            <h4 className="notes__title">{item.title}</h4>
            <p className="notes__text" dangerouslySetInnerHTML={{ __html: getText() }}></p>
            <div className="notes__buttons">
                {
                    item.groups.map((group: any) =>
                        <UiTag
                            key={group.id}
                            item={group}
                        />
                    )
                }
            </div>
        </div>
  )
}

export default NotesItem
