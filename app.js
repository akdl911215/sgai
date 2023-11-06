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

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "13.125.245.156", // MySQL 호스트 주소
  user: "root", // MySQL 사용자 이름
  password: "vkfvkfwm1379", // MySQL 비밀번호
  database: "bbb", // 사용할 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 51588,
});

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.post("/ai", async (req, res, next) => {
  try {
    const [total, fields5] = await pool.query(
      "SELECT SUM(a) AS total_a_sum, SUM(b) AS total_b_sum, SUM(c) AS total_c_sum, SUM(total) AS total_sum FROM aaa"
    );
    console.log("total : ", total);
    const { total_a_sum, total_b_sum, total_c_sum, total_sum } = total[0];
    console.log("쿼리 total_a_sum:", total_a_sum);
    console.log("쿼리 total_b_sum:", total_b_sum);
    console.log("쿼리 total_c_sum:", total_c_sum);
    console.log("쿼리 total_sum:", total_sum);

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

    const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    const requestValue = await request.post(
      options,
      function (error, response, body) {
        console.log("responseCode = " + response.statusCode);
        console.log("responseBody = " + body);

        if (error) {
          console.log(error);
          throw new Error(error);
        }

        const object = JSON.parse(body);

        const strSplit = object?.return_object?.recognized?.split(" ");

        // res.json({
        //   token: object?.return_object?.recognized,
        //   count: strSplit.length,
        // });

        return {
          token: object?.return_object?.recognized,
          count: strSplit.length,
        };
      }
    );

    console.log("requestValue : ", requestValue);

    res.json(requestValue);
  } catch (e) {
    console.log("error : ", e);
  }
});
