"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var test_1 = require("@playwright/test");
var morgan = require('morgan');
var express = require('express');
var app = express();
app.use(morgan('dev'));
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Start the server
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, name, _c, email, _d, description, date, _e, time, currentYear, week_day, day, finalDate, response, status, browser, page, error_1, secondError_1, error_2;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.query, _b = _a.name, name = _b === void 0 ? 'Default Name' : _b, _c = _a.email, email = _c === void 0 ? 'default@example.com' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, date = _a.date, _e = _a.time, time = _e === void 0 ? '10:00am' : _e;
                currentYear = new Date().getFullYear();
                week_day = new Date("".concat(date, ",").concat(currentYear)).getDay();
                day = DAYS[week_day];
                finalDate = date;
                if (week_day === 2 || week_day === 1) {
                    finalDate += ' - Times';
                }
                console.log("Name: ".concat(name, "#"));
                console.log("Email: ".concat(email, "#"));
                console.log("Description: ".concat(description, "#"));
                console.log("Date: ".concat(finalDate, "#"));
                console.log("Day: ".concat(day, "#"));
                console.log("Time: ".concat(time, "#"));
                response = {};
                _f.label = 1;
            case 1:
                _f.trys.push([1, 24, , 25]);
                return [4 /*yield*/, test_1.chromium.launch({ headless: false })];
            case 2:
                browser = _f.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _f.sent();
                return [4 /*yield*/, page.goto('https://calendly.com/arpit_k')];
            case 4:
                _f.sent();
                console.log('Page loaded');
                return [4 /*yield*/, page.getByRole('button', { name: 'Close' }).click()];
            case 5:
                _f.sent();
                return [4 /*yield*/, page.getByRole('link', { name: 'Minute Meeting' }).click()];
            case 6:
                _f.sent();
                _f.label = 7;
            case 7:
                _f.trys.push([7, 9, , 14]);
                // First attempt: Try clicking the first label
                return [4 /*yield*/, page.getByLabel("".concat(day, ", ").concat(finalDate)).click()];
            case 8:
                // First attempt: Try clicking the first label
                _f.sent();
                return [3 /*break*/, 14];
            case 9:
                error_1 = _f.sent();
                console.log("First click attempt failed: ".concat(error_1.message));
                _f.label = 10;
            case 10:
                _f.trys.push([10, 12, , 13]);
                return [4 /*yield*/, page.getByLabel("".concat(day, ", ").concat(finalDate, " - Times")).click()];
            case 11:
                _f.sent();
                return [3 /*break*/, 13];
            case 12:
                secondError_1 = _f.sent();
                console.log("Second click attempt also failed: ".concat(secondError_1.message));
                throw new Error('Both attempts to click the label have failed.');
            case 13: return [3 /*break*/, 14];
            case 14:
                console.log('Date clicked');
                return [4 /*yield*/, page.getByRole('button', { name: '10:00am' }).click()];
            case 15:
                _f.sent(); //time from params
                console.log('Time clicked');
                return [4 /*yield*/, page.getByLabel("Next ".concat(time)).click()];
            case 16:
                _f.sent();
                console.log('Next clicked');
                return [4 /*yield*/, page.getByLabel('Name *').click()];
            case 17:
                _f.sent();
                return [4 /*yield*/, page.getByLabel('Name *').fill(name)];
            case 18:
                _f.sent(); // Use name from environment variable
                return [4 /*yield*/, page.getByLabel('Email *').click()];
            case 19:
                _f.sent();
                return [4 /*yield*/, page.getByLabel('Email *').fill(email)];
            case 20:
                _f.sent(); // Use email from environment variable
                return [4 /*yield*/, page.getByLabel('Please share anything that').click()];
            case 21:
                _f.sent();
                return [4 /*yield*/, page.getByLabel('Please share anything that').fill(description)];
            case 22:
                _f.sent(); // Use description from environment variable
                console.log('Form filled');
                return [4 /*yield*/, page.getByRole('button', { name: 'Schedule Event' }).click()];
            case 23:
                _f.sent();
                console.log('Event scheduled!');
                response = { message: "Event scheduled successfully" };
                status = 200;
                return [3 /*break*/, 25];
            case 24:
                error_2 = _f.sent();
                console.error(error_2);
                response = { message: "Error scheduling event" };
                status = 500;
                return [3 /*break*/, 25];
            case 25:
                res.status(status).json(response);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('Server started on http://localhost:3000');
});
