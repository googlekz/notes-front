import React from 'react';
import axios from "axios";
import {mainUrl} from "../../config";

const ModalDelete = ({ closeModal, refreshData, groupId }: any) => {
    const deleteGroup = async (): Promise<void> => {
        await axios.delete(`${mainUrl}/groups/${groupId}`)
        refreshData();
        closeModal();
    }
    return (
        <div>
            <h1 className="modal-main__title">Удалить группу?</h1>
            <div className="modal-main__buttons">
                <button
                    className="modal-main__button modal-main__button_yes"
                    onClick={deleteGroup}
                >Да</button>
                <button
                    className="modal-main__button modal-main__button_no"
                    onClick={closeModal}
                >Нет</button>
            </div>
        </div>
    );
};

export default ModalDelete;