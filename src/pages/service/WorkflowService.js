import {BaseAxios} from "../../core/BaseAxios";

export class WorkflowService {

    static getTasks(username) {
        return BaseAxios.getAxios().get("api/workflow", {params: {username: username}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static startWorkflow(username) {
        return BaseAxios.getAxios().post("api/workflow/start", null,  {params: {username: username}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static complete(taskCompleteRequest) {
        return BaseAxios.getAxios().post("api/workflow/complete", taskCompleteRequest, {headers: BaseAxios.getBaseHeaders()})
    }
}
