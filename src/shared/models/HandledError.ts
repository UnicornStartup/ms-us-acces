export type HandledError = {
    message: string | ErrorMessages;
    resolution?: string | undefined;
}

export const enum ErrorMessages {
    DBUserNotFound = "user was not found.",
    DBIncoherenceError = "incoherence error.",
    DBError = "internal database error.",
    ServerError = "internal server error.",
    RequestBodyError = "error parsing request body.",
    UnexpectedError = "unexpected error"
}

export const isError = (
    toBeDetermined: any | HandledError
): toBeDetermined is HandledError => {
    return !!(toBeDetermined as HandledError)?.message;
};