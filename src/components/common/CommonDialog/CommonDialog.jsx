import React from 'react';
import PropTypes from 'prop-types';
import './CommonDialog.css';

const CommonDialog = ({ show = true, icon: Icon, message, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modal-overlay border">
                <div className="modal-dialog-custom">
                    <div className='dialog-contents'>
                        <Icon className='dialog-icon' size={48} />
                        <p className="dialog-message">{message}</p>
                    </div>
                    <div className="dialog-actions">
                        <button className="dialog-button btn-cancel-custom" onClick={onCancel}>Cancel</button>
                        <button className="dialog-button btn-confirm-custom" onClick={onConfirm}>Yes</button>
                    </div>
                </div>
            </div>
        </>
    );
};

CommonDialog.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default CommonDialog;
