const AuthService = {
  parseBasicToken(token) {
    return Buffer.from(token, "base64")
      .toString()
      .split(":");
  }
};

module.exports = {
  AuthService
};
