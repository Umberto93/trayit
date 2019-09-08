import { MenuTraditional } from './menu-traditional';
import { MenuAlternative } from './menu-alternative';

export interface Summary {
    alternative: boolean,
    items: MenuTraditional | MenuAlternative,
    price: number,
    menuType: number,
    quantity: number
}
