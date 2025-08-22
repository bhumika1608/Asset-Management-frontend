import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Only allow IAA_superuser/IAAsuperuser1234 as superuser
    let isSuperuser = false;
    if (username === 'IAA_superuser' && password === 'IAAsuperuser1234') {
      isSuperuser = true;
    }
    const data = { username, isSuperuser };
    localStorage.setItem('loggedInUser', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

