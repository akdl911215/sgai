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
const request = require("request");

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

    // 1
    const audioFilePath = await req.files.filename1.path;
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

    // 2
    const audioFilePath2 = await req.files.filename2.path;
    console.log("audioFilePath2 : ", audioFilePath2);
    if (!audioFilePath2) {
      res.json({ error: "notfound path" });
      throw new Error("notfound path");
    }

    const audioData2 = await fs.readFileSync(audioFilePath2);

    const requestJson2 = {
      argument: {
        language_code: languageCode,
        audio: audioData2.toString("base64"),
      },
    };

    // 3
    const audioFilePath3 = await req.files.filename3.path;
    console.log("audioFilePath3 : ", audioFilePath3);
    if (!audioFilePath3) {
      res.json({ error: "notfound path" });
      throw new Error("notfound path");
    }

    const audioData3 = await fs.readFileSync(audioFilePath3);

    const requestJson3 = {
      argument: {
        language_code: languageCode,
        audio: audioData3.toString("base64"),
      },
    };
    //

    const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };
    const options2 = {
      url: openApiURL,
      body: JSON.stringify(requestJson2),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };
    const options3 = {
      url: openApiURL,
      body: JSON.stringify(requestJson3),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    const re1 = new Promise((resolve, reject) => {
      request.post(options, function (error, response, body) {
        console.log("responseCode = " + response.statusCode);
        console.log("responseBody = " + body);

        if (error) {
          console.log(error);
          throw new Error(error);
        }

        const object = JSON.parse(body);

        const strSplit = object?.return_object?.recognized?.split(" ");
        console.log("strSplit : ", strSplit);

        // res.json({
        //   token: object?.return_object?.recognized,
        //   count: strSplit.length,
        // })

        resolve({
          token: object?.return_object?.recognized,
          count: strSplit.length,
        });
      });
    });

    const re2 = new Promise((resolve, reject) => {
      request.post(options, function (error, response, body) {
        console.log("responseCode = " + response.statusCode);
        console.log("responseBody = " + body);

        if (error) {
          console.log(error);
          throw new Error(error);
        }

        const object = JSON.parse(body);

        const strSplit = object?.return_object?.recognized?.split(" ");
        console.log("strSplit : ", strSplit);

        // res.json({
        //   token: object?.return_object?.recognized,
        //   count: strSplit.length,
        // })

        resolve({
          token: object?.return_object?.recognized,
          count: strSplit.length,
        });
      });
    });

    const re3 = new Promise((resolve, reject) => {
      request.post(options, function (error, response, body) {
        console.log("responseCode = " + response.statusCode);
        console.log("responseBody = " + body);

        if (error) {
          console.log(error);
          throw new Error(error);
        }

        const object = JSON.parse(body);

        const strSplit = object?.return_object?.recognized?.split(" ");
        console.log("strSplit : ", strSplit);

        // res.json({
        //   token: object?.return_object?.recognized,
        //   count: strSplit.length,
        // })

        resolve({
          token: object?.return_object?.recognized,
          count: strSplit.length,
        });
      });
    });
    Promise.all([re1, re2, re3]).then((value) =>
      console.log("value : ", value)
    );

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
  } catch (e) {
    console.log("error : ", e);
  }
});

// 13.124.82.89
// 52826
