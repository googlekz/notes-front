import React from 'react'
import './UiTag.scss'
const UiTag = ({ item }: any): any => {
  return (
        <button className="tag">
            { item.name }
        </button>
  )
}

export default UiTag
