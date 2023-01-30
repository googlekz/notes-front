import React from 'react'
import './BackgroundColors.scss'
import UiBackground from './Ui/UiBackground'

const BackgroundColors = ({ items, className, activeBg, setActiveBg, disabled }: any): any => {
  return (
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <div className={`background-choose ${className}`}>
            <UiBackground
                bgColor={null}
                disabled={disabled}
                active={activeBg}
                change={setActiveBg}
            ></UiBackground>
            {
                items.map((item: any) =>
                    <UiBackground
                        key={item}
                        disabled={disabled}
                        bgColor={item}
                        active={activeBg}
                        change={setActiveBg}
                    />
                )
            }
        </div>
  )
}

export default BackgroundColors
