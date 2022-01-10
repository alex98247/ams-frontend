import {BaseAxios} from "../../core/BaseAxios";

export class LegalEntityService {

    static getLegalEntityById(id) {
        return BaseAxios.getAxios().get("api/legalentity/" + id, {headers: BaseAxios.getBaseHeaders()})
    }

    static getLegalEntityByName(name) {
        return BaseAxios.getAxios().get("api/legalentity", {params: {name: name}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static saveLegalEntity(legalEntity) {
        return BaseAxios.getAxios().post("api/legalentity", legalEntity, {headers: BaseAxios.getBaseHeaders()})
    }

    static saveLegalEntityByInn(inn) {
        return BaseAxios.getAxios().get("api/legalentity/find", {params: {inn: inn}}, {headers: BaseAxios.getBaseHeaders()})
    }
}
