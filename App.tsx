

import React, { useEffect, useState, Component } from 'react';


import { VictoryAxis, VictoryBar, VictoryCandlestick, VictoryChart, VictoryTheme } from "victory-native";
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';



import type { PropsWithChildren } from 'react';

import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

type PriceBTC = {
  symbol: string
  price: string
}







function App(this: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setdata] = useState<any[][]>();
  const [price, setdataBTC] = useState<PriceBTC>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=10')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
      .then((res) => res.json())
      .then((price) => {
        // console.log(data);
        setdataBTC(price);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);





  //Get Current Date
  var date = new Date().getDate();

  //Get Current Month
  var month = new Date().getMonth() + 1;

  //Get Current Year
  var year = new Date().getFullYear();

  //Get Current Time Hours
  var hours = new Date().getHours();

  //Get Current Time Minutes
  var min = new Date().getMinutes();

  //Get Current Time Seconds
  var sec = new Date().getSeconds();

  var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;




  let count = 0;

  const candless = [

    { x: data && data[0][0], open: data && data[0][1], close: data && data[0][4], high: data && data[0][2], low: data && data[0][3] },

  ];

  data?.map((items, indexes) => {

    var STARTdate = new Date(data && data[indexes][0]);
    //console.log(STARTdate.toLocaleString());
    candless.push({ x: STARTdate, open: data[indexes][1], close: data[indexes][4], high: data[indexes][2], low: data[indexes][3] })

  })



  const local_data = [
    {
      value: '1',
      lable: 'BTC chart',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '2',
      lable: 'Country 2000',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '3',
      lable: 'Country 3',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '4',
      lable: 'Country 4',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
    {
      value: '5',
      lable: 'Country 5',
      image: {
        uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
      },
    },
  ];



  const [country, setCountry] = useState('1');



  



  return (
    <ScrollView>
      <Section title="Introduction">
        This app download data from Binance to show exact price of <Text style={styles.highlight}>BTC</Text> in editable intervals.
      </Section>


      <Section title='testos'>

        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={50}
          value={country}
          data={local_data}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Search..."
          onChange={e => {
            setCountry(e.value);
          }}
        />

      </Section>



      <Section title='Time today'>
        <Text>{finalObject}</Text>
      </Section>

      <Section title='BTC price'>
        <Text style={styles.highlight}>{price?.price}</Text>
      </Section>




      <Section title='Chart'>
        <View style={styles.container}>

          <Text style={styles.highlight}>
            <VictoryChart

              domainPadding={{ x: 50 }}
              scale={{ x: "time" }}

            >

              <VictoryAxis tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}`} />
              <VictoryAxis dependentAxis />

              <VictoryCandlestick
                candleWidth={10}
                candleColors={{ positive: 'green', negative: 'red' }}
                data={candless}
              />


            </VictoryChart>
          </Text>


          <View style={styles.nextto}>
            <Button
              title="10 min"
              onPress={() => Alert.alert('Simple Button pressed')}
            />

            <Button
              title="1 hour"
              onPress={() => Alert.alert('Simple Button pressed')}
            />

            <Button
              title="10 hour"
              onPress={() => saySomething('pablo')}
            />

            

          </View>


          



        </View>





      </Section>





    </ScrollView>
  );



}


/*
<TouchableOpacity
              onPress={() => Alert.alert('Simple Button pressed')}>

              <Text
                style={[
                  styles.buttonLabel,
                  
                ]}>
                PABLO
              </Text>
            </TouchableOpacity>
*/




const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    color: 'red'
  },
  green: {
    fontWeight: '800',
    color: 'green',
  },


  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },

  under: {
    flexDirection: 'column',
  },

  nextto: {
    flexDirection: 'row',

  },





  dropdown: {
    margin: 16,
    height: 10,
    width: 150,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },


  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },

});


export default App;



function setdata(data: any) {
  throw new Error('Function not implemented.');
}




function saySomething(something: any) {
  
  console.log(something);
  
}

