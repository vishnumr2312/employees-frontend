export const EMPLOYEE_TYPES = ["Full-Time", "Part-Time", "Intern", "Contract"];

export const EMPLOYEE_STATUS = ["Active", "Inactive", "On Leave", "Resigned"];

export const FORM_HEADINGS = {
    ADD: "Add New Employee",
    EDIT: "Edit Employee",
    PERSONAL_INFO: "Personal Information",
};

export const FORM_LABELS = {
    NAME: "Name",
    EMPLOYEE_ID: "Employee ID",
    DEPARTMENT: "Department",
    DESIGNATION: "Designation",
    PROJECT: "Project",
    TYPE: "Type",
    STATUS: "Status",
};

export const FORM_PLACEHOLDERS = {
    NAME: "Enter name",
    EMPLOYEE_ID: "Enter employee ID",
    PROJECT: "Enter project",
};

export const DEPARTMENTS = {
    SELECT: "Select Department",
    DESIGN: "Design",
    ENGINEERING: "Engineering",
    MARKETING: "Marketing",
};

export const DESIGNATIONS = {
    SELECT: "Select Designation",
    LOADING: "Loading...",
};

export const DROPDOWNS = {
    TYPE_SELECT: "Select Type",
    STATUS_SELECT: "Select Status",
};

export const BUTTONS = {
    CANCEL: "Cancel",
    CONFIRM: "Confirm",
    CREATING: "Creating...",
    UPDATING: "Updating...",
};

export const MESSAGES = {
    LOAD_FAILED: "Failed to load employee",
    UPDATE_SUCCESS: "Employee updated successfully!",
    UPDATE_FAILED: "Failed to update employee",
    CREATE_SUCCESS: "Employee created successfully!",
    CREATE_FAILED: "Failed to create employee",
    UNSAVED_CHANGES:
        "You have unsaved changes. Are you sure you want to leave this page?",
};

export const PROFILE = {
    DEFAULT_IMAGE: "https://placehold.co/80x80/9ca3af/ffffff?text=A",
};

export const VALIDATIONS = {
    NAME: {
        REQUIRED: "Name is required",
        MAX: "Name can be at most 100 characters",
    },
    EMPLOYEE_ID: {
        REQUIRED: "Employee ID is required",
        MAX: "Employee ID can be at most 50 characters",
        PATTERN:
            "Employee ID must start with 'RDS' followed by numbers (e.g., RDS416)",
    },
    DEPARTMENT: {
        REQUIRED: "Department is required",
        MAX: "Department can be at most 100 characters",
    },
    DESIGNATION: {
        REQUIRED: "Designation is required",
        TYPE: "Designation must be a number",
    },
    PROJECT: {
        MAX: "Project can be at most 150 characters",
    },
    TYPE: {
        REQUIRED: "Type is required",
        INVALID: "Invalid Type",
    },
    STATUS: {
        REQUIRED: "Status is required",
        INVALID: "Invalid Status",
    },
};
