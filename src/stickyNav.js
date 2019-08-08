/*!
 * StickyNav v1.0.3
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
  Object.prototype.StickyNav = function(properties) {
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
    for (const property in properties) {
      defaults[property] = properties[property];
    }
        
    const options = defaults;
    const hiddenEl = createHiddenElement();
    let edge = getOffset();
    let applied = 0;

    // Toogle sticky class
    window.addEventListener('scroll', () => {
      toggleSticky();
    });

    // Update offset and toggle sticky
    window.addEventListener('resize', () => {
      removeSticky();
      edge = getOffset();
      toggleSticky();
    });

    /**
     * Toogle sticky
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
     * @return {number} value = offset value
     */
    function getOffset() {
      return options.customBreakPoint ? options.breakPointValue : element.offsetTop + options.extraOffset;
    }

    /**
     * Create and add a hidden element to the DOM
     * @return {object} hidden = created hidden div
     */
    function createHiddenElement() {
      const hidden = document.createElement('div');
      hidden.style.display = 'none';
      element.parentNode.insertBefore(hidden, element);

      return hidden;
    }
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StickyNav;
  } else {
    window.StickyNav = StickyNav;
  }

})();