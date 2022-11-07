import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

import 'react-native-gesture-handler';

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useNavigation} from '@react-navigation/native';

const {COLORS, FONTS, SIZES} = theme;
//const Drawer = createDrawerNavigator();
//const navigation = useNavigation();

const Home = ({navigation}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     boxes: [
  //       {id: 1, name: 'Giao hàng', icon: 'box-open'},
  //       {id: 2, name: 'Ca làm', icon: 'calendar-alt'},
  //       {id: 3, name: 'Nộp tiền trả hàng', icon: 'money-check-alt'},
  //       {id: 4, name: 'Bản đồ', icon: 'map-marked-alt'},
  //     ],
  //   };
  // }
  // render() {
  //const {boxes} = this.state;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header_container}>
        <View style={styles.header_left}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <FeatherIcon name="menu" color="white" size={27} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.header_text}> TRANG CHỦ </Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* box */}
      <View>
        <TouchableOpacity
          style={styles.box_container}
          onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.box_tittle}>Đơn hàng</Text>
          <FontAwesome5Icon
            style={styles.box_icon}
            name="box-open"
            color="yellow"
            size={50}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.box_container}
          onPress={() => navigation.navigate('Shift')}>
          <Text style={styles.box_tittle}>Ca làm</Text>
          <FontAwesome5Icon
            style={styles.box_icon}
            name="calendar-alt"
            color="yellow"
            size={50}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.box_container}
          onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.box_tittle}>Nộp tiền trả hàng</Text>
          <FontAwesome5Icon
            style={styles.box_icon}
            name="money-check-alt"
            color="yellow"
            size={50}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.box_container}
          onPress={() => navigation.navigate('Map_Mapbox')}>
          <Text style={styles.box_tittle}>Bản đồ</Text>
          <FontAwesome5Icon
            style={styles.box_icon}
            name="map-marked-alt"
            color="yellow"
            size={50}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
// }
export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f8ff',
  },
  header_container: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    flexDirection: 'row',
    paddingRight: 15,
    paddingTop: 22,
  },

  header_left: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
  },
  header_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  box_container: {
    shadowColor: COLORS.blue,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    backgroundColor: COLORS.orange,
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_tittle: {
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  box_icon: {
    marginBottom: 8,
  },
});
