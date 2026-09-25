"use server";

import type { AuthState } from "@repo/ui/auth-controls";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "../auth";
import { db } from "../lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const credentialsSignIn = async (
  email: string,
  password: string,
): Promise<AuthState> => {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true };
  } catch (e) {
    if (e instanceof AuthError) return { error: "Incorrect email or password." };
    throw e;
  }
};

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };

  const existing = await db.user.findUnique({ where: { email } });
  if (existing)
    return { error: "An account with this email already exists. Try signing in." };

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({ data: { name, email, passwordHash } });

  return credentialsSignIn(email, password);
}

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!EMAIL_RE.test(email) || !password)
    return { error: "Please enter your email and password." };

  return credentialsSignIn(email, password);
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
