import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../utils/data';

// 쿠키 유틸리티 함수들
const cookieUtils = {
  setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  },

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// 인증 관련 Context 생성
const AuthContext = createContext();

// Auth Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  // 현재 사용자 상태 관리
  const [currentUser, setCurrentUser] = useState(null);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 쿠키에서 사용자 정보 확인
  useEffect(() => {
    const userCookie = cookieUtils.getCookie('currentUser');
    if (userCookie) {
      try {
        setCurrentUser(JSON.parse(userCookie));
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        cookieUtils.deleteCookie('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // 로그인 처리 함수
  const login = (userData) => {
    setCurrentUser(userData);
    cookieUtils.setCookie('currentUser', JSON.stringify(userData), 1); // 1일
  };

  // 로그아웃 처리 함수
  const logout = async () => {
    setCurrentUser(null);
    await userAPI.logout(); // 백엔드 API의 logout 함수 호출
  };

  // Context에 제공할 값들
  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook: Auth Context 사용을 위한 편의 함수
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 