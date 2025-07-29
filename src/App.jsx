import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './assets/styles/App.css';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
      cacheTime: 10 * 60 * 1000, // 10분간 캐시 유지
      retry: 3, // 실패 시 3번 재시도
      refetchOnWindowFocus: false, // 창 포커스 시 자동 새로고침 비활성화
    },
  },
});

// 인증 상태에 따른 라우팅 컴포넌트
const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* 로그인 페이지 라우트 */}
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/home" replace /> : <LoginPage />
        }
      />
      {/* 회원가입 페이지 라우트 */}
      <Route
        path="/signup"
        element={
          currentUser ? <Navigate to="/home" replace /> : <SignupPage />
        }
      />
      {/* 홈 페이지 라우트 */}
      <Route
        path="/home"
        element={
          currentUser ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      {/* 루트 경로를 로그인 페이지로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    // React Query Provider로 전체 앱 감싸기
    <QueryClientProvider client={queryClient}>
      {/* React Router를 사용한 라우팅 설정 */}
      <Router>
        {/* 인증 상태 관리 Provider */}
        <AuthProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 