const express = require("express");
const router = express.Router();

require("dotenv").config({ path: "./config/.env" });
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fieldSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (["png", "jpg", "jpeg", "webm"].indexOf(ext) >= 0) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Azure Cognitive AI Computer Vision
const axios = require("axios").default;
const async = require("async");
const fs = require("fs");
const https = require("https");
const path = require("path");
const { allowedNodeEnvironmentFlags } = require('process');
const { addAbortSignal } = require('stream');
const createReadStream = require("fs").createReadStream;
const sleep = require("util").promisify(setTimeout);
const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;
const key = process.env.MS_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.MS_COMPUTER_VISION_ENDPOINT;
// const faceEndpoint = process.env.MS_FACE_ENDPOINT;
// const subscriptionKey = process.env.MS_FACE_SUB_KEY;
const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
    endpoint
  );

  router.post('/', upload.single("file-to-upload"), async (req, res, next) => {
      try {
      // console.log('req.file.path.......................')
      // console.log(req.file.path)
      console.log('req.file............................')
      console.log(req.file)
      // const result = await cloudinary.uploader.upload(req.file.uri);
      const result = await cloudinary.uploader.upload(req.file.path);
      const tagsURL = result.secure_url;
  
          console.log("Analyzing tags in image...", tagsURL.split("/").pop());
      const tags = (
        await computerVisionClient.analyzeImage(tagsURL, {
          visualFeatures: ["Tags"],
        })
      ).tags;
      console.log(`Tags: ${formatTags(tags)}`);
      function formatTags(tags) {
          return tags
          .map((tag) => `${tag.name} (${tag.confidence.toFixed(2)})`)
          .join(", ");
      }
      res.json({name: `${formatTags(tags)}}`, url: tagsURL })
      } catch (err) {
          next(err)
      }
  })

  module.exports = router