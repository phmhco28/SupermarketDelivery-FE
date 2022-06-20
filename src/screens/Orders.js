import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import theme from '../constants/theme';
import 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {COLORS, FONTS, SIZES} = theme;
const Need_Delivery = 'Need_Delivery';
const Delivering = 'Delivering';
const DCompleted = 'DComplete';

const Orders = ({navigation}) => {
  const [page, setPage] = useState(Need_Delivery);
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '15%'}}>
        <TopComponent navigation={navigation} page={page} setPage={setPage} />
      </View>
      <View style={{width: '100%', height: '85%'}}>
        {page === Need_Delivery ? <Need_Delivery_Component /> : null}
        {page === Delivering ? <Delivering_MidComponent /> : null}
        {page === DCompleted ? <DCompleted_MidComponent /> : null}
      </View>
    </View>
  );
};

export default Orders;

const DCompleted_MidComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text_order_info}>Đơn đã giao</Text>
      <ScrollView>
        <View style={styles.box}>
          <View style={styles.text_space_between}>
            <Text style={styles.text_order_info}>Mã đơn:</Text>
            <Text style={styles.text_order_info}>097822223333</Text>
          </View>
          <View style={styles.text_space_between}>
            <Text style={styles.text_order_info}>Tiền đã thu:</Text>
            <Text style={styles.text_order_info}>0đ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Delivering_MidComponent = () => {
  return (
    <View style={styles.container}>
      {/* order's info */}
      <View>
        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Thời gian giao hàng:</Text>
          <Text style={styles.text_order_info}>7h-12h</Text>
        </View>
        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Địa chỉ:</Text>
          <TouchableOpacity>
            <Text style={(styles.text_order_info, {color: '#1e90ff'})}>
              Xem đường đi
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text_order_info}>
          Ktx khu B ĐHQG, Mạc đinh chi, Đông Hòa, Dĩ An, Bình Dương
        </Text>
        <Text style={styles.text_order_info}>Người mua:</Text>
        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Trần Thị B</Text>
          <Text style={styles.text_order_info}>0978222333</Text>
        </View>
      </View>
      <View>
        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Đã thanh toán trước:</Text>
          <Text style={styles.text_order_info}>123,000đ</Text>
        </View>
        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Tiền phải thu:</Text>
          <Text style={(styles.text_order_info, {color: 'red'})}>0đ</Text>
        </View>

        <View style={styles.text_space_between}>
          <Text style={styles.text_order_info}>Mã đơn hàng:</Text>
          <Text style={styles.text_order_info}>978011112222</Text>
        </View>
        <Text style={styles.text_order_info}>Ghi chú:</Text>
        <View style={styles.box}>
          <Text style={styles.text_order_info}></Text>
        </View>
      </View>
      {/* button */}
      <View style={styles.text_space_between}>
        <TouchableOpacity style={styles.button_submit_done}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Xác nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_change_time}>
          <Text style={{color: 'black', fontSize: 14}}>Đổi giờ - hủy giao</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Need_Delivery_Component = () => {
  return (
    <View style={styles.container}>
      {/* tab button scan */}
      <View style={styles.tabScan}>
        <View style={styles.btn_scan}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Scan mã đơn
            </Text>
            <FontAwesomeIcon name="camera" color="white" size={24} />
          </TouchableOpacity>
        </View>
        {/* input order's code */}
        <View style={styles.textInput_scan}>
          <TextInput
            style={{
              height: '100%',
              width: '70%',
              marginRight: 8,
              color: 'black',
            }}></TextInput>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text style={styles.btn_input}>Nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* table */}
      <View style={styles.tableOrders}>
        <View style={styles.table_col_left}>
          <View style={styles.table_header}>
            <Text style={styles.table_header_title}>Mã đơn</Text>
          </View>
          <Text></Text>
        </View>
        <View style={styles.table_col_right}>
          <View style={styles.table_header}>
            <Text style={styles.table_header_title}>Trạng thái</Text>
          </View>
          <Text></Text>
        </View>
      </View>

      {/* button submit */}
      <View style={styles.button_submit}>
        <TouchableOpacity>
          <Text style={styles.table_header_title}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const TopComponent = ({navigation, page, setPage}) => {
  return (
    <View style={styles.container}>
      {/* header ========================================================*/}
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
          <Text style={styles.header_text}>ĐƠN HÀNG</Text>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f8ff',
  },
  box: {
    marginTop: 8,
    borderWidth: 1,
    width: '90%',
    height: 80,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  button_submit_done: {
    margin: 8,
    marginTop: 32,
    width: '45%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#1e90ff',

    alignItems: 'center',
    justifyContent: 'center',
  },
  button_change_time: {
    margin: 8,
    marginTop: 32,
    width: '40%',
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 16,
  },
  text_order_info: {
    margin: 4,
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 16,
    paddingTop: 8,
    color: 'black',
  },
  text_order_info_header: {
    margin: 8,
    color: 'black',
  },
  button_submit: {
    backgroundColor: '#1e90ff',
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  tableOrders: {
    //borderWidth: 1,
    height: '60%',
    flexDirection: 'row',
    margin: 40,
    borderRadius: 10,
  },
  table_col_left: {
    borderWidth: 1,
    width: '60%',
  },
  table_col_right: {
    width: '40%',
    borderWidth: 1,
  },
  table_header: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
  table_header_title: {
    fontSize: 18,
    color: 'white',
  },
  tabScan: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  btn_scan: {
    width: '45%',
    padding: 8,
    borderWidth: 1,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
  },
  textInput_scan: {
    width: '45%',
    borderWidth: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingRight: 16,
    borderRadius: 10,
    backgroundColor: '#f8f8ff',
  },
  btn_input: {
    color: '#1e90ff',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
  tabBar: {
    width: '100%',
    height: 50,
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
    color: '#1e90ff',
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
    height: '66%',
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
});
