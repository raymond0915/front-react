import React from 'react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link text-white p-0 border-0" style={{ textDecoration: 'none' }}>
          My ToDo App
        </button>
        <div className="d-flex">
          <span className="navbar-text text-white me-3">{currentUser.email}님 환영합니다!</span>
          <button className="btn btn-light" onClick={onLogout}>로그아웃</button>
        </div>
      </div>
    </nav>
  );
};

export default Header; 