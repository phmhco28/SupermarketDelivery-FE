import React, { useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapboxGL from "@rnmapbox/maps"; 
import { LogBox } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {lineString as makeLineString} from '@turf/helpers';
import goongDirections  from '@goongmaps/goong-sdk/services/directions';
import polyline from '@mapbox/polyline';
import { GOONG_MAPS_TOKEN , GOONG_SERVICES_TOKEN, MAPBOX_TOKEN } from '@env'
import { Image } from 'react-native-animatable';
import ip from '../api';
import {useAuth} from '../store';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);

const directionService = goongDirections({accessToken: GOONG_SERVICES_TOKEN});

const Map_Mapbox = ({navigation, route}) => {
  const startingPoint = [106.7216705,10.8277883];
  const [root, setRoot] = useState("10.8277883,106.7216705");
  const destinationPoint = [ 106.7580315,10.8546373 ];
  const destinationPoint2 = [106.782914,10.8555748];
  //const [coordinates, setCoordinates] = useState([106.7226893,10.8282865]);
  const [routes, setRoutes] = useState(null);
  const [route1, setRoute1] = useState(null);
  const [originPoint, setOriginPoint] = useState(null);

  const [listPoint, setListPoint] = useState(null);
  const [state, dispatch] = useAuth();
  
  useEffect(() => {
    if (state.point !== null) {
      setListPoint(state.point.slice(1));
    }   
  }, [state.point]);

    // remove first element if orderId null and last element
    const filterArr = (arr) => {
      if (arr[0].orderId === null) {
        return arr.slice(1, -1);
      }
      return arr.slice(0, -1);
    }

    useEffect(() => {
      if (state.listPointOfOrders && state.delivering) {
        const pointOfDelivering = state.listPointOfOrders.find(e => e.orderId === state.delivering.orderId);
        const getOriginPoint = state.listPointOfOrders.find(e => e.destination === pointOfDelivering.origin);
        setOriginPoint(getOriginPoint);
        fetchRoute(getOriginPoint.origin, getOriginPoint.destination);
      }
    },[state.delivering])
    
    const fetchRoute = async (origins,destinations) => {
      const reqOptions = {
        origin: origins,
        destination: destinations,
        alternatives: true,
        vehicle: 'bike'
      };
  
      const res = await directionService.getDirections(reqOptions).send();
      
      const direstions = res.body;
      const routee = direstions.routes[0];
      const geometry_string = routee.overview_polyline.points;

      
      const geoJSON = polyline.toGeoJSON(geometry_string);

      //const newRoute = makeLineString(geoJSON.coordinates);
      setRoutes(geoJSON);
      
    };
    

    // const fetchRoute1 = async (lat) => {
    //   const reqOptions = {
    //     origin: '10.8546373,106.7580315',
    //     destination: lat,
    //     alternatives: true,
    //     vehicle: 'bike'
    //   };
  
    //   const res = await directionService.getDirections(reqOptions).send();
      
    //   const direstions = res.body;
    //   const routee = direstions.routes[0];
    //   const geometry_string = routee.overview_polyline.points;

      
    //   const geoJSON = polyline.toGeoJSON(geometry_string);

    //   //const newRoute = makeLineString(geoJSON.coordinates);
    //   setRoute1(geoJSON);
    // };

    const RenderRoute = (props) => {
      return (
        <MapboxGL.ShapeSource id={props.shapeID} shape={props.routeInput} >
          <MapboxGL.LineLayer id={props.lineID} style={{lineWidth: 7, lineCap: 'round', lineJoin: 'round', lineColor: '#1e88e5'}}/>
        </MapboxGL.ShapeSource>
      );
    }


    const ShowInfoOrder = (props) => {
      return (
        <View>
          <Text>{props.text}</Text>
        </View>
      )
    }

    const RenderAnnotations = (props) => {
      return (
        <MapboxGL.PointAnnotation
          id={props.id}
          coordinate={props.coor}>
          <View >
            <Image
              source={require("../assets/images/location.png")}
              style={{
                width: 30,
                height: 30,
                // backgroundColor: "red",
                resizeMode: "cover",
              }}
            />
          </View>
        </MapboxGL.PointAnnotation>
      );
    }

    const reverse = (str) => {
      const reverseGeo = str.split(',');
      let arr = [];
      arr.push(Number(reverseGeo[1]));
      arr.push(Number(reverseGeo[0]));
      return  arr;
    }

    const convertListPoint = () => {
      let arr=[];
      if (listPoint !== null) {
          arr = listPoint.map((e, index) => ({
          key: index+'',
          point: reverse(e.origin),
        }))
      }
      return arr;
    } 

    const RenderPoint = () => {
      const list =  convertListPoint();
      return list.map((item, index) => {
        return (
          <RenderAnnotations key={index} id={item.key} coor={item.point}/>
        );
      })
    }

    const RenderMarkers = () => {
      return (
        <MapboxGL.MarkerView id={"marker"} coordinate={destinationPoint2}>
          <View>
            <View style={styles.markerContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{"Đơn hàng 1"}</Text>
              </View>
              <Image
                  source={require("../assets/images/location.png")}
                  style={{
                    width: 30,
                    height: 30,
                    // backgroundColor: "red",
                    resizeMode: "cover",
                  }}
                />  
            </View>
          </View>
        </MapboxGL.MarkerView>
      );
    }
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
  },[]);
  function renderMap() {        
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: "100%", width: "100%"}}>
          <MapboxGL.MapView  zoomLevel={13} style={{flex: 1}} styleURL={`https://tiles.goong.io/assets/goong_map_web.json?api_key=${GOONG_MAPS_TOKEN}`}>  
          {/* styleJSON={JSON.stringify(defaultStyle)}  */}
          <MapboxGL.Camera zoomLevel={13}
            centerCoordinate={startingPoint}
            animationMode={'flyTo'}
            animationDuration={0}
            //followUserLocation={true}
          />
          {state.delivering !== null ? <RenderDestinationPoint longitude={state.delivering.address.longitude} latitude={state.delivering.address.latitude}/>
            : null}
          {originPoint !== null && originPoint.orderId !== null ? <RenderOriginPoint origin={originPoint.origin}/> : null}
          <MapboxGL.PointAnnotation id={'root'} coordinate={startingPoint}/>          
          {listPoint !== null ? <RenderPoint /> : null}
          {listPoint !== null && routes !== null ? <RenderRoute shapeID='shapSource' lineID= 'lineLayerr' routeInput = {routes}/> : null}
          
           {/* <RenderMarkers/> */}
          <MapboxGL.UserLocation visible={true}/>
          {/* <RenderRoute shapeID='shapSource1' lineID= 'lineLayer' routeInput = {routes}/> */}
          {/* {renderPoint()} */}
          {/* <RenderRoute shapeID='shapSource2' lineID = 'lineLayer2' routeInput = {route1}/> */}
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

const RenderDestinationPoint = (props) => {
  return (
    <MapboxGL.PointAnnotation
      id='destination'
      coordinate={[Number(props.longitude), Number(props.latitude)]} >
      <View >
        <Image
          source={require("../assets/images/pin.png")}
          style={{
            width: 42,
            height: 42,
            // backgroundColor: "red",
            resizeMode: "cover",
          }}
        />
      </View>
    </MapboxGL.PointAnnotation >
  );
}

const RenderOriginPoint = (props) => {
  const reverse = (str) => {
    const reverseGeo = str.split(',');
    let arr = [];
    arr.push(Number(reverseGeo[1]));
    arr.push(Number(reverseGeo[0]));
    return  arr;
  }
  return (
    <MapboxGL.PointAnnotation
      id='origin'
      coordinate={reverse(props.origin)}>
      <View >
        <Image
          source={require("../assets/images/delivery-box.png")}
          style={{
            width: 30,
            height: 30,
            // backgroundColor: "red",
            resizeMode: "cover",
          }}
        />
      </View>
    </MapboxGL.PointAnnotation>
  )
}

// const defaultStyle = {
//   version: 8,
//   name: 'Land',
//   sources: {
//     map: {
//       type: 'raster',
//       tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
//       tileSize: 256,
//       minzoom: 1,
//       maxzoom: 19,
//     },
//   },
//   layers: [
//     {
//       id: 'background',
//       type: 'background',
//       paint: {
//         'background-color': '#f2efea',
//       },
//     },
//     {
//       id: 'map',
//       type: 'raster',
//       source: 'map',
//       paint: {
//         'raster-fade-duration': 100,
//       },
//     },
//   ],
// };

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
  markerContainer: {
    alignItems: "center",
    width: 60,
    backgroundColor: "transparent",
    height: 70,
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 5,
    flex: 1,
  },

});
