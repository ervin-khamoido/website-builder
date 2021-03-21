import {
   Site
} from './site';
import {
   Sidebar
} from './sidebar';

export class App {
   constructor(model) {
      this.model = model;
      this.init();
   }

   init() {
      const site = new Site('#site');
      site.render(this.model);

      new Sidebar('#panel', newBlock => {
         this.model.push(newBlock);
         site.render(this.model);
      });
   }
}

site.addEventListener('click', event => {
   if (event.target.tagName === 'SPAN' && event.target.classList.contains('close-target')) {
      event.target.parentNode.remove();
   }
});