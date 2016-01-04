import {enums} from './Utils';

export default {
    Types: enums([
        'HGROUP',
        'VGROUP',
        'GRID'
    ]),

    config: {
        transitionDuration: 500,
        gutterWidth: 4,
        persistState: true,
        menuItemWidth: 87,
        menuItemHeight: 30,
        menuSepItemHeight: 1,
        persistFunc: function () {
            return [
                (id)=> JSON.parse(localStorage[`ui-persist:${id}`] || '{}'),
                (id, data)=> localStorage[`ui-persist:${id}`] = JSON.stringify(data)
            ];
        }
    }
}
