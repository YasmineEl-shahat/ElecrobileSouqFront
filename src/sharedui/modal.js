import Modal from "react-modal";

const CustomModal = ({ isModalOpen, handleCancel, children }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.20)",
      zIndex: 2,
    },
    content: {
      top: "50%",
      inset: "50% 0",
      transform: "translateY(-50%)",
      width: "fit-content",
      height: "fit-content",
      margin: "0 auto",
      borderRadius: "40px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCancel}
      style={customStyles}
    >
      <div className="d-flex justify-content-end mt-2">
        <button onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 
            9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </Modal>
  );
};

export default CustomModal;
