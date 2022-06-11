import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import theme from '../constants/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Boxes from '../components/Boxes';
import Header from '../components/Header';

const {COLORS, FONTS, SIZES} = theme;

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
        <Header tittle="Trang chủ" />
        <FlatList
          data={boxes}
          renderItem={({item}) => <Boxes box={item} />}
          // keyExtractor={item => {
          //   item.id;
          // }}
          contentContainerStyle={styles.flatList}
        />
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  flatList: {
    paddingLeft: 16,
    paddingRight: 16,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  footer: {
    width: '100%',
    height: '7%',
    backgroundColor: COLORS.blue,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
  },
});
