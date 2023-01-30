import React from 'react'
import './UiDelete.scss'
const UiDelete = ({ onClick, className }: any): any => {
  return (
        <button
            /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
            className={`ui-delete ${className}`}
            onClick={onClick}
        >
            X
        </button>
  )
}

export default UiDelete
