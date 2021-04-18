import navigation from './navigation';

import scroll from './scroll';

import scrollAnimation from './scrollAnimation';

import carousel from './carousel';

import validation from './validation';

import stickyNavigation from './stickyNavigation';

(function() {

    const scripts = [
        navigation,
        scroll,
        scrollAnimation,
        carousel,
        validation,
        stickyNavigation
    ];
    
    scripts.forEach(script => script.init());
})();