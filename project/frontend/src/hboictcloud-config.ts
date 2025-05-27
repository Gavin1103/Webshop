import {api} from "@hboictcloud/api";

try {
    api.configure({
        url: "https://api.hbo-ict.cloud",
        apiKey: viteConfiguration.HBOICTCLOUD_APIKEY,
        database: viteConfiguration.HBOICTCLOUD_DATABASE,
        environment: viteConfiguration.HBOICTCLOUD_ENVIRONMENT,
    });
} catch (reason) {
    console.error(reason);
}
