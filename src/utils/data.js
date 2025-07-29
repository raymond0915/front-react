// utils/data.js - 백엔드 API 서비스
const API_BASE_URL = 'http://localhost:4000';

// 쿠키 관련 유틸리티 함수들
const cookieUtils = {
  // 쿠키 가져오기 (httpOnly가 아닌 쿠키만)
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

  // 쿠키 설정 (사용자 정보용)
  setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  },

  // 쿠키 삭제
  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// API 호출을 위한 기본 함수
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // 쿠키 포함
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API 호출에 실패했습니다.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 사용자 관련 API 함수들
export const userAPI = {
  // 로그인
  async login(email, password) {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // 백엔드에서 httpOnly 쿠키로 JWT 토큰을 설정하므로
    // 프론트엔드에서는 별도로 설정할 필요 없음

    return {
      success: true,
      user: {
        id: response.userId,
        email: email,
        name: email.split('@')[0] // 임시로 이메일에서 이름 추출
      }
    };
  },

  // 회원가입
  async signup(userData) {
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        username: userData.name
      }),
    });

    return {
      success: true,
      user: {
        id: response.userId,
        email: userData.email,
        name: userData.name
      }
    };
  },

  // 사용자 정보 조회
  async getUserInfo() {
    // httpOnly 쿠키는 자동으로 서버로 전송되므로
    // 별도의 토큰 전달이 필요 없음
    const response = await apiCall('/auth/me');

    return {
      success: true,
      user: {
        id: response.userId,
        email: response.email,
        name: response.username
      }
    };
  },

  // 로그아웃
  async logout() {
    try {
      // 백엔드에서 JWT 토큰 쿠키 삭제
      await apiCall('/auth/logout', {
        method: 'POST'
      });
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    }

    // 프론트엔드 쿠키 삭제
    cookieUtils.deleteCookie('currentUser');
  }
};

// 에러 처리 유틸리티
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.message || '예상치 못한 오류가 발생했습니다.'
  };
}; 