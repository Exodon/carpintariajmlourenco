const stickyNavigation = (function() {


     let scrollpos = window.scrollY
     const header = document.querySelector('[data-js="header"]');
     const header_height = header.offsetHeight;

     const addClass = () => header.classList.add("is-sticky");
     const removeClass = () => header.classList.remove("is-sticky");

    const scroll = () => {

        scrollpos = window.scrollY;

        if (scrollpos >= header_height) {
            addClass()
        } else {
            removeClass()
        }

        console.log(scrollpos)

    }

    const init = () => {

        //Scroll event
        window.addEventListener('scroll', function () {
            scroll();
        })
    }

    return {
        init
    }
})();

export default stickyNavigation;