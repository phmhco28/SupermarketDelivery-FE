import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Map = ({navigation}) => {
  function renderMap() {
    return (
      <View style={{flex: 1}}>
<<<<<<< Updated upstream
        <MapView style={{flex: 1}}></MapView>
        <Text> đay là map</Text>
=======
        <Text>MAPpppppppp</Text>
>>>>>>> Stashed changes
      </View>
    );
  }

  function renderHeader() {
    return (
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
          <Text style={styles.header_text}>BẢN ĐỒ</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderMap()}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f8ff',
    //alignItems: 'center',
  },

  header_container: {
    width: '100%',
    height: '8%',
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
