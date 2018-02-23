import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, TextInput} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellLimit: 0
    }
  }

  /**
   * Function to enter the number of cells in the array
   */
  enterLimit = (text) => {
    let value = text ? text : 0;
    let reg = new RegExp('^[0-9]+$');
    if (reg.test(value)) {
      let number = parseInt(value);
      this.setState({cellLimit: number})
    } else {
      alert('not a valid number');
      this.setState({cellLimit: 0});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          keyboardType="numeric"
          value={this.state.cellLimit.toString()}
          onChangeText={this.enterLimit}
        />
        <DisplayBlocks cellLimit={this.state.cellLimit}/>
      </View>
    )
  }
}

class DisplayBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Function to get the array of elements according to the cell number
   */
  getResultArray = (number) => {
    let increment = 0;
    let result = 1;
    let resultArray = number > 0 ? [50] : [];
    for (let i = 0; number !== resultArray.length; i++) {
      resultArray.push(100);
      increment = increment + 2;
      result = result + increment;
      for (let j = 0; j < result; j++) {
        if (number === resultArray.length) {
          break;
        } else {
          resultArray.push(50);
        }
      }
    }
    return resultArray;
  };

  componentWillMount() {
    this.state.arr = this.getResultArray(this.props.cellLimit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cellLimit !== this.props.cellLimit) {
      this.setState({arr: this.getResultArray(nextProps.cellLimit)});
    }
  }

  render() {
    let {arr} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {arr.map((item, index) => {
            return (
              <View key={index} style={styles.wrapperView}>
                <View style={[styles.childView, {height: item, width: item}]}>
                  <Text style={{color: 'white'}}>{item}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  wrapperView: {
    margin: 10,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  childView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
