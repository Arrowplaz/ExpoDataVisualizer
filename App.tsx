import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { DataPoint, GraphData } from "./types";
import { LineChart } from "./linechart";

const { width } = Dimensions.get("screen");

const CARD_WIDTH = width - 20;
const GRAPH_WIDTH = CARD_WIDTH - 60;
const CARD_HEIGHT = 325;
const GRAPH_HEIGHT = 200;

export const revenueData: DataPoint[] = [
  { date: "2022-08-27T07:07:43.408Z", value: 240 },
  { date: "2022-08-28T06:28:50.457Z", value: 128 },
  { date: "2022-08-24T19:07:50.664Z", value: 38 },
  { date: "2022-08-31T23:47:36.113Z", value: 49 },
  { date: "2022-08-29T08:37:55.880Z", value: 3 },
  { date: "2022-08-27T21:07:43.338Z", value: 255 },
  { date: "2022-08-25T23:49:55.690Z", value: 72 },
  { date: "2022-08-25T18:31:27.760Z", value: 42 },
];

export const listingData: DataPoint[] = [
  { date: "022-08-27T09:20:23.488Z", value: 4 },
  { date: "2022-08-30T17:23:24.948Z", value: 5 },
  { date: "2022-08-24T19:10:17.918Z", value: 2 },
  { date: "2022-08-23T23:53:34.907Z", value: 4 },
  { date: "2022-09-02T05:37:25.119Z", value: 1 },
  { date: "2022-08-27T18:30:07.351Z", value: 3 },
  { date: "2022-09-01T10:33:49.912Z", value: 4 },
];

const makeGraph = (data: DataPoint[]): GraphData => {
  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));

  const y = scaleLinear().domain([0, max]).range([350, 35]);
  const x = scaleTime()
    .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
    .range([10, 350 - 10]);

  const curvedLine = line<DataPoint>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  return {
    max,
    min,
    curve: curvedLine!,
  };
};

const revenueGraphData: GraphData[] = [makeGraph(revenueData)];
const listingGraphData: GraphData[] = [makeGraph(listingData)];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.graphCard}>
        <LineChart
          bottomPadding={20}
          data={revenueGraphData}
          height={GRAPH_HEIGHT}
          leftPadding={0}
          width={GRAPH_WIDTH}
          title="Revenue"
        />
      </View>

      <View style={styles.graphCard}>
        <LineChart
          bottomPadding={20}
          data={listingGraphData}
          height={GRAPH_HEIGHT}
          leftPadding={0}
          width={GRAPH_WIDTH}
          title="Listings Sold"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
