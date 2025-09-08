import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEmployee } from "../../hooks/useEmployee";
import "./EmployeeDetails.css";
import {
  PAGE_TEXTS,
  SECTION_TEXTS,
  LOADING_TEXTS,
  ERROR_TEXTS,
  FIELD_LABELS,
  FALLBACK_TEXTS,
} from "../../../../constants/employeeDetails.constant";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: employee, isLoading, isError, error } = useEmployee(id);

  if (isLoading) {
    return (
      <div className="main-container">
        {LOADING_TEXTS.LOADING}
      </div>
    );
  }

  if (isError) {
    toast.error(ERROR_TEXTS.TOAST);
    return (
      <div className="main-container">
        {ERROR_TEXTS.MESSAGE_PREFIX} {error.message}
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="header-section">
        <AiOutlineArrowLeft
          size={24}
          color="text-dark"
          className="back-arrow"
          onClick={() => navigate("/employees")}
        />
        <h2 className="fw-bold text-dark">
          {PAGE_TEXTS.TITLE}
        </h2>
      </div>

      <div className="content-card">
        <div className="tab-button-wrapper">
          <div type="button" className="form-heading">
            <MdPerson size={30} color="#0084ff" />
            {SECTION_TEXTS.PERSONAL_INFO}
          </div>
        </div>

        <div className="profile-image-section">
          <img
            src={
              employee.profilePic
                ? `${import.meta.env.VITE_API_URL}${employee.profilePic}`
                : `https://placehold.co/80x80/9ca3af/ffffff?text=${employee.name[0]}`
            }
            alt={employee.name}
            className="profile-icon"
            style={{ width: "80px", height: "80px" }}
          />
        </div>

        <div className="row g-4">
          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.NAME}
            </div>
            <div className="detail-value">
              {employee.name}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.EMPLOYEE_ID}
            </div>
            <div className="detail-value">
              {employee.employeeId}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.DEPARTMENT}
            </div>
            <div className="detail-value">
              {employee.department}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.DESIGNATION}
            </div>
            <div className="detail-value">
              {employee.designation?.title || FALLBACK_TEXTS.NA}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.PROJECT}
            </div>
            <div className="detail-value">
              {employee.project || FALLBACK_TEXTS.DASH}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.TYPE}
            </div>
            <div className="detail-value">
              {employee.type}
            </div>
          </div>

          <div className="col-md-6 detail-item">
            <div className="detail-label">
              {FIELD_LABELS.STATUS}
            </div>
            <div className="detail-value">
              {employee.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
