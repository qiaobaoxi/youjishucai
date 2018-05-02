/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import pxToDp from './src/js/pxToDp';
import Home from './src/components/Home';
import Community from './src/components/Community';
import Vip from './src/components/Vip';
import PayToVip from './src/components/PayToVip';
import SearchGoods from './src/components/SearchGoods';
import My from './src/components/My';
import PayFun from './src/components/PayFun';
import Cart from './src/components/Cart';
import Order from './src/components/Order';
import MyOrder from './src/components/MyOrder';
import AllOrder from './src/components/AllOrder';
import UserAddress from './src/components/UserAddress';
import VipRegister from './src/components/VipRegister';
import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';
import store from './src/store/index'
global.url="http://192.168.0.97:94"
type Props = {};
class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'shoppingCart'
    }
  }
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <TabNavigator tabBarStyle={{backgroundColor:'white',height: pxToDp(114),alignItems: 'center'}}>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'index'}
                  title="有机蔬菜"
                  tabStyle={{color:'white'}}
                  titleStyle={{color:'#999'}}
                  selectedTitleStyle={{color:'#01d6c2'}}
                  renderIcon={() => <Image style={styles.menuImg1} source={require('./src/images/menu1.png')} />}
                  renderSelectedIcon={() => <Image style={styles.menuImg1} source={require('./src/images/menu1.png')} />}
                  onPress={() => this.setState({ selectedTab: 'index' })}>
                  <Home  navigation={this.props.navigation}/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'payment'}
                  title="正弘新社群"
                  titleStyle={{color:'#999'}}
                  selectedTitleStyle={{color:'#01d6c2'}}
                  renderIcon={() => <Image style={styles.menuImg2} source={require('./src/images/menu1.png')} />}
                  renderSelectedIcon={() => <Image style={styles.menuImg2} source={require('./src/images/menu1.png')} />}
                  onPress={() => this.setState({ selectedTab: 'payment' })}
                  >
                  <Community navigation={this.props.navigation} />
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'shoppingCart'}
                  title="vIP会员"
                  selectedTitleStyle={{color:'#01d6c2'}}
                  titleStyle={{color:'#999'}}
                  renderIcon={() => <Image style={styles.menuImg3} source={require('./src/images/menu1.png')} />}
                  renderSelectedIcon={() => <Image style={styles.menuImg3} source={require('./src/images/menu1.png')} />}
                  onPress={() => this.setState({ selectedTab: 'shoppingCart' })}>
                 <Vip navigation={this.props.navigation}  />
              </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'my'}
                title="我的"
                selectedTitleStyle={{color:'#01d6c2'}}
                titleStyle={{color:'#999'}}
                renderIcon={() => <Image style={styles.menuImg4} source={require('./src/images/menu1.png')} />}
                renderSelectedIcon={() => <Image style={styles.menuImg4} source={require('./src/images/menu1.png')} />}
                onPress={() => this.setState({ selectedTab: 'my' })}>
                <My  navigation={this.props.navigation} />
            </TabNavigator.Item>
         </TabNavigator>
    );
  }
}
class AllOrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <AllOrder navigation={this.props.navigation} />
    );
  }
}
class MyOrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <MyOrder navigation={this.props.navigation} />
    );
  }
}
class PayFunScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayFun navigation={this.props.navigation} />
    );
  }
}
class SearchGoodsScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <SearchGoods navigation={this.props.navigation} />
    );
  }
}
class UserAddressScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <UserAddress navigation={this.props.navigation} />
    );
  }
}
class CartScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Cart navigation={this.props.navigation} />
    );
  }
}
class OrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Order navigation={this.props.navigation} />
    );
  }
}
class VipRegisterScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <VipRegister navigation={this.props.navigation} />
    );
  }
}
class PayToVipScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayToVip navigation={this.props.navigation} />
    );
  }
}

const RootNavigator = StackNavigator({
  AllOrder: {
    screen: AllOrderScreen,
  },
  PayFun: {
    screen: PayFunScreen,
  },
  MyOrder: {
    screen: MyOrderScreen,
  },
  UserAddress: {
    screen: UserAddressScreen,
  },
  SearchGoods: {
    screen: SearchGoodsScreen,
  },
  PayToVip: {
    screen: PayToVipScreen,
  },
  VipRegister: {
    screen: VipRegisterScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Order: {
    screen: OrderScreen,
  },
  Cart: {
    screen: CartScreen,
  },
});
export default class App extends React.Component {
  render() {
    return <RootNavigator store={store} />;
  }
}
const styles = StyleSheet.create({
  menuImg1: {
    marginTop:pxToDp(10),
    width:pxToDp(46),
    height:pxToDp(44)
  },
  menuImg2: {
    marginTop:pxToDp(10),
    width:pxToDp(41),
    height:pxToDp(41)
  },
  menuImg3: {
    marginTop:pxToDp(10),
    width:pxToDp(54),
    height:pxToDp(50)
  },
  menuImg4: {
    marginTop:pxToDp(10),
    width:pxToDp(44),
    height:pxToDp(48)
  },
});
