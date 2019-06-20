# StickyNav
Make the navbar sticky when scrolling the page <br>
Browsers support: All modern browsers, Internet Explorer 11

## Version
1.0.2

## Installation

###### npm
```
npm install stickynav-js
```

###### Github
You can also download files from github.

## Usage
On production use JS files only from **dist/** folder

###### 1. Include script
```html
<script src="stickyNav.min.js"></script>  
```

###### 2. Add sticky class in your CSS
You can change your class name by changing `stickyClass` option 

```css
.your-navbar.is-sticky {
    top: 0;
    z-index: 10;
    position: fixed;
    /*...*/
}
```

###### 3. Initialize the module

```javascript
<script>
    var menu = document.getElementById('navbar');
    menu.stickyNav();
</script>
```

## API

###### Example
yourElement.stickyNav(options)

* options - object (optional), script options

```javascript
<script>
    // Get your element
    var menu = document.getElementById('navbar');
    
    // Pass options
    menu.stickyNav({
        stickyClass: 'is-sticky'
    });
</script>
```

###### Options

| Option  | Type | Default value | Description |
| ----- | ----- | ----- | ----- |
| stickyClass | string | 'is-sticky' | Sticky class |
| customBreakPoint | boolean | false | Enable custom breakpoint for navbar |
| breakPointValue | number | 200 | Navbar breakpoint value in pixels |
| extraOffset | number | 0 | Add extra offset from the top |
