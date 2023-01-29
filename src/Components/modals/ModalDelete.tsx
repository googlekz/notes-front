import React from 'react';
import axios from "axios";
import './ModalDelete.scss'
import { mainUrl } from "../../config";

const ModalDelete = ({ closeModal, refreshData, group }: any) => {
    const deleteGroup = async (isDeleteNote: boolean): Promise<void> => {
        await axios.delete(`${mainUrl}/groups/${group?.id}?isDeleteNote=${isDeleteNote}`)
        refreshData();
        closeModal();
    }
    return (
        <div className="modal-delete">
            <p className="modal-delete__title">Удалить группу с заметками ({`${group.count_notes}`})?</p>
            <div className="modal-delete__buttons">
                <button
                    className="modal-delete__button modal-delete__button_yes"
                    onClick={() => deleteGroup(true)}
                >
                    Да
                </button>
                <button
                    className="modal-delete__button modal-delete__button_no"
                    onClick={() => deleteGroup(false)}
                >
                    Нет
                </button>
            </div>
        </div>
    );
};

export default ModalDelete;