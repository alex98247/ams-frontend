import {BaseAxios} from "../../core/BaseAxios";

export class ApplicationService {

    static get(id) {
        return BaseAxios.getAxios().get("api/application", {params: {id: id}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static upsert(application) {
        return BaseAxios.getAxios().post("api/application", application, {headers: BaseAxios.getBaseHeaders()})
    }
}
