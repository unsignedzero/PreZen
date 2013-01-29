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

Included is a sample slide that I will use.

Created by unsignedzero and started on 01-25-2013 as an idea.

# TO DO #
### PreZEN #

* Move common functions so they are created outside of PreZen
* Jump to a specific slide/segment
* Allow the user to hide the buttons

# Version/Changelog #

* .gitignore Added
* License Added

### 0.3.0.0 [01-29-2012] #

* Initial github Push
* Created README.md file
* Bugfix, can't go back to the first slide

### 0.2.0.0 [01-27-2012] #

* Added Jwerty Library so user can control slides via arrow keys
* Created API so external libraries/user can control PreZen on the outside
* Refactored redundant code across slides and PreZen
* Common functions to all slides can be added to PreZen once, rather 
  than per slide via supportFunc
* Similar common CONSTANTS and values can be added to setObj, which will
  make it common to all slides

### 0.1.0.0 [01-26-2012] #

* PreZen supports multiple slides
* Factored code for drawing UI
* One can transition between slides and parts of a slide now
* Modified so now it can support an arbitrary amount of layers

### 0.0.0.0 [01-25-2012] #

* External changes can be made in settings.js
* Only works with one slide
* Initial UI, with left and right buttons created
* Fade animations for slides created
* Basic idea formed and concept created.
