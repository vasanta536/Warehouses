import { http } from "./http";

export const register = (email: string, password: string) =>
  http.post("/auth/register", { email, password }).then(r => r.data);

export const login = (email: string, password: string) =>
  http.post("/auth/login", { email, password }).then(r => r.data);

export const me = () =>
  http.get("/auth/me").then(r => r.data);

export const refresh = () =>
  http.post("/auth/refresh").then(r => r.data);

export const logout = () =>
  http.post("/auth/logout").then(r => r.data);
