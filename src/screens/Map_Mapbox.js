import React, { useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapboxGL from "@rnmapbox/maps"; 
import { LogBox } from "react-native"

LogBox.ignoreAllLogs();
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken('pk.eyJ1IjoiY29taW5ocGhhbSIsImEiOiJjbDR4ZTd3YmYxZmFyM2RtemswcjhwNDV5In0.Gt54iWoEpzk2JpM8nLGTow');


const Map_Mapbox = ({navigation}) => {
  const [coordinates, setCoordinates] = useState([106.7226893,10.8282865]);
    const [position, setPosition] = React.useState({
      latitude: 10,
      longitude: 10,
      latitudeDelta: 10.8282865,
      longitudeDelta: 106.7275608,
    });
  // React.useEffect(() => {
  //   MapboxGL.setAccessToken('pk.eyJ1IjoiY29taW5ocGhhbSIsImEiOiJjbDR4ZTd3YmYxZmFyM2RtemswcjhwNDV5In0.Gt54iWoEpzk2JpM8nLGTow');
  //   Geolocation.getCurrentPosition(pos => {
  //     const crd = pos.coords;
  //     setPosition({
  //       latitude: crd.latitude,
  //       longitude: crd.longitude,
  //       latitudeDelta: 0.0421,
  //       longitudeDelta: 0.0421,
  //     });
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }, []);
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  });
  function renderMap() {        
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: "100%", width: "100%"}}>
          <MapboxGL.MapView showUserLocation={true} style={{flex: 1}} styleURL='https://tiles.goong.io/assets/goong_map_web.json?api_key=qIVeectWKhDORT4uzT5U0yx0COCj9T0ddLUYdFJz'>  
          {/* styleJSON={JSON.stringify(defaultStyle)}  */}
          <MapboxGL.Camera zoomLevel={15}
            centerCoordinate={coordinates} 
            //followUserLocation={true}
          />
           <MapboxGL.PointAnnotation coordinate={coordinates} />
          {/* <MapboxGL.UserLocation visible={true}/> */}
          </MapboxGL.MapView>
        </View>
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

export default Map_Mapbox;
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
          <Text style={styles.header_text}>BẢN ĐỒ</Text>
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

const defaultStyle = {
  version: 8,
  name: 'Land',
  sources: {
    map: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      minzoom: 1,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f2efea',
      },
    },
    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};

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
});
