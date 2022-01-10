import {BaseAxios} from "../../core/BaseAxios";

export class WarehouseService {

    static getAllGoods() {
        return BaseAxios.getAxios().get("api/warehouse", {headers: BaseAxios.getBaseHeaders()})
    }

    static getGood(id) {
        return BaseAxios.getAxios().get("api/warehouse/id", {params: {id: id}}, {headers: BaseAxios.getBaseHeaders()})
    }

    static upsert(good) {
        return BaseAxios.getAxios().post("api/warehouse", good, {headers: BaseAxios.getBaseHeaders()})
    }
}
