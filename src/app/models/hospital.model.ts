interface _HospitalUser {
    // solo nos va a servir para extraer cierta informacion que solo ocuparemos aqui
    _id: string;
    nombre: string;
    img: string;
}

// _ el guion bajo indica que es algo privado
export class Hospital {
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser,


    ){

    }
}