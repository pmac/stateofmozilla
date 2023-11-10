import './main.css';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';

// data
// gets all the ts files in the /articles folder and returns them as an array
// const articles = import.meta.glob('./articles/*.ts');
const articles = import.meta.globEager('./articles/*.ts');
const articleContents: any[] = []; // Array to store the contents of each file

for (const modulePath in articles) {
  if (Object.prototype.hasOwnProperty.call(articles, modulePath)) {
    const module = articles[modulePath];
    articleContents.push(module ? module : null);
  }
}

interface BodyStore {
  lock: boolean;
  toggle(): void;
}


// components
import hero from './components/hero';
import header from './components/header';
import footer from './components/footer';

window.Alpine = Alpine;

// Plugins
Alpine.plugin(intersect);
Alpine.plugin(persist);
Alpine.plugin(focus);

// Data Store
Alpine.store('articles', articleContents);
Alpine.store('activeArticle', {});

Alpine.store('body', {
  lock: false,

  toggle(this: BodyStore) {
    this.lock = !this.lock;
  }
});

// Components
Alpine.data('header', header);
Alpine.data('hero', hero);
Alpine.data('footer', footer);

// Start Alpine
Alpine.start();
