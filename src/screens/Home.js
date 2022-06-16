import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Boxes from '../components/Boxes';
import 'react-native-gesture-handler';
import Orders from './Orders';
import Profile from './Profile';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useNavigation} from '@react-navigation/native';

const {COLORS, FONTS, SIZES} = theme;
//const Drawer = createDrawerNavigator();
//const navigation = useNavigation();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [
        {id: 1, name: 'Giao hàng', icon: 'box-open'},
        {id: 2, name: 'Ca làm', icon: 'calendar-alt'},
        {id: 3, name: 'Nộp tiền trả hàng', icon: 'money-check-alt'},
        {id: 4, name: 'Bản đồ', icon: 'map-marked-alt'},
      ],
    };
  }
  render() {
    const {boxes} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={styles.header_left}>
            <TouchableOpacity>
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
        <FlatList
          data={boxes}
          renderItem={({item}) => <Boxes box={item} />}
          // keyExtractor={item => {
          //   item.id;
          // }}
          contentContainerStyle={styles.flatList}
        />
        {/* <Boxes name="Giao hàng" icon="box-open" />
        <Boxes name="Ca làm" icon="calendar-alt" />
        <Boxes name="Nộp tiền trả hàng" icon="money-check-alt" />
        <Boxes name="Bản đồ" icon="map-marked-alt" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  flatList: {
    paddingLeft: 16,
    paddingRight: 16,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
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
