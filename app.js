const fs = require("fs");
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
const accessKey = "36196afa-be40-48cb-a2df-301a3e325a2c";
const languageCode = "korean";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

const multipart = require("connect-multiparty");
const cors = require("cors");
app.use(multipart());
app.use(cors());

const axios = require("axios");

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.post("/ai", async (req, res, next) => {
  try {
    console.log("req.files : ", req.files);

    const audioFilePath = await req.files.filename.path;
    console.log("audioFilePath : ", audioFilePath);
    if (!audioFilePath) {
      res.json({ error: "notfound path" });
      throw new Error("notfound path");
    }

    const audioData = await fs.readFileSync(audioFilePath);

    const requestJson = {
      argument: {
        language_code: languageCode,
        audio: audioData.toString("base64"),
      },
    };

    // const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    const postData = {
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    // let result = {};

    const { data } = await axios.post(options);
    //   console.log('data : ', data);

    // const response = await request.post(
    //   options,
    //   function (error, response, body) {
    //     console.log("responseCode = " + response.statusCode);
    //     console.log("responseBody = " + body);
    //
    //     if (error) {
    //       console.log(error);
    //       throw new Error(error);
    //     }
    //
    //     const object = JSON.parse(body);
    //
    //     const strSplit = object?.return_object?.recognized?.split(" ");
    //     console.log("strSplit : ", strSplit);
    //
    //     // res.json({
    //     //   token: object?.return_object?.recognized,
    //     //   count: strSplit.length,
    //     // })
    //
    //     res.json({
    //       token: object?.return_object?.recognized,
    //       count: strSplit.length,
    //     });
    //   }
    // );

    const jsonResponse = JSON.stringify(response);

    console.log("jsonResponse : ", jsonResponse);
  } catch (e) {
    console.log("error : ", e);
  }
});

// 13.124.82.89
// 52826
