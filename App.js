import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  state = {
    items: new Array(1).fill(0).map((a, i) => i).map(i => ({
      title: `Notatka ${i}`,
      key: i,
      content: `Kontent notatki ${i}. Treść notatki jest taka jaka jest. Może być nawet trochę dłuższa.`,
    })),
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.items} renderItem={this.renderItem} />
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffe6',
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    marginBottom: 10,
  },
});
