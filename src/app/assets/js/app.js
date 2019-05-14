angular.module('blockrApp', ['ngRoute', 'perfect_scrollbar', 'ngclipboard', 'angularUtils.directives.dirPagination']);

// Electron Consts
const remote = require('electron').remote;
const shell = remote.shell;
const autoUpdater = remote.autoUpdater;
const fs = require('fs');
const app = remote.app;
const dialog = remote.dialog;
const appVersion = app.getVersion();

// App wide consts
var UPDATE_AVAILABLE = false;
const UPDATE_TIME_INTERVAL = 180000; // 300000 5 mins

const APPDATA_PATH = app.getPath('userData');
const SETTINGS_FILE_PATH = APPDATA_PATH + '\\settings.json';
const PROJECTS_FILE_PATH = APPDATA_PATH + '\\projects.json';
const PROJECT_DIR_PATH = APPDATA_PATH + '\\projects\\';
