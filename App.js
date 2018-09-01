import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, CheckBox } from 'react-native';
import { Constants } from 'expo';
import { noteItems } from './data.js'

export default class App extends Component {
  state = {
    items: noteItems,
  };

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.mainTitle}> Moja lista notatek </Text>
        <FlatList data = {this.state.items} renderItem = {this.renderItem} keyExtractor = { item => item.key.toString() } />
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <CheckBox
          title="Done"
          checked={item.checked}
          onPress={() => this.setState({ checked: !item.checked })}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffe6'

  },
  item: {
    paddingHorizontal: 5
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 22
  },
  content: {
    marginBottom: 10,
    fontSize: 20
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
   
    margin: 0,
    marginBottom: 30,
    paddingTop: Constants.statusBarHeight
  }
});
