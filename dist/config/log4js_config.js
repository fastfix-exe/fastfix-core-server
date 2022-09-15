"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("log4js");
const env_config_1 = require("./env_config");
(0, log4js_1.configure)({
    "appenders": {
        "console": {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[[%d{yyyy-MM-dd hh:mm:ss.SSS}]%] %[[%p]%] %c %X{url} - %m"
            }
        }
    },
    "categories": {
        "default": {
            "appenders": ["console"],
            "level": "all"
        },
        "fastfix": {
            "appenders": ["console"],
            "level": env_config_1.envConfig.LOG_LEVEL,
            "enableCallStack": true
        }
    }
});
exports.logger = (0, log4js_1.getLogger)("hitocompass");
//# sourceMappingURL=log4js_config.js.map