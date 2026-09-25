"use client";

import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface AuthState {
  error?: string;
  ok?: boolean;
}

export type AuthAction = (
  prev: AuthState,
  formData: FormData,
) => Promise<AuthState>;

interface AuthControlsProps {
  /** Signed-in user's display name, or null when signed out */
  userName: string | null;
  signUpAction: AuthAction;
  signInAction: AuthAction;
  signOutAction: () => Promise<void>;
}

type Mode = "signup" | "signin";

const SEEN_KEY = "auth:seen";
const HAS_ACCOUNT_KEY = "auth:has-account";

const read = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the popup just shows again next visit */
  }
};

const AuthForm = ({
  mode,
  action,
  onSuccess,
}: {
  mode: Mode;
  action: AuthAction;
  onSuccess: () => void;
}) => {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    {},
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <form className="form" action={formAction}>
      {mode === "signup" && (
        <input name="name" placeholder="Your name" required autoComplete="name" />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email address"
        required
        autoComplete="email"
      />
      <div className="password-field">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password (min 8 characters)"
          required
          minLength={8}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((s) => !s)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn primary" disabled={pending}>
        {pending
          ? "Please wait…"
          : mode === "signup"
            ? "Create account"
            : "Sign in"}
      </button>
    </form>
  );
};

export const AuthControls = ({
  userName,
  signUpAction,
  signInAction,
  signOutAction,
}: AuthControlsProps) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("signup");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // First visit: invite to sign up. Returning visitor: default to sign in.
  useEffect(() => {
    if (userName) return;
    setMode(read(HAS_ACCOUNT_KEY) ? "signin" : "signup");
    if (read(SEEN_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [userName]);

  const close = () => {
    write(SEEN_KEY, "1");
    setOpen(false);
  };

  const openAs = (m: Mode) => {
    setMode(m);
    setOpen(true);
  };

  const handleSuccess = () => {
    write(SEEN_KEY, "1");
    write(HAS_ACCOUNT_KEY, "1");
    window.location.reload();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (userName) {
    return (
      <div className="auth-user">
        <span>Hi, {userName}</span>
        <form action={signOutAction}>
          <button type="submit" className="btn ghost small">
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="auth-user">
        <button
          type="button"
          className="btn ghost small"
          onClick={() => openAs("signin")}
        >
          Sign in
        </button>
        <button
          type="button"
          className="btn primary small"
          onClick={() => openAs("signup")}
        >
          Sign up
        </button>
      </div>

      {mounted &&
        open &&
        createPortal(
          <div className="modal-backdrop" onClick={close}>
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={mode === "signup" ? "Create account" : "Sign in"}
              onClick={(e) => e.stopPropagation()}
            >
              <aside className="modal-art" aria-hidden="true">
                <span className="modal-art-brand">Aria Vance</span>
                <p className="modal-art-quote">
                  Every moment is a story worth keeping.
                </p>
                <span className="modal-art-note">
                  Save your favourites and book your session in minutes.
                </span>
              </aside>

              <div className="modal-body">
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={close}
                >
                  ×
                </button>

                <div className="modal-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "signup"}
                    className={mode === "signup" ? "active" : ""}
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "signin"}
                    className={mode === "signin" ? "active" : ""}
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </div>

                <h2>
                  {mode === "signup" ? "Create your account" : "Welcome back"}
                </h2>
                <p className="modal-sub">
                  {mode === "signup"
                    ? "Join in a few seconds to get started."
                    : "Sign in to continue where you left off."}
                </p>

                <AuthForm
                  key={mode}
                  mode={mode}
                  action={mode === "signup" ? signUpAction : signInAction}
                  onSuccess={handleSuccess}
                />

                <p className="modal-trust">
                  {mode === "signup"
                    ? "Free · No spam · Takes 20 seconds"
                    : "Secure sign-in · Your data stays private"}
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
