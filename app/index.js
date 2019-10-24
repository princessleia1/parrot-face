import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import {me} from "appbit";
import {preferences} from "user-settings";
import {battery} from "power";
import {HeartRateSensor} from "heart-rate";

import * as fs from "fs";
import * as messaging from "messaging";
import * as util from "./utils";

const DEBUG_MODE = true;
const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// Element Handles
let elBanner = document.getElementById("bannerLabel");
let elBattery = document.getElementById("batteryLabel");
let elHeartRate = document.getElementById("heartrateLabel");
let elSteps = document.getElementById("stepsLabel");

// Banner Text
elBanner.text = 'Parrot-Face';

// Heart Rate Sensor
const hrm = new HeartRateSensor();
let elHeartRate = document.getElementById("hrLabel");

hrm.onreading = function() {
 elHeartRate.text = `${hrm.heartRate} BPM`;
 //console.log("JS Memory: " + memory.js.used + "/" + memory.js.total);
}
hrm.start();

// Steps Value Adjusted
let stepsVal = (userActivity.today.adjusted["steps"] || 0);
elSteps.text = stepsVal;

// Battery Charge Level
let batteryVal = battery.chargeLevel;
elBattery.text = `${batteryVal}%  `;
//console.log(Math.floor(battery.chargeLevel) + "%");

// Time, Date
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

let day = document.getElementById("day");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

// Update Clock
clock.granularity = "minutes";

clock.ontick = evt => {
 let d = evt.date;
 setDate(d.getDate());
 setDay(d.getDay());

 // Hours, Format
 let hours = d.getHours();
  
 if (preferences.clockDisplay === "12h") {
  hours = hours % 12 || 12;
 } else {
 
  hours = util.zeroPad(hours);
 }
 setHours(hours);

 // Minutes
 let minute = ("0" + d.getMinutes()).slice(-2);
 setMins(minute);

 // Blink Separator
 setSeparator(d.getSeconds());
}

// Load Settings
let settings = loadSettings();
applyTheme(settings.background, settings.foreground);

// Colour Theme
function applyTheme(background, foreground) {
 let items = document.getElementsByClassName("background");
 items.forEach(function(item) {
  item.style.fill = background;
 });
 let items = document.getElementsByClassName("foreground");
 items.forEach(function(item) {
  item.style.fill = foreground;
 });
 settings.background = background;
 settings.foreground = foreground;
}

// Separator
function setSeparator(val) {
 separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
 if (val > 9) {
  drawDigit(Math.floor(val / 10), hours1);
 } else {
  drawDigit("", hours1);
 }
 drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
 drawDigit(Math.floor(val / 10), mins1);
 drawDigit(Math.floor(val % 10), mins2);
}

function setDate(val) {
 drawDigit(Math.floor(val / 10), date1);
 drawDigit(Math.floor(val % 10), date2);
}

function setDay(val) {
 day.image = getDayImg(val);
}

function drawDigit(val, place) {
 place.image = `${val}.png`;
}

function getDayImg(index) {
 let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
 return `day_${days[index]}.png`;
}

// Listen Onmessage Event
messaging.peerSocket.onmessage = evt => {
 applyTheme(evt.data.background, evt.data.foreground);
}

// Register Unload Event
me.onunload = saveSettings;

function loadSettings() {
 try {
  return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
 } catch (ex) {
  // Defaults
  return {
   background: "#3BF7DE",
   foreground: "#3BF7DE"
  }
 }
}

function saveSettings() {
 fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}