import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth  from "../Context/AuthContext.jsx";

export default function Auth() {
  const { signup, login, user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const [mode, setMode] = useState(initialMode);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setStatusMessage("");
  }, [initialMode]);

  useEffect(() => {
    if (displayError) {
      const timer = setTimeout(() => {
        setDisplayError(false);
        setErrorMessage('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [displayError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setStatusMessage("");
    setErrorMessage('');

    try {
      if (mode === "signup") {
        signup(data.email, data.password);
        setStatusType("success");
        setStatusMessage("Sign up successful. Redirecting to home...");
      } else {
        login(data.email, data.password);
        setStatusType("success");
        setStatusMessage("Login successful. Redirecting to home...");
      }

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setStatusType("error");
      setErrorMessage(error.message);
      setDisplayError(true);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>

          {user && (
            <div className="auth-status info">
              You are already signed in as <strong>{user.email}</strong>.
            </div>
          )}

          {statusMessage && (
            <div className={`auth-status ${statusType} ${statusType === 'error' ? 'error-message' : ''}`}>
              {statusMessage}
            </div>
          )}

          {displayError && (
            <div className={`auth-status ${statusType} ${statusType === 'error' ? 'error-message' : ''}`}>
              {errorMessage}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 5,
                    message: "Email must be at least 5 characters",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email must be a valid email address",
                  },
                })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{' '}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Log In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

