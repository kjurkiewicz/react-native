import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text} from 'react-native';
import { Constants } from 'expo';
import { noteItems } from './data.js'
import { CheckBox } from 'react-native';



export default class App extends Component {
  
  state = {
    items: noteItems,
    actions: [],
    newtitle: 'Tytuł notatki',
    newnote: 'Co chcesz zrobić?',
    count: 0
  };
  
 /* componentWillMount() {
    AsyncStorage.getItem(textKey).then(items => this.setState({ items }));
  }*/
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.mainTitle}> Moja lista notatek </Text>
        {/* <Text > Count: {this.state.count} </Text> */}
        <FlatList data = {this.state.items} renderItem = {this.renderItem} keyExtractor = { item => item.key.toString() } />
        <View style = {styles.inputContainer}>
          <TextInput
            placeholder="Tytuł notatki"
            returnKeyType="done"
            value={this.state.newtitle}
            onChangeText={this.titleChanged}
            style = {styles.inputs}
          />
          <TextInput
            placeholder="Treść notatki"
            returnKeyType="done"
            value={this.state.newnote}
            onChangeText={this.noteChanged}
            style = {styles.inputs}
          />
          <TouchableOpacity
            onPress={this.saveNote}
            style={styles.touchable}>
            <Text>Dodaj nową notatkę</Text>
        </TouchableOpacity>
        </View>

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

  saveNote = () => (
   // this.increaseCounter(),
    this.setState(state => ({
      items: [
        
        ...state.items,
        {
          title: state.newtitle +' '+ (state.count + 1),
          content: state.newnote,
          key: state.count + 1,
          checked: 0
        }
      
      ],
      newtitle: 'Tytuł notatki',
      newnote: 'Co chcesz zrobić?',
      count: state.count + 1 
    })
  )
  //,AsyncStorage.setItem(textKey, state.items)  
);
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

