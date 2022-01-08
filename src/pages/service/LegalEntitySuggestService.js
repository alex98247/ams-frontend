import {BaseAxios} from "../../core/BaseAxios";

export class LegalEntitySuggestService {

    static suggest(query) {
        return BaseAxios.getAxios().post("api/legalentity/info", {query: query}, {headers: BaseAxios.getBaseHeaders()})
    }
}
