#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var createBlogPost_1 = __importDefault(require("./createBlogPost"));
var args = process.argv.slice(2);
console.log("Welcome to Skynet. Let's get started.");
switch (args[0]) {
    case 'create':
        (0, createBlogPost_1["default"])(args[1]);
        break;
}
