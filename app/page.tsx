"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.email) errs.email = "Email is required";
    else if (!validateEmail(form.email)) errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validate();
      setErrors(errs);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // Simulated network delay
    await new Promise((res) => setTimeout(res, 1200));

    // Auth Simulation
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", form.email);

    router.push("/dashboard");
  };

  return (
    <main className={styles.main}>
      {/* Background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>⚡</div>
          <h1 className={styles.logoText}>
            Neuro<span className={styles.accent}>Learn</span>
          </h1>
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to continue your learning journey</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <div className={`${styles.inputWrap} ${errors.email && touched.email ? styles.inputError : form.email && !errors.email ? styles.inputSuccess : ""}`}>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                autoComplete="email"
                style={{ paddingLeft: "12px" }}
              />
            </div>
            {errors.email && touched.email && (
              <p className={styles.errorMsg}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">Password</label>
            </div>
            <div className={`${styles.inputWrap} ${errors.password && touched.password ? styles.inputError : form.password && !errors.password ? styles.inputSuccess : ""}`}>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                autoComplete="current-password"
                style={{ paddingLeft: "12px" }}
              />
            </div>
            {errors.password && touched.password && (
              <p className={styles.errorMsg}>{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
