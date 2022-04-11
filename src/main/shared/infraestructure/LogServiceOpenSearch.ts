import { LogModel } from "../domain/models/LogModel";
import { LogService } from "../domain/services/LogService";

export class LogServiceOpenSearch implements LogService{
    error(logModel: LogModel) {
        throw new Error("Method not implemented.");
    }
    warning(logModel: LogModel) {
        throw new Error("Method not implemented.");
    }
    info(logModel: LogModel) {
        throw new Error("Method not implemented.");
    }
    debug(logModel: LogModel) {
        throw new Error("Method not implemented.");
    }

}