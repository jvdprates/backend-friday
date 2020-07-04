const jwt = require("jsonwebtoken");

module.exports = {
  async authenticateToken(request, response, next) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader
      ? authHeader.split(" ")
      : [undefined, undefined];

    if (!token || token === null)
      return response.status(401).json({ error: "No token provided" });

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: "Token badformatted" });

    const validToken = await new Promise((res) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res(false);

        request.session = user;

        return res(true);
      });
    });

    if (validToken) return next();
    return response.status(403).json({ error: "Invalid authorization token" });
  },

  isBar(request, response, next) {
    if (request.session.type !== "bar") {
      return response.status(403).json({ error: "access denied" });
    } else {
      next();
    }
  },

  isUser(request, response, next) {
    if (request.session.type !== "user") {
      response.status(403).json({ error: "access denied" });
    } else {
      next();
    }
  },
};
