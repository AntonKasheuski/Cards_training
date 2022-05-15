import {Modal} from "../Modal";
import React, {useState} from "react";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import {UpdatePackTC} from "../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import s from '../ModalStyles.module.css'
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";


type EditModalContainerType = {
    name: string
    packId: string
}

export const EditPackModalContainer = (props: EditModalContainerType) => {

    const {name, packId} = props
    const dispatch: AppDispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)

    const [editName, setEditName] = useState<string>(name)

    const editPack = (packId: string, name: string) => {
        dispatch(UpdatePackTC(packId, name))
        setShow(false)
    }
    const cancel = () => {
        setShow(false)
    }
    return (
        <div>
            <button onClick={() => setShow(true)}>edit</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <div className={s.wrapper}>
                    <div className={s.title}>
                        <span>Edit title pack</span>
                        <button onClick={cancel} className={s.iconButton}></button>
                    </div>
                    <div className={s.element}>
                        <SuperInput label={'title'}  onChangeText={setEditName} value={editName}/>
                    </div>
                    <div className={s.buttonsModal}>
                        <SuperButton onClick={cancel} className={s.cancelButton}> cancel</SuperButton>
                        <SuperButton onClick={() => editPack(packId, editName)}
                                     className={s.submitButton}> submit</SuperButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}