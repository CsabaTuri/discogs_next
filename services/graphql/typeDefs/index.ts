
const user = require("./schemas/user");
const releases = require("./schemas/releases");
const mutations = require("./schemas/mutations");
const queries = require("./schemas/queries");
const message = require("./schemas/messages");

export const schemaArray = [user, releases, queries, mutations, message];



