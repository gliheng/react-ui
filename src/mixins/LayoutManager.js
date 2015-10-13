import Constants from '../Constants';
import GroupLayoutManager from './GroupLayoutManager';
import GridLayoutManager from './GridLayoutManager';


function LayoutManagerMixinFactory(type) {
    return {
        getDefaultProps() {
            return {
                resizable: true
            };
        },

        getLayoutManager() {
            if (!this.layoutManager) {
                if (type == Constants.GRID) {
                    this.layoutManager = new GridLayoutManager(this);
                } else if (type == Constants.HGROUP || type == Constants.VGROUP){
                    this.layoutManager = new GroupLayoutManager(this, type);
                }
            }
            return this.layoutManager;
        }

    };
}


export {LayoutManagerMixinFactory};
