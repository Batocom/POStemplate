function login(email, password) {

  const users = DBInstance.table("users").findAll();

  const user = users.find(u =>
    u.email === email &&
    u.password_hash === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = SessionManager.createSession(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  };
}

function testLogin() {
  const res = login("admin@local.app", "admin123");
  Logger.log(res);
}