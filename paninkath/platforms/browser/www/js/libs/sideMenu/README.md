# jquery-slide-plugin
Jquery plugin that slides the menu from top. The menu drops from behind the navbar.

[Demo](http://codepen.io/hjaveed/pen/ORPVaE)

## Usage
```
include jquery (Any Version)
```
```
include slide-from-top.js
```
### Initailise with following parameters
  ```javascript
  $(document).ready(function() {
    $('.mobile-side-menu').slideFromTop({
      menuBtn: $('.toggleMenu'),  // button that opens your menu
      navbar: $('.navbar'),      // nav bar on the top of the menu
      menuSpeed: 500,           // animation speed
      bodyOverlay: $('.overlay') // a modal like overlay to throw on the body
    });
  });
  ````
