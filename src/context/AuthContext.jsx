import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (username && password.length >= 6) {
      setUser({ username, fullName: username, role: 'coordinator', email: `${username}@college.edu` });
      setLoading(false);
      return { ok: true };
    }
    setLoading(false);
    return { ok: false, error: 'Invalid credentials. Password must be at least 6 characters.' };
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setUser({ username: data.username, fullName: `${data.firstName} ${data.lastName}`, role: 'coordinator', email: data.email });
    setLoading(false);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
