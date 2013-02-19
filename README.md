# PreZen JS #

PreZen is a PowerPoint-like code library that allows one to code up a 
presentation rather than drag and drop it. Its main use is to allow one to
code up demos and use them inside a presentation rather than take many
images of the animation and combine them together. As a plus side,
this is built on Javascript so it will load on mostly all modern browsers
that can run the KineticJS library.

Unlike gojs, this is closer, at the time of writing, to a WIP than a polished
product. This means that for example settings.js might be changed or removed
so be prepared for that, although I doubt it will be drastic.

If one codes it up using relative values,as positions for all the content,
then it can potentially scale up, if done correctly.

In addition, I have left function calls so that one doesn't have to click on
the arrows keys to advance forward to go back to the previous slide. Jwerty
is used in the background, see main.js to read inputs from the keyboard.
As of now, this is fixed but might be changeable in the future.

Included is a sample slide that I will use.

Created by unsignedzero and started on 01-25-2013 as an idea.

# TO DO #
### PreZEN #

* Move common functions so they are created outside of PreZen
* Jump to a specific slide/segment
* Allow the user to hide the buttons

# Version/Changelog #

### 0.4.0.0 [02-18-2013] #

* Can be accessed via mouse or keyboard key N
* Added a message box on the bottom on the screen
* Refactored code so that the button interface is separate from background
* Added to readme Jwerty info
* Simplified the passing of settings into PreZen
* Bugfix, slide number disappear when resizing
* Added Plasma into the slides
* Added Slide Count

### 0.3.1.1 [02-03-2013] #

* Bezier Curve Demo works on mobile devices
* Mobile Support Added, buttons always visible on mobile support
* .gitignore Added
* License Added

### 0.3.1.0 [02-01-2013] #

* Major portion of presentation completed
* Resize Buttons and button added
* Fixed year typo in README

### 0.3.0.0 [01-29-2013] #

* Initial github Push
* Created README.md file
* Bugfix, can't go back to the first slide

### 0.2.0.0 [01-27-2013] #

* Added Jwerty Library so user can control slides via arrow keys
* Created API so external libraries/user can control PreZen on the outside
* Refactored redundant code across slides and PreZen
* Common functions to all slides can be added to PreZen once, rather 
  than per slide via supportFunc
* Similar common CONSTANTS and values can be added to setObj, which will
  make it common to all slides

### 0.1.0.0 [01-26-2013] #

* PreZen supports multiple slides
* Factored code for drawing UI
* One can transition between slides and parts of a slide now
* Modified so now it can support an arbitrary amount of layers

### 0.0.0.0 [01-25-2013] #

* External changes can be made in settings.js
* Only works with one slide
* Initial UI, with left and right buttons created
* Fade animations for slides created
* Basic idea formed and concept created.
