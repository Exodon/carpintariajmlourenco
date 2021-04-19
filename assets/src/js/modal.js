//TODO : problem with js model is creating a error
const modal = (function () {

    // Utility : focus loop
    // source : https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
    function focusLoop(modal) {
        // add all the elements inside modal which you want to make focusable
        const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else {
                // if tab key is pressed
                if (document.activeElement === lastFocusableElement) {
                    // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
    }

    // And yet another accessible modal system
    function a11yModalSystem() {
        const modalElement = document.querySelectorAll('[data-js="modal"]');

        if (modalElement) {
            modalElement.forEach((modalWrapper) => {
                const modal = modalWrapper.querySelector("[data-modal]");
                const openBtn = modalWrapper.querySelector("[data-modal-open]");
                const closeBtn = modalWrapper.querySelector("[data-modal-close]");

                // Check if you can add an attribute on a test dialog
                const testdialog = document.createElement("dialog");
                testdialog.setAttribute("open", "");

                if (testdialog.open == true) { // browser supports the dialog element

                    modalWrapper.addEventListener("click", event => {
                        if (event.target == openBtn) {
                            modal.showModal();
                            window.setTimeout(() => {
                                focusLoop(modal);
                            }, 300); // the duration of the animation
                        } else if (event.target == closeBtn || !event.target.closest("#" + modal.id + " [data-modal-content]")) {
                            modal.close();
                            openBtn.focus();
                        }
                    });

                } else { // browser doesn’t support the element

                    // Overlay
                    const overlay = document.createElement("div");
                    overlay.classList.add("modal-overlay");


                    /* ----------
                     * Click handler
                     */
                    modalWrapper.addEventListener("click", event => {
                        if (event.target == openBtn) {
                            modal.setAttribute("open", "");
                            modalWrapper.appendChild(overlay);
                            window.setTimeout(() => {
                                focusLoop(modal);
                            }, 300); // the duration of the animation
                        } else if (event.target == closeBtn || !event.target.closest("#" + modal.id)) {
                            modal.removeAttribute("open");
                            window.setTimeout(() => {
                                modalWrapper.removeChild(overlay);
                            }, 300);
                            openBtn.focus();
                        }
                    });

                    /* ----------
                     * Close dialog if Esc is pressed
                     */
                    document.addEventListener("keydown", (event) => {
                        const escapeKey = 27;

                        if (event.keyCode === escapeKey && modal.hasAttribute("open")) {
                            modal.removeAttribute("open");
                            window.setTimeout(() => {
                                modalWrapper.removeChild(overlay);
                            }, 300);
                            openBtn.focus();
                        }
                    });

                } // ! else
            }); // ! forEach
        } // ! if(modalElement)
    } // ! function a11yModalSystem

    function closeIcon() {
        $('.close-icon').on('click', function () {
            $(this).addClass('clicked');
            // do whatever you want to do
        });
    }

    function closeIconEffect() {
        if (!$(e.target).hasClass('close-icon-container') && $(e.target).closest('.close-icon-container').length == 0) {
            $('.close-icon').removeClass('clicked');
        }
    }

    document.addEventListener("DOMContentLoaded", 
        a11yModalSystem, 
        closeIcon, 
        closeIconEffect
    );
})();

export default modal;