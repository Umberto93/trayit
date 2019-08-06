import { MenuTraditional } from './menu-traditional';
import { MenuAlternative } from './menu-alternative';

export interface Summary {
    alternative: boolean,
    price: number,
    items: MenuTraditional | MenuAlternative
}
