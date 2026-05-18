const SessionManager = {

  createSession(user) {
    const token = Utilities.getUuid();

    const sessionData = {
      userId: user.id,
      role: user.role,
      email: user.email,
      createdAt: new Date()
    };

    CacheService.getScriptCache().put(
      token,
      JSON.stringify(sessionData),
      60 * 60 * 6
    );

    return token;
  },
  

  getSession(token) {
    const data = CacheService.getScriptCache().get(token);
    return data ? JSON.parse(data) : null;
  },

  destroySession(token) {
    CacheService.getScriptCache().remove(token);
  }
};