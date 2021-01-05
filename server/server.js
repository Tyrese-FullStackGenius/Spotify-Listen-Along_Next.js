// REF: https://socket.io/docs/v3/server-initialization/
// REF: https://developer.spotify.com/documentation/general/guides/authorization-guide/
// REF: https://formatjs.io/docs/react-intl/components#locale-formats-and-messages

require("dotenv").config();

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");

const { basename } = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const compression = require("compression");
const accepts = require("accepts");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const auth = require("./authorization.js");
const api = require("./api.js");
const glob = require("glob");

// ===================== //
//    LOCALE RETRIEVAL   //
// ===================== //

// Retrieve supported languages by looking for the translations I added to listen-along-app-next/languages
const languages = glob.sync("./lang/*.json").map((f) => basename(f, ".json"));

const localeDataCache = new Map();
const getLocaleDataScript = (locale) => {
  const lang = locale.split("-")[0];
  // if localeDataCache does not have any languages...
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = fs.readFileSync(localeDataFile, "utf8");
    localeDataCache.set(lang, localeDataScript);
  }

  return localeDataCache.get(lang);
};

const getMessages = (locale) => {
  return require(`../lang/${locale}.json`);
};

nextApp.prepare().then(() => {
  app.use(compression());
  app.use(cookieParser());
  app.set("views", __dirname + "/views");
  // Embedded JavaScript for use with our Spotify Callback render
  app.set("view engine", "ejs");

  // need this to parse our refresh_token
  app.use(
    bodyParser.json({
      limit: 1024,
    })
  );

  // Auth Router
  app.use("/auth", auth);

  // API + Web Socket Router
  app.use("/api", api(io));

  app.get("*", (req, res) => {
    const accept = accepts(req);
    const locale = accept.language(languages);
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = getMessages(locale);
    console.log({
      locale: req.locale,
      messages: req.messages,
    });
    return nextHandler(req, res);
  });

  // *** to-do: 404???

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(
      `Dude, let's surf the interwebs | Listening on port: ${
        process.env.PORT || 3000
      }`
    );
  });
});
