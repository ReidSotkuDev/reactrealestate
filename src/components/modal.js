import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';
import projectStore from "../utilities/store"

const ImageModal = ({
  show
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false)
  }
  // const handleShow = () => setShow(true);
  useEffect(() => {
    
    setIsShow(show)
   // let modalstate = projectStore.getState().showmodal;
    // setShow(modalstate)
  }, [show]);
  return (
    <>

      {/* <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default ImageModal