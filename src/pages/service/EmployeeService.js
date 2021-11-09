import {BaseAxios} from "../../core/BaseAxios";

export class EmployeeService {
    static getAllEmployees() {
        return BaseAxios.getAxios().get("api/employee", {headers: BaseAxios.getBaseHeaders()})
    }
}
