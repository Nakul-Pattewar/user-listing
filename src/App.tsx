import React, { useEffect, useState } from 'react';
import UserTable from './components/userTable/userTable';
import Pagination from './components/pagination/pagination';
import { fetchUsers } from './api/fetchUsers';
import CustomButton from './components/customButton/customButton';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
        <CustomButton text="Add user" onClick={() => { }} />
      </div>
      <UserTable users={users} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;