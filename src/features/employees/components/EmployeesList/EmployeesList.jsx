import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../../components/common/CommonButton/CommonButton";
import CommonDialog from "../../../../components/common/CommonDialog/CommonDialog";
import { useEmployeesInfinite } from "../../hooks/useEmployeesInfinite";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";
import { toast } from "react-hot-toast";
import "./EmployeesList.css";
import { PAGE_TEXTS, LOADING_TEXTS, ERROR_TEXTS, TABLE_HEADERS, TABLE_TEXTS, STATUS_LABELS, DIALOG_TEXTS, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../../../constants/employeesList.constant";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const EmployeesList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useEmployeesInfinite({ search: debouncedSearchQuery, limit: 10 });
    const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();

    const employees = data?.pages.flatMap((page) => page.rows) ?? [];

    const loadMoreRef = useRef(null);
    useEffect(() => {
        if (!hasNextPage || !loadMoreRef.current) return;
        const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) fetchNextPage(); }, { threshold: 1.0 });
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedId) return;
        deleteEmployee(selectedId, {
            onSuccess: () => {
                toast.success(SUCCESS_MESSAGES.DELETE);
                setDialogOpen(false);
                setSelectedId(null);
            },
            onError: (err) => {
                toast.error(err?.message || ERROR_MESSAGES.DELETE);
                setDialogOpen(false);
            },
        });
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">{PAGE_TEXTS.TITLE}</h2>
                <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
                    <div className="search-input-group">
                        <input type="text" placeholder={PAGE_TEXTS.SEARCH_PLACEHOLDER} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" />
                        <Search size={18} className="search-icon" />
                    </div>
                    <CommonButton onClick={() => navigate("/employees/add")} icon={Plus}>{PAGE_TEXTS.ADD_BUTTON}</CommonButton>
                </div>
            </div>

            <div className="table-card">
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center p-5">
                        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">{LOADING_TEXTS.LOADING}</span></div>
                        <p className="ms-3 text-secondary">{LOADING_TEXTS.LOADING_EMPLOYEES}</p>
                    </div>
                ) : isError ? (
                    <div className="p-5 text-center text-danger"><p>{error?.message || ERROR_TEXTS.FETCH_ERROR}</p></div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 p-1">
                            <thead>
                                <tr>
                                    <th className="table-header">{TABLE_HEADERS.NAME}</th>
                                    <th>{TABLE_HEADERS.ID}</th>
                                    <th>{TABLE_HEADERS.DEPARTMENT}</th>
                                    <th>{TABLE_HEADERS.DESIGNATION}</th>
                                    <th>{TABLE_HEADERS.PROJECT}</th>
                                    <th>{TABLE_HEADERS.TYPE}</th>
                                    <th>{TABLE_HEADERS.STATUS}</th>
                                    <th>{TABLE_HEADERS.ACTION}</th>
                                    <th className="bottom1-line"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-3 py-4">
                                                <div className="d-flex align-items-center">
                                                    <img className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }} src={employee.profilePic ? `${apiUrl}${employee.profilePic}` : `https://placehold.co/40x40/94a3b8/ffffff?text=${employee.name[0]}`} alt={employee.name} />
                                                    <div className="ms-3"><div className="text-sm fw-medium text-dark">{employee.name}</div></div>
                                                </div>
                                            </td>
                                            <td>{employee.employeeId}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.designation?.title || TABLE_TEXTS.NA}</td>
                                            <td>{employee.project || TABLE_TEXTS.NA}</td>
                                            <td>{employee.type}</td>
                                            <td><span className={`status-badge ${employee.status === STATUS_LABELS.ACTIVE ? "active" : "inactive"}`}>{employee.status}</span></td>
                                            <td className="text-end">
                                                <div className="table-action-icons">
                                                    <Eye className="action-icon" size={18} onClick={() => navigate(`/employees/view/${employee.id}`)} />
                                                    <Edit className="action-icon" size={18} onClick={() => navigate(`/employees/edit/${employee.id}`)} />
                                                    <Trash2 className="action-icon text-danger" size={18} onClick={() => handleDeleteClick(employee.id)} />
                                                </div>
                                            </td>
                                            <td className="bottom1-line"></td>
                                        </tr>
                                    ))
                                ) : (
                                    <td colSpan="8" className="no-data">{TABLE_TEXTS.NO_EMPLOYEES}</td>
                                )}
                            </tbody>
                        </table>
                        <div ref={loadMoreRef} style={{ height: "40px" }} />
                        {isFetchingNextPage && <div className="p-3 text-center text-secondary">{LOADING_TEXTS.LOADING_MORE}</div>}
                        {!hasNextPage && employees.length > 10 && <div className="no-more-data text-center text-muted">{LOADING_TEXTS.NO_MORE}</div>}
                    </div>
                )}
            </div>

            <CommonDialog show={dialogOpen} title={DIALOG_TEXTS.TITLE} message={DIALOG_TEXTS.MESSAGE} icon={Trash2} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
        </div>
    );
};

export default EmployeesList;
