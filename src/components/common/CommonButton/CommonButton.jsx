import React from "react";
import PropTypes from "prop-types";
import './CommonButton.css'

const CommonButton = ({ children, onClick, icon: Icon, variant = "primary", className = "" }) => {
    const buttonClass = `add-employee-btn ${variant === "secondary" ? "btn-secondary-custom" : "btn-primary-custom"} ${className}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {Icon && <Icon size={20} className="icon" />}
            {children}
        </button>
    );
};

CommonButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default CommonButton;
