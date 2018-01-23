import PropTypes from 'prop-types';
import React from 'react';

const { log } = console;
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

const renderSvgChilds = (Svg, childs, styles) => {
  return childs.map((child, i) => {
    // don't render if not supported tag type
    if (!supportedTagTypes.includes(child.type)) return null;

    let Node = Svg[child.type];
    let currentAttrs = { ...child.attrs };

    // apply custom styles
    if (currentAttrs.id && styles[currentAttrs.id]) {
      currentAttrs = Object.assign(currentAttrs, styles[currentAttrs.id]);
    }

    // don't render hidden elements
    if (currentAttrs.display === 'none') return null;

    return (
      <Node {...currentAttrs} key={i}>
        { child.childs && child.childs.length ? renderSvgChilds(Svg, child.childs, styles) : null }
      </Node>
    );
  });
};

const renderSvg = (Svg, data, styles) => {
  // avoid render on invalid Svg definition
  if (!Svg || !data || !data.type || data.type !== 'Svg') return null;

  // Svg props
  const svgProps = data.attrs || {};
  // overwrite height and width if provided
  if (styles.width) svgProps.width = styles.width;
  if (styles.height) svgProps.height = styles.height;

  return (
    <Svg {...svgProps}>
      {renderSvgChilds(Svg, data.childs, styles)}
    </Svg>
  );
};

const Svgx = (props) => {
  const { component: Svg, data, styles = {} } = props;

  if (!Svg || !data) return null;
  if (!data) log('- missing data object');
  if (!Svg) log('- you must provide the base Svg component, react-native-svg or expo');

  return renderSvg(Svg, data, styles);
};

Svgx.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

// expected more apis
export { Svgx };

export default Svgx;
