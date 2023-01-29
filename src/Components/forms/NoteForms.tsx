import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import './NoteForms.scss'
import BackgroundColors from '../BackgroundColors'
import useAutosizeTextArea from '../../App/helpers/useAutosizeTextarea'
import {mainUrl} from "../../config";

const NoteForms = ({groups, change, data}: any): any => {
    const getNewGroup = () => {
        let res: any = data?.groups ? [...data.groups] : [];
        if (res.length === 0 && localStorage.getItem('groups')) {
            // @ts-ignore
            res = JSON.parse(localStorage.getItem('groups'))
        }
        return res;
    }
    const getText = () => {
        let res = data?.text ? data.text : '';
        if (!res) {
            res = localStorage.getItem('text');
        }
        return res;
    }
    const getTitle = () => {
        let res = data?.title ? data.title : '';
        if (!res) {
            res = localStorage.getItem('title');
        }
        return res
    }

    const getActiveBg = () => {
        let res = data?.background ? data.background : null;
        if (!res) {
            res = localStorage.getItem('bg');
        }
        return res
    }

    const [title, setTitle] = useState(getTitle())
    const [text, setText] = useState(getText())
    const [isLoad, setIsLoad] = useState(false);
    const [newGroup, setNewGroup] = useState(getNewGroup())
    const [activeBg, setActiveBg] = useState(getActiveBg())
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    // @ts-ignore
    useAutosizeTextArea(textAreaRef.current, text);

    const setTextInput = (val: any) => {
        localStorage.setItem('text', val);
        setText(val);
    }
    const setTitleInput = (val: any) => {
        localStorage.setItem('title', val);
        setTitle(val);
    }
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
    ];

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
        localStorage.clear();
    }

    const setLocalBg = (val: any) => {
        localStorage.setItem('bg', val);
        setActiveBg(val)
    }

    const saveNote = async (): Promise<void> => {
        setIsLoad(true);
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
        change();
        clearData();
        setIsLoad(false);
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
            // @ts-ignore
            localStorage.setItem('groups', JSON.stringify(cloneArr))
            setNewGroup(cloneArr)
            return;
        }
        // @ts-ignore
        localStorage.setItem('groups', JSON.stringify([...cloneArr, foundGroup]))
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
                disabled={isLoad}
                style={getBackground()}
                value={title}
                onChange={(e) => {
                    setTitleInput(e.target.value)
                }}
                placeholder='Заголовок'
                className="note-forms__input note-forms__input_title"
                type="text"
            />
            <textarea
                disabled={isLoad}
                ref={textAreaRef}
                style={getBackground()}
                value={text}
                onChange={(e) => {
                    setTextInput(e.target.value)
                }}
                placeholder='Заметка'
                className="note-forms__input note-forms__input_text"
            />
            <div className="note-forms__groups">
                {
                    groups.map((group: any) =>
                        <button
                            disabled={isLoad}
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
                disabled={isLoad}
                activeBg={activeBg}
                setActiveBg={setLocalBg}
                className="note-forms__background"
                items={bgColors}
            />
            <div className="note-forms__buttons">
                <button
                    disabled={isLoad}
                    className="note-forms__button"
                    onClick={clearData}
                >Очистить
                </button>
                <button
                    disabled={isLoad}
                    onClick={saveNote}
                    className="note-forms__button"
                >Сохранить
                </button>
            </div>
        </form>
    )
}

export default NoteForms
