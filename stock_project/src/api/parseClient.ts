import Parse from 'parse/dist/parse.min.js';

const appId = '1vPXALjSWocFRxuY1v8zV9qR1Q56NIi0a4mv0E9T';
const jsKey = '0KzcrXvlL9hIQhJQ0dVcPV0lcsAuhglrTesG3lxL';
const serverURL = 'https://parseapi.back4app.com/';

Parse.initialize(appId, jsKey);
Parse.serverURL = serverURL;

export default Parse;
