import React from 'react';
import './userTable.css';
import { ReactComponent as ThreeDotsIcon } from '../../assets/three-dots-vertical.svg';

interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

interface UserTableProps {
    users: User[];
    loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
    const rows: (User | undefined)[] = loading
        ? Array.from({ length: 10 }).map(() => undefined)
        : users;

    return (
        <table className="user-table">
            <thead className="user-table__header">
                <tr className="user-table__header-row">
                    <th className="user-table__header-cell">Name</th>
                    <th className="user-table__header-cell">Email</th>
                    <th className="user-table__header-cell">Gender</th>
                    <th className="user-table__header-cell">Status</th>
                    <th className="user-table__header-cell">Actions</th>
                </tr>
            </thead>
            <tbody className="user-table__body">
                {rows.map((user, index) => (
                    <tr key={user?.id || index} className="user-table__body-row">
                        <td className="user-table__body-cell">
                            {loading ? <div className="skeleton"></div> : user?.name}
                        </td>
                        <td className="user-table__body-cell">
                            {loading ? <div className="skeleton"></div> : user?.email}
                        </td>
                        <td className="user-table__body-cell">
                            {loading ? <div className="skeleton"></div> : user?.gender}
                        </td>
                        <td className="user-table__body-cell">
                            {loading ? <div className="skeleton"></div> : user?.status}
                        </td>
                        <td className="user-table__body-cell">
                            {loading ? (
                                <div className="skeleton skeleton--button"></div>
                            ) : (
                                <button className="user-table__button user-table__button--menu">
                                    <ThreeDotsIcon className="user-table__icon" />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;