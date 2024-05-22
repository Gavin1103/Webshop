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
    console.log(viteConfiguration.HBOICTCLOUD_APIKEY);
    console.log(viteConfiguration.HBOICTCLOUD_DATABASE);
    console.log(viteConfiguration.HBOICTCLOUD_ENVIRONMENT);

}
