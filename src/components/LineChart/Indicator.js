import React, { useEffect, useRef } from 'react';
import { timeParse, select, pointer } from 'd3';
import PropsTypes from 'prop-types';

import { Group } from 'src/style/style';

function Indicator({
  right,
  top,
  innerHeight,
  innerWidth,
  selectedYear,
  setSelectedYear,
  xScale,
  isHover,
  onMouseEnter,
  onMouseLeave,
  setXPosition,
}) {
  const gRef = useRef();
  const parseYear = timeParse('%Y');
  const selectedYearData = parseYear(selectedYear);

  useEffect(() => {
    const g = select(gRef.current);

    g.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .merge(g.select('rect'))
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .on('mousemove', e => {
        const x = pointer(e, g.node())[0];
        const hoveredDate = xScale.invert(x);

        setSelectedYear(hoveredDate.getFullYear());
        setXPosition(x);
        onMouseEnter();
      });
  }, []);

  return (
    <Group
      ref={gRef}
      top={top}
      right={right}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {isHover && (
        <line
          y1={0}
          x1={xScale(selectedYearData)}
          x2={xScale(selectedYearData)}
          y2={innerHeight}
          stroke="#9d9d9d"
        />
      )}
    </Group>
  );
}

Indicator.propTypes = {
  right: PropsTypes.number,
  top: PropsTypes.number,
  innerHeight: PropsTypes.number,
  innerWidth: PropsTypes.number,
  selectedYear: PropsTypes.number,
  setSelectedYear: PropsTypes.func,
  xScale: PropsTypes.func,
  isHover: PropsTypes.bool,
  onMouseEnter: PropsTypes.func,
  onMouseLeave: PropsTypes.func,
  setXPosition: PropsTypes.func,
};

export default React.memo(Indicator);
