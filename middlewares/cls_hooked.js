const cls = require("cls-hooked");
const { v4: uuidv4 } = require("uuid");

const clsNamespace = cls.createNamespace("app");

const clsMiddleware = (req, res, next) => {
  clsNamespace.bind(req);
  clsNamespace.bind(res);

  const traceID = uuidv4();

  clsNamespace.run(() => {
    clsNamespace.set("traceID", traceID);
    // Attach traceID to the req object
    req.traceID = traceID;
    next();
  });
};

module.exports = clsMiddleware;
