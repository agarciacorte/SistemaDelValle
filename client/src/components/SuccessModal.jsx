import React from 'react';

const SuccessModal = ({ id, title, body, onClose, isStatic=false }) => {
  return (
    <div className="modal fade" id={id} data-bs-backdrop={isStatic ? 'static' : 'dinamic'} data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success">
            <h1 className="modal-title fs-5" id={`${id}Label`}>{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center">
              <i className="bi bi-check-circle text-success me-2" style={{ fontSize: '3rem' }}></i>
              {body}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={onClose}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
