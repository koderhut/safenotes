import Axios from "axios";

class StorageEngine {
    static #ROUTE_NOTES = "/notes";

    client = "";

    constructor(storagePath) {
        this.client = Axios.create({
            baseURL: storagePath,
            timeout: 1000,
            headers: {"X-App": "SafeNotes"},
        });
    }

    store(params) {
        return this.client.post(StorageEngine.#ROUTE_NOTES, {}, {
            data: params,
        });
    }

    fetch(path, params = {}) {
        return this.client.get(StorageEngine.#ROUTE_NOTES + "/" + path, {...params});
    }
}

export default StorageEngine;
