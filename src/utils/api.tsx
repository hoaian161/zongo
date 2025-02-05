export const postData = async (method: string, data: object) => {
    try {
        const response = await fetch("https://ean.vn/project/zongo/?method=" + method, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error during POST request:", error);
        throw error;
    }
};
