import { LogModel } from "../models/LogModel";

export interface LogService {
    error(logModel: LogModel): any;
    warning(logModel: LogModel): any;
    info(logModel: LogModel): any;
    debug(logModel: LogModel): any;
}