import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import theme from '../constants/theme';
import 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../store';
import Moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import ip from '../api';

const {COLORS, FONTS, SIZES} = theme;
const Need_Delivery = 'Need_Delivery';
const Delivering = 'Delivering';
const DCompleted = 'DComplete';

const Orders = ({navigation}) => {
  const [state, dispatch] = useAuth();
  const [page, setPage] = useState(Need_Delivery);
  const [listOrder, setListOrder] = useState(null);
  const [orderShipping, setOrderShipping] = useState(null);

  // const [updateOrder, setUpdateOrder] = useState(null);
  //Call API to get list Order need delivery
  const getOrdersOfUser = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders?accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setListOrder(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (state.user) {
      getOrdersOfUser(state.user.accountId);
    }
  }, []);

  //Call API to get order delivering
  // const getOrderDelivering = async id => {
  //   try {
  //     const response = await fetch(
  //       `http://${ip}/api/v0/orders/delivering?id=${encodeURIComponent(id)}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     if (response.status === 500) {
  //       return;
  //     }
  //     const data = await response.json();
  //     setOrderShipping(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // React.useEffect(() => {
  //   if (state.user) {
  //     getOrderDelivering(state.user.accountId);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '15%'}}>
        <TopComponent navigation={navigation} page={page} setPage={setPage} />
      </View>
      <View style={{width: '100%', height: '85%'}}>
        {page === Need_Delivery ? (
          <Need_Delivery_Component
            state={state}
            setOrderShipping={setOrderShipping}
            orderShipping={orderShipping}
            setListOrder={setListOrder}
            listOrder={listOrder}
            setPage={setPage}
          />
        ) : null}
        {page === Delivering ? (
          <Delivering_MidComponent
            state={state}
            setPage={setPage}
            orderShipping={orderShipping}
            setOrderShipping={setOrderShipping}
            navigation={navigation}
          />
        ) : null}
        {page === DCompleted ? <DCompleted_MidComponent state={state} /> : null}
      </View>
    </View>
  );
};

export default Orders;

const DCompleted_MidComponent = ({state}) => {
  //Call API /orders/completed
  const [completed, setCompleted] = useState(null);
  const getOrderComplete = async () => {
    try {
      const response = await fetch(`http://${ip}/api/v0/orders/complete`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCompleted(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (state.user) {
      getOrderComplete();
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text_order_info}>Đơn đã giao trong ngày</Text>
      {/* {completed ? ( */}
      <FlatList
        data={completed}
        keyExtractor={item => item.orderId}
        renderItem={({item, index}) => {
          return (
            <ScrollView>
              <View style={styles.box}>
                <View style={styles.text_space_between}>
                  <Text style={styles.text_order_info}>Mã đơn:</Text>
                  <Text style={styles.text_order_info}>{item.orderId}</Text>
                </View>
                <View style={styles.text_space_between}>
                  <Text style={styles.text_order_info}>Tiền đã thu:</Text>
                  <Text style={styles.text_order_info}>
                    {item.paymentAmount} VNĐ
                  </Text>
                </View>
              </View>
            </ScrollView>
          );
        }}
      />
      {/* ) : (
        <View />
      )} */}
    </View>
  );
};

const Delivering_MidComponent = ({
  setPage,
  // orderShipping,
  setOrderShipping,
  state,
  navigation,
}) => {
  //Call Api to update status orders
  const [isCancel, setIsCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [orderValue, setOrderValue] = useState(null);
  //Call API /orders/delivering
  const getOrderDelivering = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/delivering?accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 500) {
        return;
      }
      const data = await response.json();
      setOrderShipping(data);
      setOrderValue(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (state.user) {
      getOrderDelivering(state.user.accountId);
    }
  }, []);

  //Call API Cancel
  const CancelOrder = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/cancel-order/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (isCancel) {
      CancelOrder(orderValue.orderId);
      setIsCancel(false);
    }
  }, [isCancel]);

  //Call API to confirm delivered
  const ConfirmDelivered = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/confirm-delivered/${encodeURIComponent(
          id,
        )}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (isConfirm) {
      ConfirmDelivered(orderValue.orderId);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  function formatDeliveryTime(str1, str2) {
    return str1.slice(0, 2) + 'h -' + str2.slice(0, 2) + 'h';
  }
  function renderDeliveryTime(orderShipping) {
    if (orderShipping) {
      return (
        <Text style={styles.text_order_info}>
          {' '}
          {formatDeliveryTime(
            orderShipping.deliveryTime.startingTimes,
            orderShipping.deliveryTime.endingTimes,
          )}
        </Text>
      );
    }
    return <Text />;
  }
  function renderAddress(orderShipping) {
    if (orderShipping) {
      return (
        <Text style={styles.text_order_info}>
          {orderShipping.address.details +
            ', ' +
            orderShipping.address.ward.wardName +
            ', ' +
            orderShipping.address.ward.district.districtName +
            ', ' +
            orderShipping.address.ward.district.city.cityName}
        </Text>
      );
    }
    return <Text />;
  }
  return (
    <View style={styles.container}>
      {/* order's info */}
      <View>
        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            Thời gian giao hàng:{' '}
          </Text>
          {/* {orderShipping === null || orderShipping === undefined ? (
            <Text />
          ) : (
            <Text style={styles.text_order_info}>
              {' '}
              {formatDeliveryTime(
                orderShipping.deliveryTime.startingTimes,
                orderShipping.deliveryTime.endingTimes,
              )}
            </Text>
          )} */}
          {renderDeliveryTime(orderValue)}
        </View>
        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            Địa chỉ:{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Map_Mapbox')} disabled={orderValue ? false : true}>
            <Text
              style={
                (styles.text_order_info, {color: '#1e90ff', paddingTop: 7})
              }>
              Xem đường đi
            </Text>
          </TouchableOpacity>
        </View>
        {/* {orderShipping === null || orderShipping === undefined ? (
          <Text />
        ) : (
          <Text style={styles.text_order_info}>
            {orderShipping.address.details +
              ', ' +
              orderShipping.address.ward +
              ', ' +
              orderShipping.address.district +
              ', ' +
              orderShipping.address.city}
          </Text>
        )} */}
        {renderAddress(orderValue)}
        <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
          Người mua: {orderValue ? orderValue.customerName : null}
        </Text>
        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            SĐT: {orderValue ? orderValue.customerPhone : null}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            Đã thanh toán trước:
          </Text>
          {orderValue ? (
            <Text style={styles.text_order_info}>
              {orderValue.paymentStatus ? orderValue.paymentAmount : '0'}{' '}
              VNĐ
            </Text>
          ) : (
            <Text />
          )}
        </View>
        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            Tiền phải thu:
          </Text>
          {orderValue ? (
            <Text
              style={
                (styles.text_order_info,
                {color: 'red', fontWeight: 'bold', paddingTop: 9})
              }>
              {orderValue.paymentStatus ? '0' : orderValue.paymentAmount}{' '}
              VNĐ
            </Text>
          ) : (
            <Text />
          )}
        </View>

        <View style={styles.text_space_between}>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            Mã đơn hàng:
          </Text>
          <Text style={[styles.text_order_info, {fontWeight: 'bold'}]}>
            {orderValue ? orderValue.orderId : null}
          </Text>
        </View>
        <Text style={styles.text_order_info}>Ghi chú:</Text>
        <View style={styles.box}>
          <Text style={styles.text_order_info} />
        </View>
      </View>
      {/* button */}
      <View style={styles.text_space_between}>
        <TouchableOpacity
          style={styles.button_submit_done}
          disabled={orderValue ? false : true}
          onPress={() =>
            Alert.alert('Thông báo', 'Xác nhận đã giao đơn hàng này !', [
              {
                text: 'Xác nhận',
                onPress: () => {
                  setIsConfirm(true);
                  setPage(DCompleted);
                  setOrderShipping(null);
                },
              },
              {text: 'Quay lại', onPress: () => console.log('cancel')},
            ])
          }>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Xác nhận đã giao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_change_time}
          onPress={() =>
            Alert.alert('Thông báo', 'Xác nhận hủy giao đơn hàng này !', [
              {
                text: 'Xác nhận',
                onPress: () => {
                  setIsCancel(true);
                  setOrderShipping(null);
                  setPage(Need_Delivery);
                },
              },
              {text: 'Quay lại', onPress: () => console.log('cancel')},
            ])
          }
          disabled={orderValue ? false : true}>
          <Text style={{color: 'black', fontSize: 14}}>Hủy giao</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Need_Delivery_Component = props => {
  const [selected, setSelected] = useState(null);
  const [orderSelected, setOrderSelected] = useState(null);

  //Call API to re render list Order need delivery
  const reRenderOrdersOfUser = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders?accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      props.setListOrder(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (props.state.user) {
      reRenderOrdersOfUser(props.state.user.accountId);
    }
  }, []);

  function handleSelection(id) {
    var selectedId = selected;
    // console.log('id: ' + id);
    // console.log('selected trong kho: ' + selected);
    // orderSelected
    //   ? console.log(orderSelected.orderId)
    //   : console.log('Có cái nịt');
    if (selectedId === id) {
      setSelected(null);
      setOrderSelected(null);
    } else {
      setSelected(id);
      setOrderSelected(listNeedDelivery.find(e => e.key === id));
    }
  }
  function formatDeliveryTime(str1, str2) {
    return str1.slice(0, 2) + 'h -' + str2.slice(0, 2) + 'h';
  }
  let listNeedDelivery = null;
  if (props.listOrder) {
    listNeedDelivery = props.listOrder.map((e, index) => ({
      key: index,
      orderId: e.orderId,
      startingTimes: e.deliveryTime.startingTimes,
      endingTimes: e.deliveryTime.endingTimes,
      paymentAmount: e.paymentAmount,
      customerName: e.customerName,
      customerPhone: e.customerPhone,
      gps: e.locationGps,
      address:
        e.address.details +
        ', ' +
        e.address.ward.wardName +
        ', ' +
        e.address.ward.district.districtName +
        ', ' +
        e.address.ward.district.city.cityName,
      paymentStatus: e.paymentStatus,
    }));
  }

  const [isSending, setIsSending] = useState(false);
  const ConfirmDelivery = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/confirm-delivery/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      props.setOrderShipping(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (isSending) {
      ConfirmDelivery(orderSelected.orderId);
      setIsSending(false);
    }
  }, [isSending]);

  const handleSubmit = async () => {
    // console.log(orderSelected);
    if (props.orderShipping === null || props.orderShipping === undefined) {
      await setIsSending(true);
      props.setPage(Delivering);
      return;
    }
    return Alert.alert('Thông báo', 'Bạn có một đơn hàng đang giao !', [
      {text: 'OK', onPress: () => setSelected(null)},
    ]);
  }
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
            }}
          />
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
        <View style={styles.table_header}>
          <View style={styles.table_col_left}>
            <Text style={styles.table_header_title_Left}>Đơn hàng</Text>
          </View>
          <View style={styles.table_col_right}>
            <Text style={styles.table_header_title_Left}>Trạng thái</Text>
          </View>
        </View>
        <View style={styles.table_data}>
          <FlatList
            data={listNeedDelivery}
            extraData={setSelected}
            keyExtractor={item => item.key}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <TouchableOpacity onPress={() => handleSelection(index)}>
                    <View
                      style={
                        index === selected
                          ? [
                              styles.table_column,
                              {backgroundColor: COLORS.greenSelected},
                            ]
                          : styles.table_column
                      }>
                      <View style={styles.table_data_column_left}>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>Mã đơn: </Text>
                          {item.orderId}
                        </Text>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>
                            Thời gian giao:{' '}
                          </Text>
                          {formatDeliveryTime(
                            item.startingTimes,
                            item.endingTimes,
                          )}
                        </Text>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>Tiền hàng: </Text>
                          {item.paymentAmount} VNĐ
                        </Text>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>Tên KH: </Text>{' '}
                          {item.customerName}
                        </Text>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>SĐT: </Text>{' '}
                          {item.customerPhone}
                        </Text>
                        <Text style={{fontSize: 16}}>
                          <Text style={{fontWeight: 'bold'}}>ĐC: </Text>{' '}
                          {item.address}
                        </Text>
                      </View>
                      <View style={styles.table_data_column_right}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                          {item.paymentStatus
                            ? 'Đã thanh toán'
                            : 'Chưa thanh toán'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              );
            }}
          />
        </View>
      </View>

      {/* button submit */}
      <View style={styles.button_submit}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
            console.log('DELIVERINGGGGGGGGGGGGGGGGGGGGGGGGG');
            console.log(props.orderShipping);
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
            Giao hàng
          </Text>
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
            <View style={styles.tabBarUnderText} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => {
            setPage(Delivering);
          }}
          disabled={page === Delivering ? true : false}>
          <Text style={styles.tabBarText}>Đang giao</Text>
          {page === Delivering ? <View style={styles.tabBarUnderText} /> : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => {
            setPage(DCompleted);
          }}
          disabled={page === DCompleted ? true : false}>
          <Text style={styles.tabBarText}>Hoàn tất</Text>
          {page === DCompleted ? <View style={styles.tabBarUnderText} /> : null}
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
    height: 60,
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
    height: 60,
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
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  tableOrders: {
    flex: 0.9,
    flexDirection: 'column',
    margin: 20,
  },
  table_col_left: {
    flex: 2.5,
    height: '100%',
    borderRightWidth: 1,
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table_col_right: {
    flex: 1,
    borderTopRightRadius: 20,
    height: '100%',
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table_header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    width: '100%',
    height: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  table_data: {
    flex: 9,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRightColor: '#1e90ff',
    borderLeftColor: '#1e90ff',
    borderBottomColor: '#1e90ff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: '100%',
    width: '100%',
  },
  table_column: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    padding: 5,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 21,
    backgroundColor: COLORS.green,
  },
  table_data_column_left: {
    flex: 2.56,
    height: '100%',
    borderRightWidth: 1.5,
    borderRightColor: '#FFFFFF',
    paddingLeft: 7,
    paddingRight: 10,
    justifyContent: 'center',
  },
  selectedStyle: {
    backgroundColor: COLORS.greenSelected,
  },
  table_data_column_right: {
    flex: 1,
    height: '100%',
    // borderRightWidth: 1.5,
    // borderRightColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table_header_title_Left: {
    fontSize: 18,
    color: 'white',
  },
  table_header_title_Right: {
    fontSize: 18,
    color: 'white',
    // paddingLeft: 10,
    // paddingRight: 10,
    borderWidth: 1,
    borderBottomColor: '#818a84',
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
