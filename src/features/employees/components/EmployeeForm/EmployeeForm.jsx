import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdPerson } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "../../../../components/common/CommonButton/CommonButton";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { useDesignations } from "../../hooks/useDesignations";
import {
    EMPLOYEE_TYPES,
    EMPLOYEE_STATUS,
    FORM_HEADINGS,
    FORM_LABELS,
    FORM_PLACEHOLDERS,
    DEPARTMENTS,
    DESIGNATIONS,
    DROPDOWNS,
    BUTTONS,
    MESSAGES,
    PROFILE,
    VALIDATIONS,
} from "../../../../constants/employeesForm.constant";

import { getEmployeeById } from "../../services/employeesService";
import "./EmployeeForm.css";

const schema = yup.object().shape({
    name: yup.string().max(100, VALIDATIONS.NAME.MAX).required(VALIDATIONS.NAME.REQUIRED),
    employeeId: yup
        .string()
        .matches(/^RDS\d+$/, VALIDATIONS.EMPLOYEE_ID.PATTERN)
        .max(50, VALIDATIONS.EMPLOYEE_ID.MAX)
        .required(VALIDATIONS.EMPLOYEE_ID.REQUIRED),
    department: yup.string().max(100, VALIDATIONS.DEPARTMENT.MAX).required(VALIDATIONS.DEPARTMENT.REQUIRED),
    designationId: yup.number().typeError(VALIDATIONS.DESIGNATION.TYPE).required(VALIDATIONS.DESIGNATION.REQUIRED),
    project: yup.string().max(150, VALIDATIONS.PROJECT.MAX).notRequired(),
    type: yup.mixed().oneOf(EMPLOYEE_TYPES, VALIDATIONS.TYPE.INVALID).required(VALIDATIONS.TYPE.REQUIRED),
    status: yup.mixed().oneOf(EMPLOYEE_STATUS, VALIDATIONS.STATUS.INVALID).required(VALIDATIONS.STATUS.REQUIRED),
    profilePic: yup.mixed().notRequired(),
});

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const { data: designations = [], isLoading: loadingDesignations } = useDesignations();
    const { mutate: createEmployee, isLoading: creating } = useCreateEmployee();
    const { mutate: updateEmployee, isLoading: updating } = useUpdateEmployee();

    useEffect(() => {
        let isMounted = true;

        if (id) {
            getEmployeeById(id)
                .then((emp) => {
                    if (isMounted) {
                        reset({
                            name: emp.name,
                            employeeId: emp.employeeId,
                            department: emp.department,
                            designationId: Number(emp.designationId),
                            project: emp.project,
                            type: emp.type,
                            status: emp.status,
                            profilePic: null,
                        });
                        if (emp.profilePic) setPreview(`${import.meta.env.VITE_API_URL}${emp.profilePic}`);
                    }
                })
                .catch(() => {
                    if (isMounted) {
                        toast.error(MESSAGES.LOAD_FAILED);
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [id, reset]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const onSubmit = (formData) => {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "profilePic") {
                if (formData.profilePic?.length > 0) data.append("profilePic", formData.profilePic[0]);
            } else if (key === "designationId") {
                data.append(key, Number(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        if (id) {
            updateEmployee(
                { id, formData: data },
                {
                    onSuccess: () => {
                        toast.success(MESSAGES.UPDATE_SUCCESS);
                        navigate("/employees");
                    },
                    onError: () => toast.error(MESSAGES.UPDATE_FAILED),
                }
            );
        } else {
            createEmployee(data, {
                onSuccess: () => {
                    toast.success(MESSAGES.CREATE_SUCCESS);
                    navigate("/employees");
                },
                onError: () => toast.error(MESSAGES.CREATE_FAILED),
            });
        }
    };

    const handleNavigateAway = () => {
        reset();
        navigate("/employees");
    };

    return (
        <div className="main-container">
            <div className="header-section">
                <AiOutlineArrowLeft
                    size={24}
                    color="text-dark"
                    className="back-arrow"
                    onClick={handleNavigateAway}
                />
                <h2 className="fw-bold text-dark">{id ? FORM_HEADINGS.EDIT : FORM_HEADINGS.ADD}</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form-card">
                <div className="tab-button-wrapper">
                    <div type="button" className="form-heading">
                        <MdPerson size={30} color="#0084ff" /> {FORM_HEADINGS.PERSONAL_INFO}
                    </div>
                </div>

                <div className="profile-image-section">
                    <label htmlFor="profilePicUpload" className="profile-label">
                        <img src={preview || PROFILE.DEFAULT_IMAGE} alt="Profile" className="profile-icon" />
                        <div className="edit-icon-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="profilePicUpload"
                        accept="image/*"
                        style={{ display: "none" }}
                        {...register("profilePic", { onChange: handleFileChange })}
                    />
                </div>

                <div className="row g-4">
                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="name" className="form-label required-label">{FORM_LABELS.NAME}</label>
                        <input
                            type="text"
                            id="name"
                            placeholder={FORM_PLACEHOLDERS.NAME}
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            {...register("name")}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="employeeId" className="form-label required-label">{FORM_LABELS.EMPLOYEE_ID}</label>
                        <input
                            type="text"
                            id="employeeId"
                            placeholder={FORM_PLACEHOLDERS.EMPLOYEE_ID}
                            className={`form-control ${errors.employeeId ? "is-invalid" : ""}`}
                            {...register("employeeId")}
                        />
                        {errors.employeeId && <div className="invalid-feedback">{errors.employeeId.message}</div>}
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="department" className="form-label required-label">{FORM_LABELS.DEPARTMENT}</label>
                        <select
                            id="department"
                            className={`form-select ${errors.department ? "is-invalid" : ""}`}
                            {...register("department")}
                        >
                            <option value="">{DEPARTMENTS.SELECT}</option>
                            <option value="Design">{DEPARTMENTS.DESIGN}</option>
                            <option value="Engineering">{DEPARTMENTS.ENGINEERING}</option>
                            <option value="Marketing">{DEPARTMENTS.MARKETING}</option>
                        </select>
                        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="designationId" className="form-label required-label">{FORM_LABELS.DESIGNATION}</label>
                        <select
                            id="designationId"
                            className={`form-select ${errors.designationId ? "is-invalid" : ""}`}
                            {...register("designationId")}
                        >
                            <option value="">{DESIGNATIONS.SELECT}</option>
                            {loadingDesignations ? (
                                <option>{DESIGNATIONS.LOADING}</option>
                            ) : (
                                designations.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)
                            )}
                        </select>
                        {errors.designationId && <div className="invalid-feedback">{errors.designationId.message}</div>}
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="project" className="form-label">{FORM_LABELS.PROJECT}</label>
                        <input
                            type="text"
                            id="project"
                            placeholder={FORM_PLACEHOLDERS.PROJECT}
                            className="form-control"
                            {...register("project")}
                        />
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="type" className="form-label required-label">{FORM_LABELS.TYPE}</label>
                        <select
                            id="type"
                            className={`form-select ${errors.type ? "is-invalid" : ""}`}
                            {...register("type")}
                        >
                            <option value="">{DROPDOWNS.TYPE_SELECT}</option>
                            {EMPLOYEE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.type && <div className="invalid-feedback">{errors.type.message}</div>}
                    </div>

                    <div className="col-md-6 form-group-custom">
                        <label htmlFor="status" className="form-label required-label">{FORM_LABELS.STATUS}</label>
                        <select
                            id="status"
                            className={`form-select ${errors.status ? "is-invalid" : ""}`}
                            {...register("status")}
                        >
                            <option value="">{DROPDOWNS.STATUS_SELECT}</option>
                            {EMPLOYEE_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>
                </div>

                <div className="form-actions">
                    <CommonButton
                        type="button"
                        variant="secondary"
                        onClick={handleNavigateAway}
                    >
                        {BUTTONS.CANCEL}
                    </CommonButton>

                    <CommonButton type="submit" disabled={creating || updating}>
                        {creating || updating
                            ? id
                                ? BUTTONS.UPDATING
                                : BUTTONS.CREATING
                            : BUTTONS.CONFIRM}
                    </CommonButton>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;