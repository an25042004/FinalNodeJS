function ForgotPasswordPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Quên mật khẩu</h1>
        <p className={styles.subtitle}>
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`${styles.input} ${
              touched && !isValidEmail(email) ? styles.inputError : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {touched && !isValidEmail(email) && (
            <div className={styles.error}>Vui lòng nhập email hợp lệ.</div>
          )}

          {err && <div className={styles.alertError}>{err}</div>}
          {msg && <div className={styles.alertSuccess}>{msg}</div>}

          <button
            type="submit"
            className={styles.button}
            disabled={!canSubmit}
            aria-busy={loading ? "true" : "false"}
          >
            {loading
              ? "Đang gửi..."
              : cooldown > 0
              ? `Gửi lại sau ${cooldown}s`
              : "Gửi liên kết đặt lại"}
          </button>
        </form>

        <div className={styles.hint}>
          Nhớ mật khẩu rồi? <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
