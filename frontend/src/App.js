import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:5000";

function AppWrapper() {
  return (
    <div className="App">
      <div className="app-shell">
        <App />
      </div>
    </div>
  );
}

function App() {
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Load token on first render
  useEffect(() => {
    const saved = localStorage.getItem("mern_token");
    const savedUser = localStorage.getItem("mern_user");
    if (saved) {
      setToken(saved);
      if (savedUser) setUser(JSON.parse(savedUser));
      setStatus("loading");
      loadTodos(saved);
    } else {
      setStatus("ok");
    }
    // eslint-disable-next-line
  }, []);

  const loadTodos = async (currentToken = token) => {
    if (!currentToken) return;
    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (!res.ok) throw new Error(`Todos request failed: ${res.status}`);
      const data = await res.json();
      setTodos(data);
      setStatus("ok");
    } catch (err) {
      console.error("❌ loadTodos error:", err);
      setStatus("error");
    }
  };

  const handleAuthSuccess = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("mern_token", token);
    localStorage.setItem("mern_user", JSON.stringify(user));
    setStatus("loading");
    loadTodos(token);
    navigate("/app");
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTodos([]);
    localStorage.removeItem("mern_token");
    localStorage.removeItem("mern_user");
    navigate("/auth");
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!text.trim() || !token) return;

    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      setText("");
      await loadTodos();
    } catch (err) {
      console.error("❌ add todo error:", err);
      alert("Failed to add todo.");
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
      await loadTodos();
    } catch (err) {
      console.error("❌ delete todo error:", err);
      alert("Failed to delete todo.");
    }
  };

  const statusLabel =
    status === "loading"
      ? "Connecting…"
      : status === "ok"
      ? token
        ? "Online"
        : "Guest"
      : "Backend error";

  return (
    <div className="todo-card">
      <header className="todo-header">
  <div>
    <h1 className="app-title">MERN Todo App</h1>
   <p className="app-subtitle">
  {!user
    ? "Organize your day with ease"
    : window.location.pathname === "/app"
    ? `Welcome, ${user.name}`
    : "Organize your day with ease"}
</p>

  </div>

  {/* SHOW logout + online only in TODO PAGE */}
  {window.location.pathname === "/app" && (
    <div className="header-right">
      <span className="status-pill">{statusLabel}</span>

      {user && window.location.pathname === "/app" && (
  <button className="btn btn-danger" onClick={handleLogout}>
    Logout
  </button>
)}

    </div>
  )}
</header>


      <Routes>
        <Route
          path="/"
          element={<HomePage onGetStarted={() => navigate("/auth")} />}
        />
        <Route
          path="/auth"
          element={
            <AuthPage
              onAuthSuccess={handleAuthSuccess}
            />
          }
        />
        <Route
          path="/app"
          element={
            <TodoPage
              token={token}
              todos={todos}
              text={text}
              setText={setText}
              onAdd={handleAddTodo}
              onDelete={handleDeleteTodo}
              ensureLoggedIn={() => {
                if (!token) navigate("/auth");
              }}
            />
          }
        />
      </Routes>

      <footer className="todo-footer">
        <span>Made with ❤️ using MongoDB · Express · React · Node.js</span>
      </footer>
    </div>
  );
}

/* ---------- Pages ---------- */

function HomePage({ onGetStarted }) {
  return (
    <main className="home-main">
      <h2 className="home-title">Todo List for Your Day</h2>
      <p className="home-text">
        Capture tasks, stay focused, and finish your day with clarity.
      </p>
      <button className="btn btn-primary home-button" onClick={onGetStarted}>
        Get Started
      </button>
    </main>
  );
}

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";

      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Auth failed");
      onAuthSuccess(data.token, data.user);
    } catch (err) {
      console.error("❌ auth error:", err);
      alert(err.message || "Authentication failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Google auth failed");
      onAuthSuccess(data.token, data.user);
    } catch (err) {
      console.error("❌ google auth error:", err);
      alert(err.message || "Google login failed");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
          onClick={() => setMode("login")}
        >
          Sign In
        </button>
        <button
          className={`auth-tab ${
            mode === "register" ? "auth-tab-active" : ""
          }`}
          onClick={() => setMode("register")}
        >
          Sign Up
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            className="auth-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        )}
        <input
          className="auth-input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="auth-or">
        <span>or</span>
      </div>

      <div className="google-login-wrapper">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {
          alert("Google Login failed");
        }} />
      </div>

      <div className="divider" />
    </section>
  );
}

function TodoPage({ token, todos, text, setText, onAdd, onDelete, ensureLoggedIn }) {
  useEffect(() => {
    ensureLoggedIn();
    // eslint-disable-next-line
  }, [token]);

  return (
    <main className="todo-main">
      <form className="todo-form" onSubmit={onAdd}>
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to do?"
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      <div className="divider" />

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add your first one!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span className="todo-text">{todo.text}</span>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => onDelete(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default AppWrapper;
