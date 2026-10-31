import React, { createContext, useContext, useState, useEffect } from 'react';

export const ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
};

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Preconfigured mock users to let any developer immediately test all 3 role perspectives
  const mockProfiles = {
    [ROLES.ADMIN]: {
      id: 1,
      username: 'admin_brightloop',
      email: 'admin@brightloop.io',
      role: ROLES.ADMIN,
      name: 'Sarah Connor',
      company: 'Brightloop Operations HQ',
    },
    [ROLES.STAFF]: {
      id: 2,
      username: 'staff_alex',
      email: 'alex@brightloop.io',
      role: ROLES.STAFF,
      name: 'Alex Rivera',
      company: 'Brightloop Operations',
    },
    [ROLES.CUSTOMER]: {
      id: 3,
      username: 'cust_acme',
      email: 'billing@acmecorp.com',
      role: ROLES.CUSTOMER,
      name: 'John Doe',
      company: 'Acme Corp',
    },
  };

  const [currentRole, setCurrentRole] = useState(ROLES.ADMIN);
  const [user, setUser] = useState(mockProfiles[ROLES.ADMIN]);
  const [token, setToken] = useState(localStorage.getItem('brightloop_token') || 'demo_jwt_token');

  const switchRole = (newRole) => {
    if (mockProfiles[newRole]) {
      setCurrentRole(newRole);
      setUser(mockProfiles[newRole]);
    }
  };

  const login = (userData, authToken) => {
    setUser(userData);
    setCurrentRole(userData.role);
    if (authToken) {
      setToken(authToken);
      localStorage.setItem('brightloop_token', authToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('brightloop_token');
  };

  const hasRole = (allowedRoles = []) => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        token,
        switchRole,
        login,
        logout,
        hasRole,
        isAdmin: currentRole === ROLES.ADMIN,
        isStaff: currentRole === ROLES.STAFF || currentRole === ROLES.ADMIN,
        isCustomer: currentRole === ROLES.CUSTOMER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
