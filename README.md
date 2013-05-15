# PreZen JS #

PreZen is a PowerPoint-like code library that allows one to code up a 
presentation rather than drag and drop it. Its main use is to allow one to
code up demos and use them inside a browser rather than take many
images of the animation and combine them together. As a plus side,
this is built on Javascript so it will load on mostly all modern browsers
that can run the KineticJS library.

Eventually the slides will be updated to use generators to make it easier
to create codes. (In progress). With this update, creating slides will
be much easier.

If one codes it up using relative values, as positions for all the content,
then it can potentially scale up and work on any display size, 
if done correctly.

In addition, I have left function calls so that one doesn't have to click on
the arrows keys to advance forward to go back to the previous slide. Jwerty
is used in the background, see main.js, to read inputs from the keyboard.
As of now, this is fixed but might be changeable in the future. Similarly, one
can also resize and show "notes" on a slide via the keyboard.

Included is a sample slide that I have used for my presentation in my
Electrical Engineering Colloquium Class, as of 04-28-2013.

Created by unsignedzero and started on 01-25-2013 as an idea.

# TO DO #
### PreZEN #

* Add speaker notes on the slide
* Add button/key to jump to a specific slide/segment
* Reduce the number of variables in each slide to the bare necessities , if possible

# Version/Changelog #

* Goal, apply the generator to all slides

* Corrected the dates for the README.

## 0.6.0.0 Beta 4 [05-15-2013] #

* Part 4 of the slides are converted to use generators
* Added override option for bullets
* Removed unused function in generator code base

## 0.6.0.0 Beta 3 [05-15-2013] #
### Generator Branch #

* Fixed indent mismatch in generators part of PreZen
* Macros created to help automate process
* Part 3 of the slides are converted to use generators
* Additional default settings added to initial state object
* Created additional default profile states that can be used

## 0.6.0.0 Beta 2 [05-15-2013] #
### Generator Branch #

* Updated PreZen slides file and settings to simply the creation of slides 
  It is passed an array, rather than pushing elements on it. One less global
  variable needed.
* Part 2 of the slides are converted to use generators
* Additional usage options added to image generator
* Additional control options added to text generator

## 0.6.0.0 Beta 1 [05-08-2013] #
### Generator Branch #

* The intro and part 1 of the slides are converted to use generators now
* Generators being tested as slides are being created
* Added use strict to more functions used in the PreZen code base
* Generators tested and implemented. (Now in Beta)
* Added more functional to the generators, debug passing option, firstCall
  no shift option, etc.
* Removed experiment branch files that was mixed into development

## 0.5.1.0 [04-05-2013] #

* Removed extra global variables once they are used
* Supports Chrome Version 26.X which broke on 04-27-2013
* Updated PreZen to support KineticJS 4.4 Library.
  Transitions between pages are faster but the last animation in Firefox
  appears to be slower
* Updated slides for class by fixing typos and other graphical errors

## 0.5.0.0 [03-03-2013] #
* Unified comments across js files to easier reading
* Factored out supportFunc so users can define their own functions
  local to their slides but also be able to use pre-defined functions
* Adding use strict to some code and fixed bugs created by that
* Slowly formatting code to make it easier to read and make it
  uniform

## 0.4.1.0 [02-28-2013] #
* Stable release
* Fixed while loop issues because of removing ++ due to JSlint
* Removed bitshift operators and replaced with division/multiplication
* Cleaned up code warnings defined by JSlint
* Created and set basic JSlint test
* Fixed typos in slide
* Fixed typo
* Updated Screen Comparison to match the slide deck
* Cleaned up code and comments
* Bugfix, corners of msgBox not shown when collapsed
* Bugfix, when preforming global animations, buttons not stuck in "hover"

### 0.4.0.1 [02-18-2013] #

* Debug Messages can be sent in from the outside
* Debug Layer fades on mouse over
* Debug Layer added

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
