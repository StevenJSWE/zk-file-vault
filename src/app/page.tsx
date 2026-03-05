/**
 * Home page — redirects authenticated users to /vault, others to /login.
 * TODO: Check Supabase auth session and redirect accordingly.
 */
export default function Home() {
  // TODO: Replace with redirect logic using supabase.auth.getSession()
  return (
    <main>
      <h1>ZK File Vault</h1>
      <p>TODO: Redirect to /login or /vault based on auth state.</p>
    </main>
  );
}
