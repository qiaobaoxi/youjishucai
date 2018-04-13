/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
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
  ImageBackground 
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;

function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    this.state = {
      LeftdataSource: type1.cloneWithRows([{active:true,name:'有机蔬菜'},{active:false,name:'粮油禽蛋'},{active:false,name:'有机蔬菜'},{active:true,name:'有机蔬菜'},{active:false,name:'粮油禽蛋'},{active:false,name:'有机蔬菜'},]),
      RightdataSource: type2.cloneWithRows([{
        img: 'http://img05.tooopen.com/images/20140328/sy_57865838889.jpg',
        name: '有机青椒500G',
        money: 15.9,
        company: '袋',
        isNull:false
      },{
        img: 'http://img05.tooopen.com/images/20140328/sy_57865838889.jpg',
        name: '有机青椒500G',
        money: 15.9,
        company: '袋',
        isNull:false
      },{
        img: 'http://img05.tooopen.com/images/20140328/sy_57865838889.jpg',
        name: '有机青椒500G',
        money: 15.9,
        company: '袋',
        isNull:false
        }]),
      selectName: '有机蔬菜',
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0)
    }
   
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ right: new Animated.Value(deviceWidthDp-evt.nativeEvent.pageX-pxToDp(45/2)), top: new Animated.Value(evt.nativeEvent.pageY-pxToDp(45/2)) }, () => { 
          this.animate();
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  animate() {
    Animated.sequence([
        Animated.timing(                            // 随时间变化而执行的动画类型
          this.state.fadeAnim,                      // 动画中的变量值
          {
            toValue: 1, 
            duration: 100,                             // 透明度最终变为1，即完全不透明
          },
        ),            // 首先执行decay动画，结束后同时执行spring和twirl动画
        Animated.parallel(
            [
              Animated.timing(this.state.right, {
                  toValue: pxToDp(10),
              duration: 500,
              easing: Easing.quad
              }),
              Animated.timing(this.state.top, {
                  toValue: pxToDp(10),
                  duration: 500,
                  easing: Easing.quad
              })
            ]
      ),
      Animated.timing(                            // 随时间变化而执行的动画类型
        this.state.fadeAnim,                      // 动画中的变量值
        {
          toValue: 0,
          duration: 100,                             // 透明度最终变为1，即完全不透明
        }
      ),
    ]).start();
}
  //点击1级菜单
  goods1NameFn(dataSource, rowID) {
    let name=""
    for(let i=0;i<dataSource._dataBlob.s1.length;i++){
        if (i == rowID) {
          dataSource._dataBlob.s1[i].active = true
          name=dataSource._dataBlob.s1[i].name
        }else{
          dataSource._dataBlob.s1[i].active=false
        }
    }
    var newTabs = JSON.parse(JSON.stringify(dataSource._dataBlob.s1));
    this.setState({LeftdataSource:this.state.LeftdataSource.cloneWithRows(newTabs),selectName:name})
  }
  //一级菜单的list渲染
  _renderRow1(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={() => { this.goods1NameFn(this.state.LeftdataSource, rowID) }}>
        <View style={[styles.goods1Name, rowData.active && styles.goods1NameActive]}>
          <Text style={rowData.active ?styles.goods1NameText1:styles.goods1NameText}>{rowData.name}</Text>
          <Text style={rowData.active ? styles.goods1NameTextLine : styles.goods1NameTextLine1}></Text>
        </View>
      </TouchableOpacity>
    );
  }
  //二级菜单的list渲染
  _renderRow2(rowData, sectionID, rowID) {
    return (
      <View style={styles.rowGoods}>
        <View >
          <Image style={styles.rowGoodsImg} source={require('../images/banner1.jpg')}/>
        </View>
        <View ><Text style={styles.rowGoodsName}>{rowData.name}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{rowData.money}</Text><Text style={styles.rowGoodsCompany}>/{rowData.company}</Text></View>
          <View style={styles.rowGoodsAdd} {...this._panResponder.panHandlers}><Image style={styles.rowGoodsAddImg} source={require('../images/addGood.png')}/></View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.header} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <TouchableOpacity style={styles.customerServiceBtn} onPress={() => {alert(111) }}>
            <Image style={styles.customerServiceImg} source={require("../images/customerService.png")}></Image>
          </TouchableOpacity>
          <View style={styles.headerSearchWrap}>
            <Image style={styles.headerSearchImg} source={require("../images/search.png")}></Image>  
            <TextInput
              returnKeyType={"search"}
              style={styles.headerSearch}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({searchText:text})}
              placeholder={'有机大米'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Image style={styles.cartImg} source={require("../images/cart.png")}></Image>
            <View style={styles.cartNumWrap}><Text style={styles.cartNum}>10</Text></View>
          </TouchableOpacity>  
        </ImageBackground>
        <View style={styles.wrapperWrap}>
          <Swiper style={styles.wrapper} paginationStyle={styles.pagination} activeDot={<View style={{backgroundColor:'#007aff', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />} dot={<View style={{backgroundColor:'white', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}  autoplay={true} >
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
          </Swiper>
        </View>  
        <View style={styles.goodsWrap} >
          <ListView 
            style={styles.goods1}  
            dataSource={this.state.LeftdataSource}
            renderRow={this._renderRow1.bind(this)}
          />
          <View style={styles.goods2}>
            <View style={styles.goods2Header}><Image style={styles.goods2HeaderImg1} source={require("../images/bubbleLeft.png")}></Image><Text style={styles.goods2HeaderText}>{this.state.selectName}</Text><Image style={styles.goods2HeaderImg2}  source={require("../images/bubbleRight.png")}></Image></View>  
              <ListView 
                contentContainerStyle={styles.goods3}
                dataSource={this.state.RightdataSource}
                renderRow={this._renderRow2.bind(this)}
              />
          </View>  
        </View>
        <Animated.View                            // 可动画化的视图组件
          style={{
            position:"absolute",
            zIndex: 1000,
            opacity: this.state.fadeAnim,
            width: pxToDp(30), height: pxToDp(30),
            backgroundColor: '#2abd89',
            borderRadius:50,
            right: this.state.right,
            top: this.state.top,
          }}
        >
      </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperWrap: {
    height: pxToDp(238)
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  contenier: {
    width: '100%',
    height: '100%'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingTop: pxToDp(17),
    paddingBottom: pxToDp(17),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    height: pxToDp(100),
    backgroundColor:'#ff8b00'
  },
  customerServiceBtn: {
    flexDirection: 'row',
    width: pxToDp(86),
    height: pxToDp(64),
    alignItems: "center",
    justifyContent:"center",
  },
  customerServiceImg: {
    width: pxToDp(45),
    height: pxToDp(45)
  },
  headerSearchWrap: {
    position: "relative",
    flex:1,
    justifyContent: "center",
  },
  headerSearchImg: {
    position: 'absolute',
    left: pxToDp(30),
    zIndex: 100,
    margin: "auto",
    width: pxToDp(36),
    height: pxToDp(36)
  },
  headerSearch: {
    borderColor: '#ececec', 
    borderWidth: 1,
    borderRadius:36,
    backgroundColor:"#eeeeee",
    height:"100%",
    paddingLeft: pxToDp(74),
  },
  cartBtn: {
    position:'relative',
    flexDirection: 'row',
    width: pxToDp(86),
    height: pxToDp(64),
    alignItems: "center",
    justifyContent:"center",
  },
  cartImg: {
    width: pxToDp(52),
    height: pxToDp(45)
  },
  cartNumWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: pxToDp(40),
    height: pxToDp(24),
    backgroundColor: "#fd4448",
    color: "white",
    borderRadius: 36,
    fontSize: pxToDp(20),
    alignItems: "center",
    justifyContent: "center"
  },
  cartNum: {
    color: "white",
    fontSize: pxToDp(20),
  },
  pagination: {
    bottom: pxToDp(10)
  },
  goodsWrap: {
    flexDirection:'row',
    backgroundColor: '#f4f4f4'
  },
  goods1: {
    width: pxToDp(176),
    height: scrrollHeight(pxToDp(504))
  },
  goods1Name: {
    width: "100%",
    height: pxToDp(93),
    lineHeight: pxToDp(93),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#daddde',
    backgroundColor: '#f4f4f4',
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goods1NameText: {
    // textAlign:'center',
    fontSize: pxToDp(28),
    // textAlignVertical: 'center',
  },
  goods1NameText1: {
    // textAlign:'center',
    fontSize: pxToDp(28),
    color: '#11b57c'
  },
  goods1NameActive: {
    backgroundColor: 'white',
  },
  goods1NameTextLine:{
    position:'absolute',
    left: 0,
    top: 0,
    width:pxToDp(6),
    height:'100%',
    backgroundColor: '#11b57c',
  },
  goods1NameTextLine1:{
    position:'absolute',
    left: 0,
    top: 0,
    width:pxToDp(6),
    height:'100%',
    backgroundColor:'white',
  },
  goods2:{
    width:pxToDp(576),
    height:scrrollHeight(242),
    paddingLeft: pxToDp(24),
    backgroundColor: "white",
  },
  goods2Header: {
    height: pxToDp(98),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goods2HeaderText: {
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15)
  },
  goods2HeaderImg1: {
    width: pxToDp(40),
    height: pxToDp(25)
  },
  goods2HeaderImg2: {
    width: pxToDp(61),
    height: pxToDp(25)
  },
  goods2Bnner: {
    width:pxToDp(526),
    height:pxToDp(200),
    marginTop: pxToDp(28)
  },
  goods3: {
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  rowGoods: {
    marginRight: pxToDp(8),
    width: pxToDp(268),
    borderWidth: pxToDp(2),
    borderColor: '#f4f4f4', 
  },
  rowGoodsImg: {
    width: '100%',
    height: pxToDp(236),
    marginBottom: pxToDp(18)
  },
  rowGoodsName: {
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    paddingLeft: pxToDp(16),
    fontSize: pxToDp(24),
    color: '#2a2a2a'
  },
  rowGoodsMoneyAndAdd: {
    position: 'relative',
    flexDirection: "row",
    marginBottom: pxToDp(30),
  },
  rowGoodsMoney: {
    marginLeft: pxToDp(18),
    flexDirection: "row",
    alignItems: 'flex-end',
  },
  rowGoodsSymbol: {
    fontSize: pxToDp(20),
    color: "#ff0036",
  },
  rowGoodsNum: {
    fontSize: pxToDp(26),
    color: "#ff0036",
  },
  rowGoodsCompany: {
    marginLeft: pxToDp(5),
    fontSize: pxToDp(20),
    color: "#aaaaaa",
  },
  rowGoodsAdd: {
    position: 'absolute',
    top: 0,
    right: pxToDp(18)
  },
  rowGoodsAddImg: {
    width: pxToDp(45),
    height: pxToDp(45)
  }
});
