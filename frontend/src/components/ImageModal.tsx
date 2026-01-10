import React from "react";
import { Modal, Button } from "react-bootstrap";

type ImageModalProps = {
  show: boolean;
  onHide: () => void;
  imageSrc: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ show, onHide, imageSrc }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={imageSrc}
          alt="Preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;