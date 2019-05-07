# rivet-reading-progress-bar

Applying this class to an element will add a progress bar showing reading progress (how much is left to scroll).

```
<!-- When the target element is in relation to the the scrolling of the full window. -->
<div class="rvt-reading-progress">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et tellus fermentum, volutpat urna sed, congue lectus. Aliquam cursus vehicula nunc, sit amet volutpat massa consectetur eu. Donec consectetur magna vel eros vehicula pellentesque. Morbi neque lacus, vehicula vitae nunc sed, iaculis molestie risus. Mauris congue neque a semper commodo. Sed quis quam vitae massa convallis volutpat eu non turpis. Etiam non neque porttitor, laoreet lacus ornare, dictum purus. Vestibulum volutpat vestibulum leo vitae tincidunt. Aenean ante mauris, vehicula id vehicula eget, laoreet facilisis urna. Vivamus dignissim condimentum feugiat.</p>
  <p>Quisque imperdiet fermentum quam vitae mollis. Donec eget quam augue. Ut non lobortis sem, non malesuada sapien. Pellentesque bibendum elementum quam pretium sodales. Suspendisse porta purus massa, vitae consequat urna viverra eget. Aliquam eget diam ex. Fusce condimentum laoreet justo efficitur laoreet. Cras vitae faucibus nulla, ut faucibus libero. Ut erat dui, porta ut vulputate sed, convallis quis velit. Ut nec sapien sit amet erat fermentum venenatis at a arcu. Praesent vel orci eu lacus elementum volutpat. Aliquam semper diam sed massa dapibus eleifend. Etiam id arcu ut nunc dapibus molestie vitae at mi. Quisque dictum, augue vitae tincidunt posuere, magna urna tristique urna, quis fringilla ex est vitae nisl. Integer laoreet odio a maximus tempor.</p>
</div>

<!-- When the target element is contained in a smaller element that scrolls. -->
<div class="rvt-reading-progress-container" style="height: 200px; overflow-y: scroll;">
  <div class="rvt-reading-progress">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et tellus fermentum, volutpat urna sed, congue lectus. Aliquam cursus vehicula nunc, sit amet volutpat massa consectetur eu. Donec consectetur magna vel eros vehicula pellentesque. Morbi neque lacus, vehicula vitae nunc sed, iaculis molestie risus. Mauris congue neque a semper commodo. Sed quis quam vitae massa convallis volutpat eu non turpis. Etiam non neque porttitor, laoreet lacus ornare, dictum purus. Vestibulum volutpat vestibulum leo vitae tincidunt. Aenean ante mauris, vehicula id vehicula eget, laoreet facilisis urna. Vivamus dignissim condimentum feugiat.</p>
    <p>Quisque imperdiet fermentum quam vitae mollis. Donec eget quam augue. Ut non lobortis sem, non malesuada sapien. Pellentesque bibendum elementum quam pretium sodales. Suspendisse porta purus massa, vitae consequat urna viverra eget. Aliquam eget diam ex. Fusce condimentum laoreet justo efficitur laoreet. Cras vitae faucibus nulla, ut faucibus libero. Ut erat dui, porta ut vulputate sed, convallis quis velit. Ut nec sapien sit amet erat fermentum venenatis at a arcu. Praesent vel orci eu lacus elementum volutpat. Aliquam semper diam sed massa dapibus eleifend. Etiam id arcu ut nunc dapibus molestie vitae at mi. Quisque dictum, augue vitae tincidunt posuere, magna urna tristique urna, quis fringilla ex est vitae nisl. Integer laoreet odio a maximus tempor.</p>
  </div>
</div>
```

## When to use

* When dealing with longer text or a longer feature page to give your user some sort of context about where they are in the larger document.

## When to consider something else

* When not dealing with long text or a long feature page, you may not need to add this feature.

## Accessibility

Invisible text is placed in the progress bar that tells the user what percentage of the article they have read. It also adds this text as a tooltip on the progress bar.

## Implementation notes

There are two ways to implement the progress bar depending on your scenario.
1. **Your target element is measured in relation to the scrolling of the window.**

⋅⋅⋅Add the class `rvt-reading-progress` to your target element. If this class is present on the page, function `Constructor.prototype.init` will add the necessary progress bar to the end of body:

⋅⋅⋅```<div class="rvt-progress-container" id="progress-bar" title=""><div class="rvt-progress-bar" id="reader-progress"></div></div>```

⋅⋅⋅If your target element has a greater height than your browser window, the scroll progress will be measured from when the top of the target leaves the top of the window to when the bottom of the element enters the bottom of the window. The purpose of this is so that if you're targeting an element that is basically the size of the whole page, your progress bar will reach 100% when you reach the bottom of the page.

⋅⋅⋅If your target element has a lesser height than your browser window, the scroll progress will be measured from when the top of the target leaves the top of the window to when the bottom of the target element leaves the top of window.

2. **Your target element is measured in relation to the scrolling of an element other than the window.**

⋅⋅⋅Add the class `rvt-reading-progress` to your target element and the class `rvt-reading-progress-container` to the container element. If class `rvt-reading-progress` is present on the page, function `Constructor.prototype.init` will add the necessary progress bar to the end of your container:

⋅⋅⋅```<div class="rvt-progress-container" id="progress-bar" title=""><div class="rvt-progress-bar" id="reader-progress"></div></div>```

At this time, you can only have one instance of `rvt-reading-progress` on your page.