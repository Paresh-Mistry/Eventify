// Simulate user session for demo purposes
export function getCurrentUser() {
  const isLoggedIn = false; // toggle for demo
  return isLoggedIn ? { id: 1, name: 'Paresh' } : null;
}
