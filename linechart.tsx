import React, { FC } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { GraphData } from "./types";
import { G, Line, Path, Svg } from "react-native-svg";

type LineChartProps = {
  height: number;
  width: number;
  data: GraphData[];
  leftPadding: number;
  bottomPadding: number;
  title: string;
};

export const LineChart: FC<LineChartProps> = ({
  height,
  width,
  data,
  bottomPadding,
  title,
  leftPadding,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.titleText}>0</Text>
      </View>
      <View style={styles.chartContainer}>
        <Svg width={width} height={height} stroke="#6231ff">
          <Line
            x1={leftPadding}
            y1={height}
            x2={width}
            y2={height}
            stroke={"#d7d7d7"}
            strokeWidth="1"
          />
          <Line
            x1={leftPadding}
            y1={height * 0.6}
            x2={width}
            y2={height * 0.6}
            stroke={"#d7d7d7"}
            strokeWidth="1"
          />
          <Line
            x1={leftPadding}
            y1={height * 0.2}
            x2={width}
            y2={height * 0.2}
            stroke={"#d7d7d7"}
            strokeWidth="1"
          />
          <Path d={data[0].curve} strokeWidth="2" />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
