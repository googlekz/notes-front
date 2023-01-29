import React from 'react';
import './ModalEdit.scss'
import NoteForms from "../forms/NoteForms";
import axios from "axios";
import {mainUrl} from "../../config";

const ModalEdit = ({groups, note, closeModal, refreshData}: any) => {
    const editNoteModal = async (item: any) => {
        if (!item) {
            return;
        }
        await axios.put(`${mainUrl}/notes/${item.id}`, {
            ...item
        }).then(() => {
            refreshData();
            closeModal();
        });
    }
    return (
        <div>
            <NoteForms groups={groups} change={editNoteModal} data={note}/>
        </div>
    );
};

export default ModalEdit;