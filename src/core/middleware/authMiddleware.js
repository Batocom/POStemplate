function requireAuth(token) {

  const session = SessionManager.getSession(token);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

function requireRole(token, role) {

  const session = requireAuth(token);

  if (session.role !== role) {
    throw new Error("Forbidden: insufficient permissions");
  }

  return session;
}