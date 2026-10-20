import { Cookies } from "react-cookie";

export class SaveNLoad {

    static save(save_name : string, templateSave : Object) : void{
        (new Cookies).set(save_name, JSON.stringify(templateSave), {
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        });
    }

    static load(save_name : string) : object {
        let data = (new Cookies).get(save_name)
        if(data){
            return data
        } else {
            return {}
        }
    }

    static is_has_save(save_name : string) : boolean{
        let data = this.load(save_name)
        return Boolean(data && Object.keys(data).length)
    }
}