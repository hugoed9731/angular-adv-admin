// las interfaces son como clases, sirven para dar restricciones, y que un objeto tenga cierta forma
// las interfaces no tienen un version de js, por lo cual no se traducen a nada


export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
}


