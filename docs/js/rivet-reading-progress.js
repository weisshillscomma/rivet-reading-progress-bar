/**
 * If your add-on requires JavaScript, add it to this file.
 * Rivet add-on JavaScript follows the vanilla JS constructor pattern:
 *
 * https://vanillajstoolkit.com/boilerplates/constructor/
 * 
 * If your new component is purely HTML and CSS, you can delete this file
 * and any references to it in index.html.
 */

const MyComponent = (function() {
  
  'use strict';

  /**
   * This is your add-on's constructor method. This method is called when
   * you create a new instance of your component and can take any arguments
   * you need to set it up, such as a DOM element selector.
   * 
   * const component = new MyComponent(arg1, arg2, etc);
   * 
   * The example constructor below takes a selector argument that tells the
   * component which DOM elements it should apply its behavior to — in this
   * case, button elements that can be clicked to show a message.
   * 
   * const component = new MyComponent('button.rvt-fancy-button');
   */
  
  const Constructor = function(selector) {
    this.nodes = document.querySelectorAll(selector);

    // Any other code you need to initialize your component goes here.
  };

  /**
   * Use the space below to write your component's private methods.
   * These methods can't be called directly by someone using your add-on;
   * typically, these private methods are used as event handler functions.
   * 
   * The example private method acts as an event handler for the component's
   * click events, showing a message when one of the button elements specified
   * in the constructor method above are clicked.
   */

  const windowScrolling = function() {
    // Do something useful.

    let target = document.querySelector ( '.rvt-reading-progress' );
    let progressBar = document.querySelector ( '#reader-progress' );

    var targetPosition = target.getBoundingClientRect();
    var targetHeight = target.offsetHeight;
    var windowHeight = window.innerHeight;

    // Check if the target element is taller or shorter than the window height //
    if(targetHeight < windowHeight) {
      // Target element is shorter than window height. Scroll progress should be measured from when the top of the target leaves the top of the window to when the bottom of the target element leaves the top of the window. //
      if(targetPosition.top < 0 && targetPosition.bottom > 0){
        var percentScrolled = ((targetHeight - targetPosition.bottom) / targetHeight) * 100;
        progressBar.style.width = percentScrolled + "%";
        progressBar.title = "You have read " + Math.round(percentScrolled) + "%.";
        document.querySelector('#progress-bar').title = "You have read " + Math.round(percentScrolled) + "%.";
        progressBar.innerHTML = "You have read " + Math.round(percentScrolled) + "%.";
      } else if(targetPosition.top > 0){
        progressBar.style.width = "0%";
        progressBar.title = "You have read 0%.";
        document.querySelector('#progress-bar').title = "You have read 0%.";
        progressBar.innerHTML = "You have read 0%.";
      } else if(targetPosition.bottom < 0){
        progressBar.style.width = "100%";
        progressBar.title = "You have read 100%.";
        document.querySelector('#progress-bar').title = "You have read 100%.";
        progressBar.innerHTML = "You have read 100%.";
      }
    } else {
      // Target element is taller than the window height. Scroll progress should be measured from when the top of the target leaves the top of the window to when the bottom of the element enters the bottom of the window. //
      var scrollTop = window.pageYOffset;
      var positionTopDifference = (targetPosition.top + scrollTop);
      var positionBottomDifference = (targetPosition.bottom + scrollTop) - targetHeight;

      var totalScroll = (targetHeight - windowHeight - positionTopDifference + positionBottomDifference);
      var percentScrolled = (scrollTop - positionTopDifference) / totalScroll * 100;

      if(targetPosition.top < 0 && targetPosition.bottom > 0){
        progressBar.style.width = percentScrolled + "%";
        progressBar.title = "You have read " + Math.round(percentScrolled) + "%.";
        document.querySelector('#progress-bar').title = "You have read " + Math.round(percentScrolled) + "%.";
        progressBar.innerHTML = "You have read " + Math.round(percentScrolled) + "%.";
      } else if(targetPosition.top > 0){
        progressBar.style.width = "0%";
        progressBar.title = "You have read 0%.";
        document.querySelector('#progress-bar').title = "You have read 0%.";
        progressBar.innerHTML = "You have read 0%.";
      } else if(targetPosition.bottom < 0){
        progressBar.style.width = "100%";
        progressBar.title = "You have read 100%.";
        document.querySelector('#progress-bar').title = "You have read 100%.";
        progressBar.innerHTML = "You have read 100%.";
      }
    }

  }

  const containerScrolling = function() {
    // Do something useful.

    let container = document.querySelector('.rvt-reading-progress-container');
    let target = document.querySelector ( '.rvt-reading-progress' );
    let progressBarContainer = document.querySelector ( '.rvt-progress-container' );
    let progressBar = document.querySelector ( '#reader-progress' );
    
    var scrollTop = container.scrollTop;

    var targetPosition = target.getBoundingClientRect();
    var containerPosition = container.getBoundingClientRect();
    var positionTopDifference = (targetPosition.top + scrollTop) - containerPosition.top;
    var positionBottomDifference = (targetPosition.bottom + scrollTop) - containerPosition.bottom;

    var totalScroll = (positionBottomDifference + positionTopDifference);
    var percentScrolled = scrollTop / totalScroll * 100;

    progressBarContainer.style.top = scrollTop + 'px';
    progressBar.style.width = percentScrolled + "%";
    progressBar.title = "You have read " + Math.round(percentScrolled) + "%.";
    document.querySelector('#progress-bar').title = "You have read " + Math.round(percentScrolled) + "%.";
    progressBar.innerHTML = "You have read " + Math.round(percentScrolled) + "%.";

  }

  /**
   * Use the space below to write your component's public methods.
   * These methods are called by the developer and should be described in your
   * add-on's documentation.
   * 
   * The example public method when called adds an event listener to the button
   * elements specified in the component's constructor method. This event
   * listener calls the handleClick private method defined above.
   */

  Constructor.prototype.init = function() {
    
    let target = document.querySelector('.rvt-reading-progress');
    if(target){
      var progressBar = '<div class="rvt-progress-container" id="progress-bar" title=""><div class="rvt-progress-bar" id="reader-progress"></div></div>';
      // Check if reading is contained in a scrolling div //
      let container = document.querySelector('.rvt-reading-progress-container');
      if(container){
        // Reading is contained in a scrolling div. Add progressBar to that container. //
        container.innerHTML += progressBar;
        container.addEventListener('scroll', containerScrolling);
      } else {
        // Reading is not contained in a scrolling div. Add progressBar to body. //
        let container = document.querySelector ( 'body' );  
        container.innerHTML += progressBar;
        window.addEventListener('scroll', windowScrolling);
      }
    }

  };

  return Constructor;

})();