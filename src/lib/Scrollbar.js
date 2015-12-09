import $ from 'jquery';
import _ from 'underscore';
import {EventEmitter} from 'events';

class Scrollbar extends EventEmitter {
	/** Scrollbar - able to scroll a document vertically
	 * @constructor
	 */
	constructor($root, passiveMode=false, horizontal=false) {
		super();
		$root = $(root);
		// in passive mode, you control content scroll manually
		// by attaching scroll event handler
		this.passiveMode = passiveMode;
		this.horizontal = horizontal;

		this.$el = $(`
			<div class="Scrollbar">
				<div class="handle"></div>
			</div>`);
		this.$el.addClass(horizontal ? 'horizontal' : 'vertical');
		this.$handle = this.$el.find('.handle');
		this.$handle.get(0).addEventListener('mousedown', this);
		this.pos = 0; // scrollbar's position
		this.scroll = 0; // document's scroll

		_.bind(this.scrollTo, this);

		this.$root = $root;
		$root.append(this.$el);

		// only vertical scroll respond to mousewheel event
		if (!horizontal) {
			$root.on('mousewheel', _.bind(this.onScroll, this));
		}
	}

	onScroll(evt) {
        if (evt.deltaFactor !== undefined) {
            // a jquery mousewheel plugin
            this.scrollBy(-evt.deltaY * evt.deltaFactor / 4);
        } else {
            this.scrollBy(-evt.originalEvent.wheelDelta / 30);
        }
	}

	scrollTo(m) {
		var n = m;
		n = Math.max(m, 0);
		n = Math.min(n, this.scrollHeight - this.viewHeight);

		if (!this.passiveMode) {
			if (this.horizontal) {
				this.$root.scrollLeft(n);
				this.$el.css('transform', `translate3d(${n}px,0,0)`);
			} else {
				this.$root.scrollTop(n);
				this.$el.css('transform', `translate3d(0,${n}px,0)`);
			}
		}
		this.scroll = n;
		this.emit('scroll', n);

		this.setScroll(n);
	}

	scrollBy(n) {
		return this.scrollTo(n + this.scroll);
	}

	handleEvent(evt) {
		evt.preventDefault();

		switch (evt.type) {
		case 'mousedown':
			this.start = {
				mouse: this.horizontal ? evt.clientX : evt.clientY,
				pos: this.pos
			};
			window.addEventListener('mousemove', this);
			window.addEventListener('mouseup', this);
			break;

		case 'mousemove':
			var pos = this.start.pos + (this.horizontal ? evt.clientX : evt.clientY) - this.start.mouse;
			pos = Math.min(pos, this.trackHeight - this.barHeight)
			pos = Math.max(pos, 0);
			this.$handle.css(this.horizontal ? 'left' : 'top', pos);
			var s = pos / this.scaleFactor;
			// this.emit('scroll', s);
			if (this.$root) {
				this.scrollTo(s);
			}
			this.pos = pos;
			break;

		case 'mouseup':
			window.removeEventListener('mousemove', this);
			window.removeEventListener('mouseup', this);
			break;
		}
	}

	/** Set the scrollbar's handle position
	 *  @param {number} viewHeight - viewport's height
	 *  @param {number} scrollHeight - whole document's length
	 */
	setDimension(viewHeight, scrollHeight) {
		if (scrollHeight == 0 || viewHeight >= scrollHeight) {
			// this scroll height is unclear at the moment
			this.$el.hide();
		} else {
			// show this first, otherwise cant get bar height
			this.$el.show();

			// scrollbar is at least 5% of height
			var height = Math.max(5, Math.min(100, 100 * viewHeight / scrollHeight));
			this.$handle.css(this.horizontal ? 'width' : 'height', `${height}%`);
			this.barHeight = this.horizontal ? this.$handle.width() : this.$handle.height();
			this.trackHeight = this.horizontal ? this.$el.width() : this.$el.height();
			this.scaleFactor = (this.trackHeight - this.barHeight) / (scrollHeight - viewHeight);
			this.setScroll(this.scroll);

			// if (this.scaleFactor >= 1) {
			// 	this.$el.hide();
			// } else {
			// 	this.$el.show();
			// }
		}

		this.viewHeight = viewHeight;
		this.scrollHeight = scrollHeight;
	}

	/** Set the scrollbar's handle position based on document position
	 *  @param {number} pos - pos is the document position
	 */
	setScroll(pos) {
		if (this.scrollHeight) {
			pos = pos * this.scaleFactor;
		}
		this.$handle.css(this.horizontal ? 'left' : 'top', pos);
		this.pos = pos;
	}

	destroy() {
		this.removeAllListeners();
		this.$el.remove();
		if (!this.horizontal) {
			this.$root.off('mousewheel');
		}
	}
}

export default Scrollbar;
