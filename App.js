import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [boxPosition, setBoxPosition] = useState({
    x: width / 2 - 50,
    y: height / 2 - 50,
  });
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [coins, setCoins] = useState([
    { id: 1, x: 50, y: 100 },
    { id: 2, x: 100, y: 150 },
    { id: 3, x: 150, y: 200 },
    { id: 4, x: 200, y: 200 },
    { id: 5, x: 250, y: 250 },
    { id: 6, x: 300, y: 300 },
    { id: 7, x: 0, y: 300 },
    { id: 8, x: 0, y: 400 },
    { id: 9, x: 30, y: 500 },
    { id: 10, x: 300, y: 800 },
  ]);

  const onGestureEvent = (event) => {
    setBoxPosition({
      x: event.nativeEvent.translationX + width / 2 - 50,
      y: event.nativeEvent.translationY + height / 2 - 50,
    });
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      checkCollision();
    }
  };

  const checkCollision = () => {
    const remainingCoins = coins.filter((coin) => {
      const distance = Math.sqrt(
        Math.pow(boxPosition.x - coin.x, 2) +
          Math.pow(boxPosition.y - coin.y, 2)
      );

      if (distance < 50) {
        setCollectedCoins(collectedCoins + 1); // Increment collected coins
        return false; // Remove coin from the list
      }

      return true;
    });

    setCoins(remainingCoins); // Update the state with remaining coins
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.scoreText}>Coins Collected: {collectedCoins}</Text>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View
          style={[styles.box, { top: boxPosition.y, left: boxPosition.x }]}
        />
      </PanGestureHandler>

      {coins.map((coin) => (
        <View
          key={coin.id}
          style={[styles.coin, { top: coin.y, left: coin.x }]}
        />
      ))}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fcff",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    position: "absolute",
  },
  coin: {
    width: 30,
    height: 30,
    backgroundColor: "gold",
    borderRadius: 15,
    position: "absolute",
  },
  scoreText: {
    position: "absolute",
    top: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
});
