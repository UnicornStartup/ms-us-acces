export class LogModel {
    logType: LogType;
    trace: string;
    className: string;

    constructor(logType: LogType, trace: string, className: string) {
        this.logType = logType;
        this.trace = trace;
        this.className = className;
    }
}

export const enum LogType {
    test = "esto es un test"
}