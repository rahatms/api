const express = require("express");
const server = express();
const utils = require("./utils");


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

