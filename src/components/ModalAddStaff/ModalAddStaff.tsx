import React from 'react'
import style from "./style.module.scss"

interface ModalAddStaffProps {
    active: boolean
    setActive: Function
    children: React.ReactNode
}

const ModalAddStaff:React.FC<ModalAddStaffProps> = ({active, setActive, children}) => {



    return (
        <div className={active? [style.wrapper, style.active].join(' ') :  style.wrapper} onClick={() => setActive(false)}>
            <div className={style.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default ModalAddStaff;