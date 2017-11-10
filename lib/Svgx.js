import PropTypes from 'prop-types';
import React from 'react';

const supportedTagTypes = [
  'LinearGradient',
  'RadialGradient',
  'Polyline',
  'Polygon',
  'Ellipse',
  'Circle',
  'Symbol',
  'Line',
  'Path',
  'Rect',
  'Text',
  'Defs',
  'Stop',
  'Use',
  'G',
];

const renderSvgChilds = (Svg, childs) => {
  return childs.map((child, i) => {
    if(!supportedTagTypes.includes(child.type)) return null;

    let Node = Svg[child.type];

    return (
      <Node {...child.attrs} key={i}>
        { child.childs && child.childs.length ? renderSvgChilds(Svg, child.childs) : null }
      </Node>
    );
  });
};

const renderSvg = (Svg, data, styles) => {
  // invalid Svg definition
  if(!Svg || !data || !data.type || data.type !== 'Svg') return null;

  // Svg props
  const svgProps = data.attrs || {};
  if (styles.width) svgProps.width = styles.width;
  if (styles.height) svgProps.height = styles.height;

  return (
    <Svg {...svgProps}>
      {renderSvgChilds(Svg, data.childs)}
    </Svg>
  );
};

const Svgx = props => {
  const { component:Svg, data, styles = {} } = props;

  if (!Svg || !data) return null;
  if (!data) console.log('- missing data object');
  if (!Svg) console.log('- you must provide the base Svg component, react-native-svg or expo');

  return renderSvg(Svg, data, styles);
}

Svgx.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

export { Svgx };
