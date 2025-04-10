import React from 'react';
import './customButton.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default CustomButton;