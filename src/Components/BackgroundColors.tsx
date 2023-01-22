import React from 'react'
import './BackgroundColors.scss'
import UiBackground from './Ui/UiBackground'

const BackgroundColors = ({ items, className, activeBg, setActiveBg }: any) => {
  return (
        <div className={`background-choose ${className}`}>
            <UiBackground
                bgColor={null}
                active={activeBg}
                change={setActiveBg}
            ></UiBackground>
            {
                items.map((item: any) =>
                    <UiBackground
                        bgColor={item}
                        active={activeBg}
                        change={setActiveBg}
                    ></UiBackground>
                )
            }
        </div>
  )
}

export default BackgroundColors
