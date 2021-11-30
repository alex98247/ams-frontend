import {BaseAxios} from "../../core/BaseAxios";

export class EmployeeService {
    static getAllEmployees() {
        return BaseAxios.getAxios().get("api/employee", {headers: BaseAxios.getBaseHeaders()})
    }

    static saveEmployee(employee) {
        console.log(employee)
        console.log({headers: BaseAxios.getBaseHeaders()})
        return BaseAxios.getAxios().post("api/employee", employee, {headers: BaseAxios.getBaseHeaders()})
    }
}
