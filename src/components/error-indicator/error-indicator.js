import React from "react";
import { Alert } from "antd";
import './error-indicator.css';

const ErrorIndicator = () => {
    const onClose = (e) => {
        console.log(e, 'closed')
    }
    return (
        <div className="error">
            <Alert message="Что-то пошло не так. Проверьте Ваше интернет-соединение." type="error" closable onClose={onClose}/>
        </div>
    )
};

export default ErrorIndicator;