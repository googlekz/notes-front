import React, { useState } from 'react'
import axios from 'axios'
import UiMenuItem from './Ui/UiMenuItem'
import './LeftMenu.scss'
import { mainUrl } from '../config'

const LeftMenu = ({ groups, change, sortNotes, activeGroup, deleteGroup }: any): any => {
  const defaultAddPlaceholder = 'Добавить группу'
  const [group, setGroup] = useState('')

  const addGroup = async (): Promise<any> => {
    if (!group || group.length < 1) {
      alert('Заполнить группу')
      return
    }
    await axios.post(`${mainUrl}/groups/group`, {
      name: group
    })
    setGroup('')
    change()
  }

  return (
        <div className="left-menu">
            <div className="left-menu__content">
                <h3 className="left-menu__title">Группы</h3>
                <nav>
                    <ul className="left-menu__links">
                        {
                            groups.map((group: any) =>
                                <li
                                    key={group.id}
                                    className="left-menu__link"
                                >
                                    <UiMenuItem
                                        deleteGroup={deleteGroup}
                                        activeGroup={activeGroup}
                                        onClick={() => sortNotes(group)}
                                        item={group}
                                    />
                                </li>
                            )
                        }
                    </ul>
                    <div
                        className="left-menu__add"
                    >
                        <input
                            value={group}
                            onChange={(evt) => { setGroup(evt.target.value) }}
                            className="left-menu__add-input"
                            type="text"
                            placeholder={defaultAddPlaceholder}
                        />
                        <button
                            className="left-menu__add-button"
                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                            onClick={addGroup}
                        >+</button>
                    </div>
                </nav>
            </div>
        </div>
  )
}

export default LeftMenu
