export const handleApiError = (error: any): never => {
    let message;

    if (error.response) {
        message = error.response.data?.message;
    } else {
        message = error.message;
    }

    if (Array.isArray(message)) {
        message = message.join("\n");
    } else if (typeof message === "object" && message !== null) {
        message = Object.values(message).join("\n");
    }

    throw new Error(message || "Unknown error occurred");
};