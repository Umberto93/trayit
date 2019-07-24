import { MenuTraditional } from './menu-traditional';
import { MenuAlternative } from './menu-alternative';

export interface MenuCategory {
    id: number,
    name: string,
    deleted: boolean,
    items?: MenuTraditional | MenuAlternative
}
