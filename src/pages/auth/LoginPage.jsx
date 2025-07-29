import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI, handleAPIError } from '../../utils/data';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Context에서 인증 관련 함수와 상태 가져오기
  const { currentUser, login } = useAuth();

  useEffect(() => {
    // 이미 로그인된 사용자는 홈 페이지로 리다이렉트
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // 유효성 검사
    if (!email || !password) {
      setErrorMessage('모든 항목을 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      // 비동기 로그인 API 호출
      const result = await userAPI.login(email, password);

      if (result.success) {
        // Context의 login 함수 사용
        login({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name
        });
        navigate('/home');
      }
    } catch (error) {
      const errorInfo = handleAPIError(error);
      setErrorMessage(errorInfo.error || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">로그인</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        로그인 중...
                      </>
                    ) : (
                      '로그인'
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="text-decoration-none">회원가입</Link>
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

export default LoginPage; 