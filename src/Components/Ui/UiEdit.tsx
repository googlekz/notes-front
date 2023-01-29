import "./UiEdit.scss"

const UiEdit = ({onClick, className}: any) => {
    return (
        <button
            className={`ui-edit ${className}`}
            onClick={onClick}
        >+</button>
    );
};

export default UiEdit;