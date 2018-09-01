import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity,  TextInput, AsyncStorage} from 'react-native';
import { Constants } from 'expo';
import { noteItems } from './data.js'
import { CheckBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const textKey = 'items';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Moja lista notatek',
  };

  state = {
    items: noteItems,
    actions: [],
    count: 0
  };

  render() {
    return (
      <View style = {styles.container}>
        {/*<Text style = {styles.mainTitle}> Moja lista notatek </Text>
         <Text > Count: {this.state.count} </Text> */}
        <FlatList data = {this.state.items} renderItem = {this.renderItem} keyExtractor = { item => item.key.toString() } />
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Item', this.state.count)}
            style={styles.touchable}>
            <Text>Dodaj nową notatkę</Text>
        </TouchableOpacity>
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
  
class ItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Nowa notatka',
  };

  state = {
    newitem: {
      newtitle: 'Tytuł notatki',
      newnote: 'Co chcesz zrobić?',
      key:  this.props.navigation.getParam('count'),
      checked: 0
    }
  };

  render() {
    return (
      <View style = {styles.inputContainer}>
      <TextInput
        placeholder="Tytuł notatki"
        returnKeyType="done"
        value={this.state.newitem.newtitle}
        onChangeText={this.titleChanged}
        style = {styles.inputs}
      />
      <TextInput
        placeholder="Treść notatki"
        returnKeyType="done"
        value={this.state.newitem.newnote}
        onChangeText={this.noteChanged}
        style = {styles.inputs}
      />
      <TouchableOpacity
        onPress={this.saveNote}
        style={styles.touchable}>
        <Text>Dodaj nową notatkę</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        style={styles.touchable}>
        <Text>Wróć</Text>
      </TouchableOpacity>
   </View>
    );
  }
  titleChanged = text =>
  this.setState(state => ({
    newtitle: text,
    actions: state.actions.concat({
      newtitle: text
    }),
  }));

  noteChanged = text =>
  this.setState(state => ({
    newnote: text,
    actions: state.actions.concat({
      newnote: text
    }),
  }));

  increaseCounter = () => this.setState(({ count }) => ({ count: count + 1 }));

  saveNote = () => (
   // this.increaseCounter(),
    this.setState(state => ({
      newtitle: 'Tytuł notatki',
      newnote: 'Co chcesz zrobić?',
      key: state.key + 1 
    })
    ),
    this.props.navigation.navigate('Home', this.state.newitem)
  ) 
}
  


const Navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Item: {
      screen: ItemScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffe6',
    justifyContent: 'center',

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
   // flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
    marginBottom: 30,
    paddingTop: Constants.statusBarHeight
  },
  inputContainer: {
    margin: 0
  },
  inputs: {
    fontSize: 20,
    margin: 0,
    padding: 10
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 70,
    backgroundColor: '#e6e6cf'
  }
});
