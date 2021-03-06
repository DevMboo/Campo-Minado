import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
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
      won: false,
      lost: false
    }
  }

  onOpenField = ( row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if ( lost ){
      showMines(board)
      Alert.alert('Ops, você perdeu', 'Mais atenção campeão')
    }
    if (won) {
      Alert.alert('Brabo, você ganhou', 'Você é o mestre das peripecias')
    }

    this.setState({ board, lost, won })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Campo minado App game!</Text>
        <Text>Tamanho das minas:
            
            {params.getRowsAmount()}x{params.getColumnsAmount()}

        </Text>

        <View style={ styles.board}> 
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}/>
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
    backgroundColor: '#AAA',
    padding: 20
  }
});
