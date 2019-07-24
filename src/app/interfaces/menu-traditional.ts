import { MenuItem } from './menu-item';

export interface MenuTraditional {
    first: Array<MenuItem>,
    main: Array<MenuItem>,
    side: Array<MenuItem>,
    extra: Array<MenuItem>
}
