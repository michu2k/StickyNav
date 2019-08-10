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
    
    if (!this.classList && typeof module == 'undefined') {
      throw new Error('Sorry, your browser is too old for this script :(');
    }
    
    // Default options
    const options = {
      stickyClass: 'is-sticky', // {string} sticky class
      customBreakPoint: false, // {boolean} enable custom breakpoint for navbar
      breakPointValue: 200, // {number} navbar breakpoint value in pixels
      extraOffset: 0 // {number} add extra offset from the top
    };
    
    let applied = 0;

    // Extend options
    for (const property in properties) {
      options[property] = properties[property];
    }
      
    // Create and add a hidden element to the DOM
    const hiddenEl = document.createElement('div');
    hiddenEl.style.display = 'none';
    this.parentNode.insertBefore(hiddenEl, this);

    /**
     * Toogle sticky
     */
    const toggleSticky = () => {
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
    const addSticky = () => {
      hiddenEl.style.height = `${this.offsetHeight}px`;
      hiddenEl.style.display = 'block';
      this.classList.add(options.stickyClass);
      applied = 1;
    }

    /**
     * Remove sticky class from the element
     */
    const removeSticky = () => {
      hiddenEl.style.display = 'none';
      this.classList.remove(options.stickyClass);
      applied = 0;
    }

    /**
     * Get the offset top value of the element relative to the document
     * @return {number} value = offset value
     */
    const getOffset = () => options.customBreakPoint ? options.breakPointValue : this.offsetTop + options.extraOffset;
    
    let edge = getOffset();

    window.addEventListener('scroll', () => {
      toggleSticky();
    });

    window.addEventListener('resize', () => {
      removeSticky();
      edge = getOffset();
      toggleSticky();
    });
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StickyNav;
  } else {
    window.StickyNav = StickyNav;
  }
})();