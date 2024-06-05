import React, { useState, useEffect } from 'react';
import "./User.css";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { baseUrl } from '../../functions/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function User() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // fetch("http://localhost:8000/admin/alluser")
    //   .then(res => res.json())
    //   .then(result => setUsers(result))
    //   .catch(err => alert(err));
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem("userEmail");
      const response = await fetch(`${baseUrl}/api/admin/alluser/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the JWT token in the Authorization header
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }


      const users = await response.json();

      setUsers(users)
    }
    catch (err) {
      alert(err);
      console.log(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/deleteUser/${id}`, { method: 'DELETE' });
      const result = await response.json();
      console.log(result);
      fetchUserDetails(); 
      toast.success(result.message)
    }
    catch (err) {
      console.log(err.message); 
      toast.error(err.message)
    }
  }

  console.log(users);
  return (
    <div className='user-wrapper'>
      <h2 style={{ color: 'black' }}>User Data Table</h2>
      <table>
        <thead>
          <th>SL. No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Delete User</th>
          {/* <th>Country</th> */}
        </thead>
        <tbody>
          {users !== null ? (<>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button onClick={() => deleteUser(item._id)}>
                    Delete User
                  </button>
                </td>
                {/* <td>
                  <DeleteRoundedIcon sx={{cursor: 'pointer'}} onClick= {() => console.log("hello")}/>
                </td> */}
              </tr>
            ))}
          </>) : (<>Loading. . . </>)}

        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default User