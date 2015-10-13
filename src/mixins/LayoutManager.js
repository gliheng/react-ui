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
        },
        
        componentDidMount() {
            // To render child components, this one needs to know DOM size
            var $node = this.getDOMNode();
            if (!('width' in this.state || 'height' in this.state)) {
                this.setState({
                    width: $node.clientWidth,
                    height: $node.clientHeight
                });
            }
        }

    };
}


export {LayoutManagerMixinFactory};
