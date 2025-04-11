import React, { useEffect, useState } from 'react';
import UserTable from './components/userTable/UserTable';
import Pagination from './components/Pagination/Pagination';
import { fetchUsers } from './api/FetchUsers';
import CustomButton from './components/CustomButton/CustomButton';
import './App.css';
import UserPopup from './components/UserPopup/UserPopup';
import { Action, Gender, Status } from './eums/Enums';
import { User } from './components/userTable/UserTable';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddUser = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    loadUsers(currentPage);
  };

  const loadUsers = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalPages } = await fetchUsers(page, 10);
      setUsers(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <div className="table_header">
        <h1 className="header__title">Users List</h1>
        <CustomButton text="Add user" onClick={handleAddUser} />
      </div>
      <UserTable users={users} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showPopup && (
        <UserPopup
          action={Action.ADD}
          name=""
          email=""
          status={Status.ACTIVE}
          gender={Gender.MALE}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default App;