import {BaseAxios} from "../../core/BaseAxios";

export class ApplicationService {

    static get(taskId) {
        return BaseAxios.getAxios().get("api/application", {params: {taskId: taskId}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static upsert(application) {
        return BaseAxios.getAxios().post("api/application", application, {headers: BaseAxios.getBaseHeaders()})
    }
}
