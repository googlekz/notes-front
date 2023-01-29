import './ModalMain.scss'
import UiDelete from '../Ui/UiDelete'
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

const ModalMain = ({modalData, closeModal, refreshData, groups}: any) => {
    if (!modalData.modalActive) {
        return null
    }
    const typeModal = modalData.modalActive
    return (
        <div className="modal-main">
            <div className="modal-main__content">
                <UiDelete
                    onClick={closeModal}
                    className="modal-main__close"
                />
                {
                    (typeModal === 'delete' && modalData?.deleteGroupId !== null)
                        ? <ModalDelete
                            groupId={modalData.deleteGroupId}
                            closeModal={closeModal}
                            refreshData={refreshData}
                        />
                        : null
                }
                {
                    (typeModal === 'edit' && modalData?.noteActive !== null)
                        ? <ModalEdit
                            groups={groups}
                            note={modalData.noteActive}
                            closeModal={closeModal}
                            refreshData={refreshData}
                        />
                        : null
                }
            </div>
        </div>
    )
}

export default ModalMain
