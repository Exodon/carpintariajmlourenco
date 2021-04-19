import navigation from './navigation';

import scroll from './scroll';

import scrollAnimation from './scrollAnimation';

import carousel from './carousel';

import validation from './validation';

import stickyNavigation from './stickyNavigation';

import modal from './modal';

import swiper from './swiper';


(function() {

    const scripts = [
        navigation,
        scroll,
        scrollAnimation,
        carousel,
        validation,
        stickyNavigation,
        modal,
        swiper,
    ];
    
    scripts.forEach(script => script.init());
})();