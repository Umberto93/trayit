export interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    createdAt: string,
    category?: number,
    isAdmin?: boolean,
    standard?: boolean,
    celiac?: boolean,
    vegetarian?: boolean,
    vegan?: boolean,
    diet?: string,
    auth?: string,
    isLogged?: boolean
}
