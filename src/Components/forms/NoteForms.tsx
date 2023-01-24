import React, { useState, useRef } from 'react'
import axios from 'axios'
import './NoteForms.scss'
import BackgroundColors from '../BackgroundColors'
import useAutosizeTextArea from '../../App/helpers/useAutosizeTextarea'
import { mainUrl } from "../../config";

const NoteForms = ({ groups, change }: any): any => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [newGroup, setNewGroup] = useState([])
  const [activeBg, setActiveBg] = useState(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, text)

  const bgColors = [
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed'
  ]
  const doSomething = (e: any): void => {
    e.preventDefault()
  }
  const isHaveGroup = (val: string): boolean => {
    return newGroup.filter((item: any) => item?.name === val).length > 0
  }

  const clearData = (): void => {
    setTitle('')
    setText('')
    setNewGroup([])
    setActiveBg(null)
  }

  const saveNote = async (): Promise<void> => {
    await axios.post(`${mainUrl}/notes/note`, {
      title,
      text,
      groups: transformGroups(newGroup),
      background: activeBg
    })
    change()
    clearData()
  }

  const transformGroups = (arr: any[]): any => {
    return arr.map((item) => {
      return item.id
    })
  }
  const toggleGroups = (val: string): any => {
    const cloneArr = [...newGroup]
    // @ts-expect-error TEST
    const indexEl = cloneArr.indexOf(val)

    if (indexEl >= 0) {
      cloneArr.splice(indexEl, 1)
      setNewGroup(cloneArr)
      return
    }

    // @ts-expect-error test
    setNewGroup([...cloneArr, val])
  }
  const getBackground = (): any => {
    return {
      background: activeBg ?? null
    }
  }

  return (
        <form
            className="note-forms"
            onSubmit={doSomething}
            style={getBackground()}
        >
            <input
                style={getBackground()}
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                placeholder='Заголовок'
                className="note-forms__input note-forms__input_title"
                type="text"
            />
            <textarea
                ref={textAreaRef}
                style={getBackground()}
                value={text}
                onChange={(e) => { setText(e.target.value) }}
                placeholder='Заметка'
                className="note-forms__input note-forms__input_text"
            />
            <div className="note-forms__groups">
                {
                    groups.map((group: any) =>
                        <button
                            key={group.id}
                            onClick={() => { toggleGroups(group) }}
                            className={
                                `note-forms__group ${isHaveGroup(group.name) ? 'note-forms__group_active' : null}`
                            }
                        >
                            {group.name}
                        </button>
                    )
                }
            </div>
            <BackgroundColors
                activeBg={activeBg}
                setActiveBg={setActiveBg}
                className="note-forms__background"
                items={bgColors}
            />
            <div className="note-forms__buttons">
                <button
                    className="note-forms__button"
                    onClick={clearData}
                >Очистить</button>
                <button
                    onClick={saveNote}
                    className="note-forms__button"
                >Сохранить</button>
            </div>
        </form>
  )
}

export default NoteForms
