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
                if (type == Constants.Types.GRID) {
                    this.layoutManager = new GridLayoutManager(this);
                } else if (type == Constants.Types.HGROUP || type == Constants.Types.VGROUP){
                    this.layoutManager = new GroupLayoutManager(this, type);
                }
            }
            return this.layoutManager;
        }

    };
}


export {LayoutManagerMixinFactory};
