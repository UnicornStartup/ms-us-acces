import { LogModel } from "../domain/models/LogModel";
import { LogService } from "../domain/services/LogService";
import { Client } from "@opensearch-project/opensearch";
import fs from "fs";

var host = 'localhost';
var protocol = 'https';
var port = 9200;
var auth = 'admin:admin';
var ca_certs_path = '/full/path/to/root-ca.pem';


var client = new Client({
    node: protocol + '://' + auth + '@' + host + ':' + port,
    ssl: {
        ca: fs.readFileSync(ca_certs_path),
    }
})

export class LogServiceOpenSearch implements LogService{
    async error(logModel: LogModel) {
        let document = generateDocument(logModel);
        var id = '1'
    
        var response = await client.index({
            id: id,
            index: "index_name",
            body: document,
            refresh: true
        });
    
        console.log('Adding document:');
        console.log(response.body);
    
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

function generateDocument(logModel: LogModel) {
    return {
        'logType': logModel.logType,
        'trace': logModel.trace,
        'className': logModel.className
    }
}
