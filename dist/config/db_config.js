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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const env_config_1 = require("./env_config");
let pool;
//create pool
// if (envConfig.NODE_ENV === 'localenv') {
//     pool = new Pool({
//         connectionString: envConfig.PG_CONNECTION_STRING,
//     });
// } else {
pool = new pg_1.Pool({
    connectionString: env_config_1.envConfig.PG_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});
// }
//sql query
function query(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query(text);
        const rows = res.rows;
        return rows;
    });
}
exports.db = {
    query
};
//# sourceMappingURL=db_config.js.map