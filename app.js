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

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Hangul = require("hangul-js");

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "13.124.82.89", // MySQL 호스트 주소
  user: "root", // MySQL 사용자 이름
  password: "seogang1234", // MySQL 비밀번호
  database: "bbb", // 사용할 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 52826,
});

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.post("/1", async (req, res, next) => {
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

    const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    await request.post(options, function (error, response, body) {
      console.log("responseCode = " + response.statusCode);
      console.log("responseBody = " + body);

      if (error) {
        console.log(error);
        throw new Error(error);
      }

      const object = JSON.parse(body);
      const strSplit = object?.return_object?.recognized?.split(" ");
      console.log("strSplit : ", strSplit);

      const arr = Array.from(new Set(strSplit))
        .map((value) => Hangul.disassemble(value))
        .filter((value) => "ㄱ" === value[0]);
      console.log("arr :", arr);
      res.json({
        "ㄱ-count": arr.length,
      });
    });
  } catch (e) {
    console.log("error : ", e);
  }
});

app.post("/2", async (req, res, next) => {
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

    const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    await request.post(options, function (error, response, body) {
      console.log("responseCode = " + response.statusCode);
      console.log("responseBody = " + body);

      if (error) {
        console.log(error);
        throw new Error(error);
      }

      const object = JSON.parse(body);
      const strSplit = object?.return_object?.recognized?.split(" ");
      console.log("strSplit : ", strSplit);

      const arr = Array.from(new Set(strSplit))
        .map((value) => Hangul.disassemble(value))
        .filter((value) => "ㄷ" === value[0]);
      console.log("arr :", arr);
      res.json({
        "ㄷ-count": arr.length,
      });
    });
  } catch (e) {
    console.log("error : ", e);
  }
});

app.post("/3", async (req, res, next) => {
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

    const request = require("request");
    const options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { "Content-Type": "application/json", Authorization: accessKey },
    };

    await request.post(options, function (error, response, body) {
      console.log("responseCode = " + response.statusCode);
      console.log("responseBody = " + body);

      if (error) {
        console.log(error);
        throw new Error(error);
      }

      const object = JSON.parse(body);
      const strSplit = object?.return_object?.recognized?.split(" ");
      console.log("strSplit : ", strSplit);

      const arr = Array.from(new Set(strSplit))
        .map((value) => Hangul.disassemble(value))
        .filter((value) => "ㅂ" === value[0]);
      console.log("arr :", arr);
      res.json({
        "ㅂ-count": arr.length,
      });
    });
  } catch (e) {
    console.log("error : ", e);
  }
});

app.get("/ai", async (req, res, next) => {
  try {
    console.log("req.query : ", req.query);
    const { name, sex, age, score1, score2, score3, age_group, phone } =
      req.query;

    const [total, fields5] = await pool.query(
      `SELECT AVG(score1) AS average_a, AVG(score2) AS average_b, AVG(score3) AS average_c, AVG(total) AS average_total FROM aaa where age_group = '${age_group}'`
    );
    console.log("total : ", total);
    const { average_a, average_b, average_c, average_total } = total[0];
    console.log("쿼리 average_a:", average_a);
    console.log("쿼리 average_b:", average_b);
    console.log("쿼리 average_c:", average_c);
    console.log("쿼리 average_total:", average_total);

    const aaaaa = Number(average_a) - Number(score1);
    const bbbbb = Number(average_b) - Number(score2);
    const ccccc = Number(average_c) - Number(score3);

    const registerResponse = await pool.query(
      `INSERT INTO aaa(name, sex, age, score1, score2, score3, age_group, phone) VALUES ('${name}', '${sex}', ${Number(
        age
      )}, ${Number(score1)}, ${Number(score2)}, ${Number(
        score3
      )}, '${age_group}', '${phone}')`
    );
    console.log("registerResponse : ", registerResponse);

    res.json({
      "DBㄱ - clientㄱ": aaaaa,
      "DBㄷ - clientㄷ": bbbbb,
      "DBㅂ - clientㅂ": ccccc,
    });
  } catch (e) {
    console.log("error : ", e);
  }
});

// 13.124.82.89
// 52826
