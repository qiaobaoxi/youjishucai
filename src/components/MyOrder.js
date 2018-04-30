/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import types from '../actions/shopingCart'
import store from '../store/index'
import Fetch from '../js/fetch'
import Header1 from './Header1'
import AwesomeAlert from 'react-native-awesome-alerts';
import PopupDialog from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ListView,
  ScrollHeight,
  Dimensions,
  PanResponder,
  Animated,
  Easing,
  ImageBackground,
  Alert,
  Button,
  FlatList,
  Picker
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class MyOrder extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      userAddresses:[{key: 'a'}, {key: 'b'}],
    }
  }
  render() {
    const {userAddresses} = this.state
    return (
      <View style={styles.contenier}>
        <Header1 name="我的订单"></Header1>
        <View style={styles.orderResult}>
          <View style={styles.orderNumWrap}><Text style={styles.orderNum}>订单号：</Text><Text style={styles.orderContent}>17989340533</Text><Text style={styles.result}>待付款</Text></View>
          <View>
            <View>
              <Text>下单</Text>
              <Text>付款</Text>
              <Text>发货</Text>
              <Text>完成</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  orderResult: {
    marginTop: pxToDp(15),
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    backgroundColor: 'white',
  },
  orderNumWrap: {
    flexDirection: 'row',
    position: 'relative',
    height: pxToDp(90),
    alignItems: 'center',
  },
  orderNum:{
    fontSize:pxToDp(28),
    color: '#a7a7a7'
  },
  orderContent: {
    fontSize: pxToDp(28)
  },
  result: {
    position: 'absolute',
    right: 0,
    fontSize: pxToDp(28),
    color: '#ffae00',
  }
});
