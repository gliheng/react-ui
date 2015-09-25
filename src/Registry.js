var registry = {};
export default {
    get(id) {
        return registry[id];
    },
    set(id, c) {
        registry[id] = c;
    }
};
