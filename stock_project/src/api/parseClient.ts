import Parse from 'parse/dist/parse.min.js';

const appId = '9yO8szbeCy8P0ZiBPWh5zwMwEucXO2oVRmPGYIRf';
const jsKey = 'fEuqZaA9Zbjl1j9lgSmrLslMyRIV29d4mPpujinE';
const serverURL = 'https://parseapi.back4app.com/';

Parse.initialize(appId, jsKey);
Parse.serverURL = serverURL;

export default Parse;
