import React from 'react'
import './UiEdit.scss'

const UiEdit = ({ onClick, className }: any): any => {
  return (
        <button
            /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
            className={`ui-edit ${className}`}
            onClick={onClick}
        >
            +
        </button>
  )
}

export default UiEdit
