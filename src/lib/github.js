import axios from "axios";

export async function createGist(token, fileName, content) {
    const response = await axios.post(
        "https://api.github.com/gists",
        {
            description: "Code snapshot",
            public: false,
            files: {
                [fileName]: {
                    content,
                },
            },
        },
        {
            headers: {
                Authorization: `token ${token}`,
            },
        }
    );
    return response.data;
}
