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
import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';

type Props = {};
class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'index'
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
                  <Home navigation={this.props.navigation} />
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'shoppingCart'}
                  title="vIP会员"
                  selectedTitleStyle={{color:'#01d6c2'}}
                  titleStyle={{color:'#999'}}
                  renderIcon={() => <Image style={styles.menuImg3} source={require('./src/images/menu1.png')} />}
                  renderSelectedIcon={() => <Image style={styles.menuImg3} source={require('./src/images/menu1.png')} />}
                  onPress={() => this.setState({ selectedTab: 'shoppingCart' })}>
                 <Home navigation={this.props.navigation}  />
              </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'my'}
                title="我的"
                selectedTitleStyle={{color:'#01d6c2'}}
                titleStyle={{color:'#999'}}
                renderIcon={() => <Image style={styles.menuImg4} source={require('./src/images/menu1.png')} />}
                renderSelectedIcon={() => <Image style={styles.menuImg4} source={require('./src/images/menu1.png')} />}
                onPress={() => this.setState({ selectedTab: 'my' })}>
                <Home  navigation={this.props.navigation} />
            </TabNavigator.Item>
         </TabNavigator>
    );
  }
}
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
export default class App extends React.Component {
  render() {
    return <RootNavigator />;
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
