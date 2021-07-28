import { environment } from "../../environments/environment";

const base_url = environment.base_url;
// con environmente obtenemos todo el url de la api
export class Usuario {
    constructor(
            public nombre: string, 
            public email: string,
            public password?: string,
            public img?: string,
            public google?: boolean,
            public role?: 'ADMIN_ROLE' | 'USER_ROLE',
            public uid?: string
            // ? - define que va a ser opcional 
    ){}

    get imagenUrl() {

        if(!this.img){
            return `${ base_url }/upload/usuarios/no-image`;
        } else if (this.img?.includes('https') ) {
            return this.img;
             /* includes() El método includes() determina si una cadena de 
        texto puede ser encontrada dentro de otra cadena de texto, devolviendo true o false según corresponda. 
        this.img && this.img.includes('https')*/
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }

}

