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

const {COLORS, FONTS, SIZES} = theme;
const Shift = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '15%'}}>
        <TopComponent navigation={navigation} />
      </View>
      <View style={{width: '100%', height: '85%'}}>
        <MidComponent />
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
const MidComponent = () => {
  const [checked, setCheck] = useState(true);
  return (
    <View style={styles.container}>
      {/* table */}
      <View>
        <Text
          style={{fontSize: 13, padding: 4, color: 'black', marginBottom: 8}}>
          Dữ liệu cập nhật lúc: 4:50 pm, ngày 18/06/2022
        </Text>
        {/* col */}
        <View>
          {/* row header*/}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Ca / thứ</Text>
            <Text style={styles.t_row_header}>Ca 1 (7h-12h)</Text>
            <Text style={styles.t_row_header}>Ca 2 (12h-16h)</Text>
            <Text style={styles.t_row_header}>Ca 3 (17h-21h)</Text>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 2</Text>
            <View style={styles.t_row}>
              <TouchableOpacity
                onPress={() => {
                  setCheck(!checked);
                }}>
                {/* {console.log(checked)} */}
                {checked === true ? (
                  <View style={styles.checkBox_checked}></View>
                ) : (
                  <View style={styles.checkBox}></View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 3</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 4</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 5</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 6</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>Thứ 7</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox_checked}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>

          {/* row */}
          <View style={styles.t_column}>
            <Text style={styles.t_row_header}>CN</Text>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.t_row}>
              <TouchableOpacity>
                <View style={styles.checkBox}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* button submit */}
        {/* <View style={styles.button_submit}>
          <TouchableOpacity>
            <Text style={styles.button_title}>Xác nhận</Text>
          </TouchableOpacity>
        </View> */}
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
