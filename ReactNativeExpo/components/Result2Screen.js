import React from 'react';
import { Text, View,StyleSheet,Image,TouchableOpacity,Dimensions,ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabPage from './TabPageScreen';
import Loader from './Loader'


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categes: [
        { cat_id: '1', cat_name: 'Person', backgroundcolor: 'lightblue' },
        { cat_id: '2', cat_name: 'Population', backgroundcolor: 'lightgray' },
      ],
      change: false,
      isPopulation:false,loading: false,
    };console.log(global.surveyACode);
  }

  changeBackground = item => {
    let categes = JSON.parse(JSON.stringify(this.state.categes));
    for (let x = 0; x < this.state.categes.length; x++) {
      if (this.state.categes[x].cat_id == item.cat_id) {
        categes[x].backgroundcolor = 'lightblue';

      //  this.setState({categes: categes,});
      } else {
        categes[x].backgroundcolor = 'lightgray';

        //this.setState({categes: categes,});
      }
    }
       this.setState({categes: categes,});
       this.setState({isPopulation:item.cat_id=='2'});
       console.log(this.state.isPopulation);

  };
  onFinish(){ this.setState({loading: false});}

  displayTab() {
      //  this.setState({loading: true});
        if (this.state.isPopulation) {
            return <Text> The survey is not done yet,please check resule after 6 months! </Text>;
        } else {
            return <TabPage param={this.state.isPopulation} onFinish={this.onFinish.bind(this)} />;

        }
    }
  render() {
    return (
     <View style={{ flex: 1 }}>
      <Image source={require('./StatCanLogo.png')} style={{width: null, height: 100 }} />
          <View style={styles.container}>
              {this.state.categes.map((item, key) => (
                        <TouchableOpacity key={key}
                          style={{
                            width: deviceWidth/2,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: item.backgroundcolor,
                          }}
                          onPress={() => this.changeBackground(item)}>
                          <Text style={{ color: 'black',fontSize:13 }}>

                            {item.cat_name.toUpperCase()}
                          </Text>
                        </TouchableOpacity>
                      ))}
          </View>
           {this.displayTab()}
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
   // height:50,
    alignItems: 'center',
  },
});

        //   <Loader loading={this.state.loading} />