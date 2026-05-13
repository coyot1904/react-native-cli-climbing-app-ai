/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Text as SvgText,
  Circle,
} from 'react-native-svg';
import { Colors } from '../Assets/theme';

interface Props {
  data: number[]; // elevation readings
  progressRatio?: number; // 0–1, how far along the trail
  width?: number;
  height?: number;
}

export function ElevationProfile({
  data,
  progressRatio = 0,
  width = 340,
  height = 100,
}: Props) {
  const padTop = 12;
  const padBottom = 24;
  const padLeft = 36;
  const padRight = 8;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const {
    path,
    progressPath,
    filledPath,
    currentX,
    currentY,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    minElev,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    maxElev,
    ticks,
  } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const pts = data.map((v, i) => ({
      x: padLeft + (i / (data.length - 1)) * chartW,
      y: padTop + (1 - (v - min) / range) * chartH,
    }));

    const toPath = (points: { x: number; y: number }[]) =>
      points.reduce(
        (acc, p, i) =>
          i === 0
            ? `M ${p.x} ${p.y}`
            : `${acc} C ${pts[i - 1].x + (p.x - pts[i - 1].x) / 3} ${
                pts[i - 1].y
              }, ${p.x - (p.x - pts[i - 1].x) / 3} ${p.y}, ${p.x} ${p.y}`,
        '',
      );

    const progressIdx = Math.min(
      Math.floor(progressRatio * (data.length - 1)),
      data.length - 1,
    );
    const progressPts = pts.slice(0, progressIdx + 1);

    const fillClose = `${
      progressPts.length > 0
        ? ` L ${progressPts[progressPts.length - 1].x} ${padTop + chartH} L ${
            pts[0].x
          } ${padTop + chartH} Z`
        : ''
    }`;

    const curPt = pts[progressIdx];

    // Y-axis ticks: 3 labels
    const step = (max - min) / 2;
    const yTicks = [min, min + step, max].map(v => ({
      label: `${Math.round(v)}`,
      y: padTop + (1 - (v - min) / range) * chartH,
    }));

    return {
      path: toPath(pts),
      progressPath: toPath(progressPts),
      filledPath: progressPts.length > 1 ? toPath(progressPts) + fillClose : '',
      currentX: curPt?.x ?? padLeft,
      currentY: curPt?.y ?? padTop,
      minElev: min,
      maxElev: max,
      ticks: yTicks,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, progressRatio, chartW, chartH, padLeft, padTop, padRight]);

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={Colors.primary} stopOpacity="0.02" />
          </LinearGradient>
        </Defs>

        {/* Baseline */}
        <Line
          x1={padLeft}
          y1={padTop + chartH}
          x2={width - padRight}
          y2={padTop + chartH}
          stroke={Colors.gray200 ?? Colors.gray100}
          strokeWidth={0.5}
        />

        {/* Y-axis ticks */}
        {ticks.map((t, i) => (
          <React.Fragment key={i}>
            <Line
              x1={padLeft - 3}
              y1={t.y}
              x2={width - padRight}
              y2={t.y}
              stroke={Colors.gray100}
              strokeWidth={0.5}
              strokeDasharray="3,4"
            />
            <SvgText
              x={padLeft - 5}
              y={t.y + 4}
              fontSize={8}
              fill={Colors.gray500}
              textAnchor="end"
              fontFamily="System"
            >
              {t.label}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Full track (gray) */}
        <Path d={path} fill="none" stroke={Colors.gray300} strokeWidth={1.5} />

        {/* Filled progress area */}
        {filledPath ? <Path d={filledPath} fill="url(#elevGrad)" /> : null}

        {/* Progress track (green) */}
        {progressPath ? (
          <Path
            d={progressPath}
            fill="none"
            stroke={Colors.primary}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ) : null}

        {/* Summit marker */}
        {(() => {
          const maxIdx = data.indexOf(Math.max(...data));
          const sx = padLeft + (maxIdx / (data.length - 1)) * chartW;
          const sy = padTop; // top of chart
          return (
            <>
              <Circle cx={sx} cy={padTop + 0} r={3} fill={Colors.accent} />
              <SvgText
                x={sx}
                y={padTop - 3}
                fontSize={7}
                fill={Colors.accent}
                textAnchor="middle"
                fontFamily="System"
                fontWeight="600"
              >
                ▲
              </SvgText>
            </>
          );
        })()}

        {/* Current position dot */}
        {progressRatio > 0 && (
          <>
            <Circle
              cx={currentX}
              cy={currentY}
              r={6}
              fill={Colors.white}
              opacity={0.5}
            />
            <Circle cx={currentX} cy={currentY} r={4} fill={Colors.white} />
            <Circle cx={currentX} cy={currentY} r={2.5} fill={Colors.primary} />
          </>
        )}

        {/* X-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const x = padLeft + t * chartW;
          const distLabel = (
            (t * (data.length - 1)) /
            (data.length - 1)
          ).toFixed(0);
          // Show actual distance
          const km = (t * 12.4).toFixed(1);
          return (
            <SvgText
              key={i}
              x={x}
              y={height - 4}
              fontSize={8}
              fill={Colors.gray500}
              textAnchor="middle"
              fontFamily="System"
            >
              {km}km
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
