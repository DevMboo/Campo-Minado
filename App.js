import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard
} from './src/functions'

export default class App extends Component {

  constructor (props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return{
      board: createMinedBoard(rows, cols, this.minesAmount()),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Campo minado App game!</Text>
        <Text>Tamanho das minas:
            
            {params.getRowsAmount()}x{params.getColumnsAmount()}

        </Text>

        <View style={ styles.board}> 
          <MineField board={this.state.board}/>
        </View>

  
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
