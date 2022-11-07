export const errorWrapper = (error: any, message: string, data: object = {}) => {
    return { success: false, error: true, message: `${message}, ${error.toString()}`, data}
}

export const successWrapper = (message: string, data: object) => {
    return { success: true, error: false, message, data}
}