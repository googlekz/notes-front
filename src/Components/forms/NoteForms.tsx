import React, {useState, useRef} from 'react'
import axios from 'axios'
import './NoteForms.scss'
import BackgroundColors from '../BackgroundColors'
import useAutosizeTextArea from '../../App/helpers/useAutosizeTextarea'
import {mainUrl} from "../../config";

const NoteForms = ({groups, change, data}: any): any => {

    const [title, setTitle] = useState(data?.title ? data.title : '')
    const [text, setText] = useState(data?.text ? data.text : '')
    const [newGroup, setNewGroup] = useState(data?.groups ? [...data.groups] : [])
    const [activeBg, setActiveBg] = useState(data?.background ? data.background : null)
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
    const isHaveGroup = (val: any): boolean => {
        return newGroup.find((item: any) => item?.id === val)
    }

    const clearData = (): void => {
        setTitle('')
        setText('')
        setNewGroup([])
        setActiveBg(null);
        console.log('clear');
    }

    const saveNote = async (): Promise<void> => {
        if (data) {
            change({
                id: data.id,
                text: text,
                title: title,
                background: activeBg,
                groups: transformGroups(newGroup),
            })
            clearData();
            return;
        }
        if (!title && !text) {
            textAreaRef?.current?.focus();
            return;
        }

        await axios.post(`${mainUrl}/notes/note`, {
            title,
            text,
            groups: transformGroups(newGroup),
            background: activeBg
        })
        clearData()
    }

    const transformGroups = (arr: any[]): any => {
        return arr.map((item) => {
            return item.id
        })
    }
    const toggleGroups = (groupId: number): any => {
        const cloneArr = [...newGroup];
        const foundGroup = groups.find((item: any) => item.id === groupId);
        const indexEl = cloneArr.indexOf(cloneArr.find(foundGroup => foundGroup.id === groupId));
        if (indexEl >= 0) {
            cloneArr.splice(indexEl, 1);
            setNewGroup(cloneArr)
            return;
        }
        setNewGroup([...cloneArr, foundGroup])
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
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                placeholder='Заголовок'
                className="note-forms__input note-forms__input_title"
                type="text"
            />
            <textarea
                ref={textAreaRef}
                style={getBackground()}
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
                placeholder='Заметка'
                className="note-forms__input note-forms__input_text"
            />
            <div className="note-forms__groups">
                {
                    groups.map((group: any) =>
                        <button
                            key={group.id}
                            onClick={() => {
                                toggleGroups(group.id)
                            }}
                            className={
                                `note-forms__group ${isHaveGroup(group.id) ? 'note-forms__group_active' : null}`
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
                >Очистить
                </button>
                <button
                    onClick={saveNote}
                    className="note-forms__button"
                >Сохранить
                </button>
            </div>
        </form>
    )
}

export default NoteForms
