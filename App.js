import React, { Component } from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('window');

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queenAry: this.solveNQueens(8),

    }
  }
  solveNQueens(n) {  
    var arr = [];
    var result = [];
    for (var i = 0; i < n; i++) {
        arr[i] = [];
        for (var j = 0; j < n; j++) {
            arr[i][j] = '.';
        }
    }
      notDanger = function (args, row, col) {
        //判斷列方向
        for (var i = 0; i < row; i++) {
            if (args[i][col] == 'Q')
                return false;
        }
        //判斷左上方
        for (var i = row, j = col; i > 0 && j > 0; i--, j--) {
            if (args[i-1][j-1] == 'Q')
                return false;
        }
        //判斷右上方
        for (var i = row, j = col; i > 0 && j < n-1; i--, j++) {
            if (args[i-1][j+1] == 'Q')
                return false;
        }
        return true;
    };
    (function queen(arr, row) {
        var temp = arr.concat();
        if (row == n) {
            for (let i = 0; i < temp.length; i++) {
                temp[i]=temp[i].join('');
            }
            result.push(temp);//如果直接push temp ary，result中保存的只是temp，最终會顯示為temp的结束狀態，導致顯示錯誤
          } else {
            for (var i = 0; i < n; i++) {
                if (notDanger(temp, row, i)) {
                    for (var j = 0; j < n; j++) {
                        arr[row][j] = '.';
                    }
                    temp[row][i] = 'Q';
                    queen(temp, row + 1);
                }
            }
        }

    })(arr, 0);
    return result;
};
  




  render() {
    console.log(this.state.queenAry[0])

    var Queenspuzzle = []
    for(let i = 0; i < this.state.queenAry[0].length; i ++){
      for(let v = 0; v < this.state.queenAry[0][i].length; v ++){
        Queenspuzzle.push(
          <View style = {{width:40,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
          <Text style>{this.state.queenAry[0][i][v]}</Text>
        </View>
        )
      }
    }


    return (
      <View style={styles.bg}>
        {Queenspuzzle}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    alignSelf:'center',
    width:320,
    height: 320,
    flexWrap:'wrap',
    flexDirection:'row',
    top: 170,
  },
})
