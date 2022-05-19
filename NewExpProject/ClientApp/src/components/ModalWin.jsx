import React from 'react'
import cl from '../styles/ModalWin.module.css'

export default function ModalWin({children, visible, setVisible}) {
  
    const rootClasses = [cl.ModalWin];
    if(visible) {
        rootClasses.push(cl.active);
    }

    return (
        visible ? (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        <div className={cl.ModalWinContent} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
    ) : null
  )
}
