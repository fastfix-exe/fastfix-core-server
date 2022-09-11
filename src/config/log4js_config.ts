import { configure, getLogger } from "log4js";
import { envConfig } from "./env_config";

configure({
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
			"level": envConfig.LOG_LEVEL,
			"enableCallStack": true
		}
	}
});

export const logger = getLogger("hitocompass");