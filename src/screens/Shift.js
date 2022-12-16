import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import theme from '../constants/theme';
import 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../store';
import Moment from 'moment';
import ip from '../api';

const {COLORS, FONTS, SIZES} = theme;

const Shift = ({navigation}) => {
  const [state, dispatch] = useAuth();
  Moment.locale('vi');
  var startOfWeek = Moment().startOf('isoWeek').toDate();
  var endOfWeek = Moment().endOf('isoWeek').toDate();
  var startDate = Moment(startOfWeek).format('YYYY-MM-DD');
  var endDate = Moment(endOfWeek).format('YYYY-MM-DD');
  const [listValue, setListValue] = useState(null);
  const week = [
    {key: 'Monday', value: 'Thứ 2'},
    {key: 'Tuesday', value: 'Thứ 3'},
    {key: 'Wednesday', value: 'Thứ 4'},
    {key: 'Thursday', value: 'Thứ 5'},
    {key: 'Friday', value: 'Thứ 6'},
    {key: 'Saturday', value: 'Thứ 7'},
    {key: 'Sunday', value: 'CN'},
  ];
  const getWorkScheduleOfUser = async (start, end, id) => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/work-schedule/user?startDate=${encodeURIComponent(
          start,
        )}&endDate=${encodeURIComponent(end)}&accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setListValue(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (state.user) {
      getWorkScheduleOfUser(startDate, endDate, state.user.accountId);
    }
  }, []);

  //MidView
  function renderUnCheckBox() {
    return (
      <React.Fragment>
        <View style={styles.t_row}>
          <TouchableOpacity>
            <View style={styles.checkBox} />
          </TouchableOpacity>
        </View>
        <View style={styles.t_row}>
          <TouchableOpacity>
            <View style={styles.checkBox} />
          </TouchableOpacity>
        </View>
        <View style={styles.t_row}>
          <TouchableOpacity>
            <View style={styles.checkBox} />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
  function renderCheckedBox(day) {
    // let getDay = [];
    // for (let item in listValue) {
    //   if (Moment(item.date, 'YYYY-MM-DD').format('dddd') === day) {
    //     getDay.push(item);
    //   }
    // }

    const insert = (arr, index, ...newItems) => [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index),
    ];
    let getDay = listValue.filter(
      element => Moment(element.date, 'YYYY-MM-DD').format('dddd') === day,
    );
    //trick :>>>>>
    if (getDay.length < 3) {
      const trick = [1, 2, 3];
      //get list shift id from list day
      const shiftIdList = getDay.map(e => Number(e.shiftId));

      // get element defference
      const difference = trick.filter(e => shiftIdList.indexOf(e) === -1);
      for (let item of difference) {
        getDay = insert(getDay, item - 1, {});
      }
    }

    return getDay.map((item, index) => {
      return Number(item.shiftId) === index + 1 ? (
        <View key={index} style={styles.t_row}>
          <TouchableOpacity>
            <View style={styles.checkBox_checked} />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={index} style={styles.t_row}>
          <TouchableOpacity>
            <View style={styles.checkBox} />
          </TouchableOpacity>
        </View>
      );
    });
  }
  function checkDay(day) {
    if (listValue) {
      return listValue.some(item => {
        if (Moment(item.date, 'YYYY-MM-DD').format('dddd') === day) {
          return true;
        }
        return false;
      });
    }
  }
  function renderView() {
    return week.map(({key, value}) => {
      return (
        <View key={key} style={styles.t_column}>
          <Text style={styles.t_row_header}>{value}</Text>
          {checkDay(key) ? renderCheckedBox(key) : renderUnCheckBox()}
        </View>
      );
    });
  }
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '15%'}}>
        <TopComponent navigation={navigation} />
      </View>
      <View style={{width: '100%', height: '85%'}}>
        <View style={styles.container}>
          <Text
            style={{fontSize: 13, padding: 4, color: 'black', marginBottom: 8}}>
            Dữ liệu cập nhật lúc: 4:50 pm, ngày 18/06/2022
          </Text>
          <View>
            <View style={styles.t_column}>
              <Text style={styles.t_row_header}>Ca / thứ</Text>
              <Text style={styles.t_row_header}>Ca 1 (7h-11h)</Text>
              <Text style={styles.t_row_header}>Ca 2 (12h-16h)</Text>
              <Text style={styles.t_row_header}>Ca 3 (17h-21h)</Text>
            </View>
            <View>{renderView()}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Shift;

const TopComponent = ({navigation}) => {
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
          <Text style={styles.header_text}>CA LÀM</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
// const MidComponent = props => {
//   const [checked, setCheck] = useState(true);
//   function renderUnCheckBox() {
//     return (
//       <React.Fragment>
//         <View style={styles.t_row}>
//           <TouchableOpacity>
//             <View style={styles.checkBox} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.t_row}>
//           <TouchableOpacity>
//             <View style={styles.checkBox} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.t_row}>
//           <TouchableOpacity>
//             <View style={styles.checkBox} />
//           </TouchableOpacity>
//         </View>
//       </React.Fragment>
//     );
//   }
//   function renderCheckedBox(list, day) {
//     const getDay = list.filter(
//       element => Moment(element.date, 'YYYY-MM-DD').format('dddd') === day,
//     );
//     for (let i = 1; i < 4; i++) {
//       for (let item in getDay) {
//         if (item.shiftId === i) {
//           return (
//             <View style={styles.t_row}>
//               <TouchableOpacity>
//                 <View style={styles.checkBox_checked} />
//               </TouchableOpacity>
//             </View>
//           );
//         }
//         return (
//           <View style={styles.t_row}>
//             <TouchableOpacity>
//               <View style={styles.checkBox} />
//             </TouchableOpacity>
//           </View>
//         );
//       }
//     }
//   }
//   function renderView(dayList, shiftList) {
//     return dayList.map(day => {
//       let i = 2;
//       const isFound = shiftList.some(item => {
//         if (Moment(item.date, 'YYYY-MM-DD').format('dddd') === day) {
//           return true;
//         }
//         return false;
//       });
//       return (
//         <View style={styles.t_column}>
//           <Text style={styles.t_row_header}>{i < 8 ? `Thứ ${i}` : 'CN'}</Text>
//           {isFound ? renderCheckedBox(shiftList, day) : renderUnCheckBox()}
//         </View>
//       );
//     });
//   }
//   return (
//     <View style={styles.container}>
//       {renderView(props.week, props.listValue)}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f8ff',
  },
  button_title: {
    fontSize: 18,
    color: 'white',
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
    marginTop: 24,
  },
  checkBox: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 5,
  },
  checkBox_checked: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
  },
  t_column: {
    flexDirection: 'row',
    //borderWidth: 1,
    justifyContent: 'space-around',
    padding: 4,
    backgroundColor: '#dcdcdc',
    // marginLeft: 8,
    // marginRight: 8,
  },
  t_row: {
    width: '24%',
    height: 45,
    textAlign: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#f0f8ff',
  },
  t_row_header: {
    //backgroundColor: '#1e90ff',
    color: 'black',

    width: '22%',
    justifyContent: 'center',
    textAlign: 'center',
    // borderWidth: 1,
    // borderRadius: 5,
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
