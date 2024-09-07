import ConfigurationAPIs from "./ConfigAPI";

const APIs = {
    createUser: async (data: any, customPath?: string) => {
        const path = customPath || 'users/create';
        return ConfigurationAPIs.post(path, data)
    }
}

export default APIs