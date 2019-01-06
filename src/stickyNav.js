/*!
 * StickyNav v1.0.1
 * Make the navbar sticky when scrolling the page
 * https://github.com/michu2k/StickyNav
 *
 * Copyright 2019 Michał Strumpf
 * Published under MIT License
 */
(function() {

    'use strict';

    /**
     * Core
     * @param {object} properties = options defined by user
     */
    Object.prototype.stickyNav = function(properties) {
        const element = this;

        // Default options
        const defaults = {
            stickyClass: 'is-sticky', // {string} sticky class
            customBreakPoint: false, // {boolean} enable custom breakpoint for navbar
            breakPointValue: 200, // {number} navbar breakpoint value in pixels
            extraOffset: 0 // {number} add extra offset from the top
        };

        if (!element.classList) {
            throw new Error('Sorry, looks like your browser is too old for this script :(');
        }

        // Extend options 
        let options = extendDefaults(defaults, properties);
        
        let hiddenEl = createHiddenElement();
        let edge = getOffset();
        let applied = 0;

        // On scroll
        // Toogle sticky class
        window.addEventListener('scroll', () => {
            toggleSticky();
        });

        // On resize
        // Update offset and toggle sticky
        window.addEventListener('resize', () => {
            removeSticky();
            edge = getOffset();
            toggleSticky();
        });

        /**
         * Toogle sticky functions
         */
        function toggleSticky() {
            if (!applied) {
                if (window.pageYOffset >= edge) {
                    addSticky();
                }
            } else {
                if (window.pageYOffset <= edge) {
                    removeSticky();
                }
            }
        }

        /**
         * Add sticky class to the element
         */
        function addSticky() {
            hiddenEl.style.height = `${element.offsetHeight}px`;
            hiddenEl.style.display = 'block';
            element.classList.add(options.stickyClass);
            applied = 1;
        }

        /**
         * Remove sticky class from the element
         */
        function removeSticky() {
            hiddenEl.style.display = 'none';
            element.classList.remove(options.stickyClass);
            applied = 0;
        }

        /**
         * Get the offset top value of the element relative to the document
         * @return {number} offset = offset value
         */
        function getOffset() {
            let offset = element.offsetTop + options.extraOffset;

            // Custom breakpoint
            if (options.customBreakPoint) {
                offset = options.breakPointValue;
            }

            return offset;
        }

        /**
         * Create and add a hidden element to the DOM
         * @return {object} hidden = created hidden div
         */
        function createHiddenElement() {
            let hidden = document.createElement('div');
            hidden.style.display = 'none';
            element.parentNode.insertBefore(hidden, element);

            return hidden;
        }

        /** 
         * Extend defaults
         * @param {object} defaults = defaults options defined in script
         * @param {object} properties = options defined by user
         * @return {object} defaults = modified options
         */
        function extendDefaults(defaults, properties) {
           if (properties != null && properties !== undefined) {
               for (let property in properties) {
                   defaults[property] = properties[property];
               }
           }

           return defaults; 
        }
    };

    window.stickyNav = stickyNav;

})();