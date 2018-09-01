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

  onAdd = newitem => {
    this.setState(state => ({
      items: [       
         ...state.items,
         {
           title: newitem.newtitle,
           content: newitem.newnote,
           key: state.count + 1,
           checked: 0
         }
       
       ]
     }))
  }

  state = {
    items: noteItems,
    actions: [],
    count: 0
  };


  render() {
    return (
      <View style = {styles.container}>
        <FlatList data = {this.state.items} renderItem = {this.renderItem} keyExtractor = { item => item.key.toString() } />
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Item', {count: this.state.count, onAdd: this.onAdd})}
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

  increaseCounter = () => this.setState(({ count }) => ({ count: count + 1 }));

}
  
class ItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Nowa notatka',
  };

  state = {
    newitem: {
      newtitle: 'Tytuł notatki',
      newnote: 'Co chcesz zrobić?'
    },
    actions: []
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
    newitem: {
      newtitle: text,
      newnote: state.newitem.newnote
    },
    actions: state.actions.concat({
      newtitle: text
    }),
  }));

  noteChanged = text =>
  this.setState(state => ({
    newitem: {
      newtitle: state.newitem.newtitle,
      newnote: text
    },
    actions: state.actions.concat({
      newnote: text
    }),
  }));


  saveNote = () => {
    this.setState(state => ({
      newitem: {
        newtitle: state.newitem.newtitle,
        newnote: state.newitem.newnote
    }}), () => {

      this.props.navigation.getParam('onAdd')(this.state.newitem)
      this.props.navigation.navigate('Home')
    })
  }
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
