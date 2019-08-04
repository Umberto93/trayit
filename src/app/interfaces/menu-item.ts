import { Ingredient } from './ingredient';

export interface MenuItem {
    id: number,
    name: string,
    description?: string,
    price?: number,
    rating?: number,
    standard?: boolean,
    celiac?: boolean,
    vegetarian?: boolean,
    vegan?: boolean,
    ingredients?: Array<Ingredient>
}
