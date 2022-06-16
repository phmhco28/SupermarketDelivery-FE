import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants/theme';
import 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {COLORS, FONTS, SIZES} = theme;
const Need_Delivery = 'Need_Delivery';
const Delivering = 'Delivering';
const DCompleted = 'DComplete';

const Orders = ({navigation}) => {
  const [page, setPage] = useState(Need_Delivery);
  return (
    <View style={styles.container}>
      <TopComponent page={page} setPage={setPage} />
      {/* <MidComponent /> */}
    </View>
  );
};

export default Orders;

const TopComponent = ({page, setPage}) => {
  return (
    <View style={styles.container}>
      {/* header ========================================================*/}
      <View style={styles.header_container}>
        <View style={styles.header_left}>
          <TouchableOpacity onPress={() => {}}>
            <FeatherIcon name="menu" color="white" size={27} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.header_text}>GIAO HÀNG</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* tabBar ==================================================*/}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => {
            setPage(Need_Delivery);
          }}
          disabled={page === Need_Delivery ? true : false}>
          <Text style={styles.tabBarText}>Cần giao</Text>
          {page === Need_Delivery ? (
            <View style={styles.tabBarUnderText}></View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => {
            setPage(Delivering);
          }}
          disabled={page === Delivering ? true : false}>
          <Text style={styles.tabBarText}>Đang giao</Text>
          {page === Delivering ? (
            <View style={styles.tabBarUnderText}></View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => {
            setPage(DCompleted);
          }}
          disabled={page === DCompleted ? true : false}>
          <Text style={styles.tabBarText}>Hoàn tất</Text>
          {page === DCompleted ? (
            <View style={styles.tabBarUnderText}></View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MidComponent = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    //borderWidth: 1,
    justifyContent: 'space-around',
  },
  tabBarItem: {
    width: '33%',
    height: '100%',
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarText: {
    fontSize: 15,
    color: '#4d6d8e',
  },
  tabBarUnderText: {
    height: 3,
    width: '100%',
    backgroundColor: '#1e90ff',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
  header_container: {
    width: '100%',
    height: '7%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    flexDirection: 'row',
    paddingRight: 15,
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
});
