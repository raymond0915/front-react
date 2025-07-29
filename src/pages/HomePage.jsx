import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Todo App</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">
              안녕하세요, {currentUser.name}님!
            </span>
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <h2 className="mb-4">환영합니다! 🎉</h2>
                <p className="lead mb-4">
                  {currentUser.name}님, 로그인에 성공했습니다.
                </p>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h5 className="card-title">이메일</h5>
                        <p className="card-text">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h5 className="card-title">사용자 ID</h5>
                        <p className="card-text">{currentUser.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted">
                    현재는 로그인/회원가입 기능만 구현되어 있습니다.
                    <br />
                    향후 Todo 기능이 추가될 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 