

import React, { useEffect, useState, Component } from 'react';


import { VictoryAxis, VictoryBar, VictoryCandlestick, VictoryChart, VictoryTheme } from "victory-native";
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';



import type { PropsWithChildren } from 'react';

import {
  Alert,
  Button,
  DevSettings,
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



  const [price, setdataBTC] = useState<PriceBTC>();
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









  const [data, setdata] = useState<any[][]>();
  // CALL 10 MIN
  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=10')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data);
        setMinData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  // CALL 1 HOUR in min
  const [BTChour, setdata100] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=60')
      .then((res) => res.json())
      .then((data100) => {
        // console.log(data);
        setdata100(data100);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


// CALL 24 HOUR
const [BTC24hour, setdata24] = useState<any[][]>();

useEffect(() => {
  fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24')
    .then((res) => res.json())
    .then((BTC24hour) => {
      // console.log(data);
      setdata24(BTC24hour);
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

// CALL 1 WEEK
const [BTCweek, setdataWeek] = useState<any[][]>();

useEffect(() => {
  fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7')
    .then((res) => res.json())
    .then((BTCweek) => {
      // console.log(data);
      setdataWeek(BTCweek);
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);



  function SetHourGraph() {

    setWidth(2);
    setPadding(2);
    setdata(BTChour);
  }

  function SetMinGraph() {

    setWidth(10);
    setPadding(20);
    setdata(BTC10min);
  }

  function SetDayGraph() {

    setWidth(5);
    setPadding(15);
    setdata(BTC24hour);
  }
  
  function SetWeekGraph() {

    setWidth(13);
    setPadding(22);
    setdata(BTCweek);
  }








  function SetSettings(t: any) {
    //  console.log("TADYY-------------------------")
    // console.log(data)
  

    //  `${t.getDate()}/${t.getMonth()} ${t.getHours()}:${t.getMinutes()}`
    if (data == BTC10min) {

      console.log("min");
      setTime('Min');
      return (`${t.getMinutes()}`);
    }

    // hour 
    if (data == BTChour) {

      console.log("Hour ");
      setTime('Hour : Min');

      return (`${t.getHours()}:${t.getMinutes()}`)
    }

    if (data == BTC24hour) {

      console.log("Hour 24 ");
      setTime('Hour');
      return (`${t.getHours()}`)
    }

    if (data == BTCweek) {

      console.log(`${t.getDate()}`);
      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }

  }


  // BASIC SETTTINGS !!!!!!!!!!!!!!!!!!!!
  const [settingspaddig, setPadding] = useState(30);
  const [settingscandleWidth, setWidth] = useState(15);

  //zaloha
  const [BTC10min, setMinData] = useState<any[][]>();
  // axis time
  const [time, setTime] = useState('min');
  
  //Date [dataTimes, setTimeData] = useState<Date[]>();


  let candless = [

    { x: data && data[0][0], open: data && data[0][1], close: data && data[0][4], high: data && data[0][2], low: data && data[0][3] },

  ];

  data?.map((items, indexes) => {

    var STARTdate = new Date(data && data[indexes][0]);

    candless.push({ x: STARTdate, open: data[indexes][1], close: data[indexes][4], high: data[indexes][2], low: data[indexes][3] })

  })

  //--------------------------------------


  return (
    <ScrollView>
      <Section title="Introduction">
        This app downloads data from Binance to show exact price of <Text style={styles.highlight}>BTC</Text> in editable intervals.
      </Section>


      <Section title='Select currency'>

        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          //  maxHeight={50}
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


          <VictoryChart
          
            domainPadding={{ x: settingspaddig }}
            scale={{ x: "time" }}

          >

            <VictoryAxis tickFormat={(t) => SetSettings(t)} label={time}/>
            <VictoryAxis dependentAxis />

            <VictoryCandlestick
              candleWidth={settingscandleWidth}
              candleColors={{ positive: 'green', negative: 'red' }}
              data={candless}
            />
          </VictoryChart>



          <View style={styles.nextto}>
            <Button
              title="10 Min"
              onPress={() => SetMinGraph()}
            />

            <Button
              title="1 Hour"
              onPress={() => SetHourGraph()}
            />

            <Button
              title="1 Day"
              onPress={() => SetDayGraph()}
            />

            <Button
              title="1 Week"
              onPress={() => SetWeekGraph()}
            />

            <Button
              title="1 Month"
              onPress={() => Alert.alert('Simple Button pressed')}
            />

          </View>

        </View>













      </Section>





    </ScrollView>
  );



}



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
    backgroundColor: 'white',


  },


  under: {
    flexDirection: 'column',
  },

  nextto: {
    flexDirection: 'row',

  },





  dropdown: {
    width: 200,
    height: 40,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,

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




});


export default App;



function setdata(data: any) {
  throw new Error('Function not implemented.');
}





