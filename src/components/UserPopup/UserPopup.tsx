import React from "react";
import './UserPopup.css';
import { toast } from 'react-toastify';
import { Action, Status, Gender } from "../../eums/Enums";
import { addUser } from "../../api/AddUser";

interface Props {
    action: Action;
    name: string;
    email: string;
    status: Status;
    gender: Gender;
    onClose: () => void;
}

const UserPopup: React.FC<Props> = ({ action, name, email, status, gender, onClose }) => {
    const [formData, setFormData] = React.useState({
        name,
        email,
        status,
        gender,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addUser(formData);
            toast.success('User created successfully!');
            onClose();
        } catch (error: any) {
            console.error('Failed to create user:', error);
            toast.error(error.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="user-popup-overlay">
            <div className="user-popup">
                <div className="user-popup__header">
                    <h2 className="user-popup__title">{action} User</h2>
                    <button className="custom-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form className="user-popup__form" onSubmit={handleSubmit}>
                    <div className="user-popup__input-group">
                        <label htmlFor="user-name" className="user-popup__label">User Name :</label>
                        <input
                            type="text"
                            id="user-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="user-popup__input"
                        />
                    </div>
                    <div className="user-popup__input-group">
                        <label htmlFor="user-email" className="user-popup__label">Email :</label>
                        <input
                            type="email"
                            id="user-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="user-popup__input"
                        />
                    </div>
                    <div className="user-popup__input-group">
                        <label className="user-popup__label">Status :</label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value={Status.ACTIVE}
                                checked={formData.status === Status.ACTIVE}
                                onChange={handleChange}
                            />
                            Active
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value={Status.INACTIVE}
                                checked={formData.status === Status.INACTIVE}
                                onChange={handleChange}
                            />
                            Inactive
                        </label>
                    </div>

                    <div className="user-popup__input-group">
                        <label className="user-popup__label">Gender :</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value={Gender.MALE}
                                checked={formData.gender === Gender.MALE}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value={Gender.FEMALE}
                                checked={formData.gender === Gender.FEMALE}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>

                    <button type="submit" className="custom-button">{action} User</button>
                </form>
            </div>
        </div>
    );
};

export default UserPopup;