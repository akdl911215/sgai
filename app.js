const fs = require("fs");
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
const accessKey = "36196afa-be40-48cb-a2df-301a3e325a2c";
const languageCode = "korean";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";
// app.use(cors());
app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});

app.get("/example", (req, res) => {
  console.log("example");

  res.json({
    success: "example!!",
  });
});

app.post("/ai", async (req, res, next) => {
  //
  // console.log("req : ", req);
  const audioFilePath =
    req.body || "/Users/ijeonghyeon/Downloads/KOR_F_RM0769FLJH0325.pcm";
  console.log("audioFilePath : ", audioFilePath);
  //
  const audioData = fs.readFileSync(audioFilePath);

  const requestJson = {
    argument: {
      language_code: languageCode,
      audio: audioData.toString("base64"),
    },
  };

  const request = require("request");
  const options = {
    url: openApiURL,
    body: JSON.stringify(requestJson),
    headers: { "Content-Type": "application/json", Authorization: accessKey },
  };

  request.post(options, function (error, response, body) {
    console.log("responseCode = " + response.statusCode);
    console.log("responseBody = " + body);

    if (error) {
      console.log(error);
      throw new Error(error);
    }

    const object = JSON.parse(body);

    const strSplit = object?.return_object?.recognized?.split(" ");

    res.json({
      token: object?.return_object?.recognized,
      count: strSplit.length,
    });
  });
});
