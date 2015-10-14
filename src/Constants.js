import {enums} from './Utils';

export default {
    Types: enums([
        'HGROUP',
        'VGROUP',
        'GRID'
    ]),

    config: {
        gutterWidth: 4,
        persistState: true,
        persistFunc: function () {
            return [
                (id)=> JSON.parse(localStorage[`ui-persist:${id}`] || '{}'),
                (id, data)=> localStorage[`ui-persist:${id}`] = JSON.stringify(data)
            ];
        }
    }
}
