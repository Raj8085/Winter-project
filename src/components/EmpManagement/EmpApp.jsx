// src/App.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import './Emp.css';
function EmpApp() {
  const [empDataArray, setEmpDataArray] = useState([]);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    pwd: '',
    confirmPwd: '',
  });

  const { fName, lName, email, pwd, confirmPwd } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Your existing validation and submission logic...
    if (!emailRegex.test(email)) {
      clearField();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Email!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    if (pwd.length < 8) {
      clearField();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters long!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    if (pwd !== confirmPwd) {
      clearField();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    if (empDataArray.some((emp) => emp.email === email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email already exists! Please use a different email.',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    const secret = 'Why You want to Know My password';
    const enc = CryptoJS.AES.encrypt(pwd, secret).toString();
    const encSubstring = enc.substring(0, 10);

    const empData = {
      fName,
      lName,
      email,
      pwd: encSubstring,
      confirmPwd: encSubstring,
    };

    setEmpDataArray([...empDataArray, empData]);
    clearField();

    Swal.fire({
      title: 'Employee Data has been stored',
      text: 'You clicked the button!',
      icon: 'success',
    });
  };

  const handleDelete = (id) => {
    const employeeToDelete = empDataArray.find((emp) => emp.email === id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setEmpDataArray(empDataArray.filter((emp) => emp.email !== id));
        Swal.fire({
          title: 'Deleted!',
          text: `${employeeToDelete.fName} record has been deleted successfully`,
          icon: 'success',
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
        });
      }
    });
  };

  const clearField = () => {
    setFormData({
      fName: '',
      lName: '',
      email: '',
      pwd: '',
      confirmPwd: '',
    });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="fName" value={fName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lName" value={lName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="pwd" value={pwd} onChange={handleChange} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirmPwd" value={confirmPwd} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="employee-data">
      <h2>Employee Data</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {empDataArray.map((emp, index) => (
            <tr key={index}>
              <td>{emp.fName}</td>
              <td>{emp.lName}</td>
              <td>{emp.email}</td>
              <td>{emp.pwd}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(emp.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default EmpApp;
