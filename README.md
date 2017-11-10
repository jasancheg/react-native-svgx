# react-native-svgx 

[![npm version](https://badge.fury.io/js/react-native-svgx.svg)](https://npmjs.org/package/react-native-svgx) [![Dependency Status](https://img.shields.io/david/jasancheg/react-native-svgx.svg?style=flat)](https://david-dm.org/jasancheg/react-native-svgx)

> Work in progress, the component is not ready,
> - currently renders the received image definition
> - currently accepts the width and height values
> - Pending custom styles for items by id
> - Wanted: api for animation
> - Note: This is a component that I have recently needed in one of my projects, however little effort has been made in the development, but it is expected to be completed soon.


Smart `svg` component for React Native. Render `svg` from `json` definition.

# Features

- `react-native-svgx` is a wrapper for [Expo.Svg()](https://docs.expo.io/versions/latest/sdk/svg.html) or [react-native-svg](https://www.npmjs.com/package/react-native-svg).

# Notes
- For convert svg files to valid json we use [react-native-prepare-svg](https://www.npmjs.com/package/react-native-prepare-svg).


### Installation

```sh
  npm install --save react-native-svgx
```


## Usage
See the Example app

```javascript

// Svgx is a wrapper for Expo.Svg or Svg from react-native-svg
// you should provide the component for your type of project
// e.g: import { Svg } from 'react-native-svg'; or:
import { Svg, Constants } from 'expo';
import { Svgx } from 'svgx';

// the Svg definition of the wanted image
import { checkmark } from '../icons/iconsLib.json';

function Example() {
  const svgStyles = {
    // change the default image fill or color of the shapes
    color: '#FFFFFF',
    // change the default image size
    height: 38,
    width: 38,
    // it supports specific styles for each shape 
    // in the image by usign the element id
    'checkmark-path': {
      fill: '#000000'
    },
    'circle-path': {
      fill: '#222222'
    }
  };

  return (
    <Svgx
      component={Svg},
      data={checkmark},
      styles: {svgStyles} />
  );
}
```


### License

MIT © [Jose Antonio Sanchez](https://tonisan.com)


