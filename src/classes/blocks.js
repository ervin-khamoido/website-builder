import {row, col, css} from '../utils';

class Block {
   constructor(value, options) {
      this.value = value;
      this.options = options;
   }

   toHTML() {
      throw new Error('toHMTL method must be implemented!')
   }
}

export class TitleBlock extends Block {
   constructor(value, options) {
      super(value, options);
   }

   toHTML() {
      const {tag = 'h1', styles} = this.options;
      return row(col(`<${tag}>${this.value}</${tag}>`), css(styles))
   }
}

export class TextBlock extends Block {
   constructor(value, options) {
      super(value, options);
   }

   toHTML() {
      const {value} = this;
      const {styles} = this.options;
      return row(col(`<p>${value}</p>`), css(styles));
   }
}

export class ColumnsBlock extends Block {
   constructor(value, options) {
      super(value, options);
   }

   toHTML() {
      const {value} = this;
      const {styles} = this.options;
      return row(value.map(col).join(''), css(styles))
   }
}

export class ImageBlock extends Block {
   constructor(value, options) {
      super(value, options);
   }

   toHTML() {
      const {value} = this
      const {imageStyles: is, styles, alt} = this.options;
      return row(`<img src="${value}" alt="${alt}" style="${css(is)}" />`, css(styles));
      }
}