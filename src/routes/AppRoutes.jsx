import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import EmployeesList from "../features/employees/components/EmployeesList/EmployeesList";
import EmployeeForm from "../features/employees/components/EmployeeForm/EmployeeForm";
import EmployeeDetails from "../features/employees/components/EmployeeDetails/EmployeeDetails";
import Dashboard from "../features/dashboard/components/Dashboard/Dashboard";
import Calendar from "../features/calendar/components/Calendar/Calendar";
import Messages from "../features/messages/components/Messages/Messages";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Navigate to="employees" replace />} />

                <Route path="employees" element={<EmployeesList />} />
                <Route path="employees/add" element={<EmployeeForm />} />
                <Route path="employees/edit/:id" element={<EmployeeForm />} />
                <Route path="employees/view/:id" element={<EmployeeDetails />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="messages" element={<Messages />} />
                <Route path="*" element={<h2>404 | Page Not Found</h2>} />
            </Route>
        </Routes>
    );
}
