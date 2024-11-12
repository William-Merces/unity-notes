'use client'

import { Alert, AlertTitle } from "@mui/material"
import { CheckCircle, Error, Info } from '@mui/icons-material'

interface AlertMessageProps {
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message?: string;
    onHide?: () => void;
}

const icons = {
    success: CheckCircle,
    error: Error,
    info: Info
}

export default function AlertMessage({
    show,
    type = 'info',
    title,
    message,
    onHide
}: AlertMessageProps) {
    if (!show) return null;

    const Icon = icons[type];

    return (
        <Alert 
            severity={type}
            icon={<Icon />}
            onClose={onHide}
            className="mb-4"
        >
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    );
}