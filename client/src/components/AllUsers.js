import React, { useEffect, useState } from 'react';
import '../css/AllUsers.css';  // Import the CSS

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT stored after login

        const res = await fetch('http://localhost:5000/api/auth/all-users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="allusers-container">
      <h2 className="allusers-heading">All Users</h2>
      {error && <p className="allusers-error">{error}</p>}

      <table className="allusers-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
