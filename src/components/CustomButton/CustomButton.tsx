import React from 'react';
import './CustomButton.css';

interface Props {
    text: string;
    onClick: () => void;
}

const CustomButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default CustomButton;