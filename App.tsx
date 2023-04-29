

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

type PriceETH = {
  symbol: string
  price: string
}

type PriceXRP = {
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


  const currency_arr = [
    {
      value: '1',
      lable: 'BTC chart',
      image: {
        uri: '/Users/jankarasek/XcodeRepos/CryptoIndicatior/images/Bitcoin.png', // TO DO: relativni PATH 

      },
    },
    {
      value: '2',
      lable: 'ETH chart',
      image: {
        uri: '/Users/jankarasek/XcodeRepos/CryptoIndicatior/images/ETH.png',
      },
    },
    {
      value: '3',
      lable: 'XRP chart',
      image: {
        uri: '/Users/jankarasek/XcodeRepos/CryptoIndicatior/images/xrp.png',
      },
    },
  ];

  const [currency, setCurrency] = useState('1');






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

  const [priceETH, setdataETH] = useState<PriceETH>();
  useEffect(() => {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
      .then((res) => res.json())
      .then((priceETH) => {
        // console.log(data);
        setdataETH(priceETH);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [priceXRP, setdataXRP] = useState<PriceXRP>();
  useEffect(() => {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT')
      .then((res) => res.json())
      .then((priceXRP) => {
        // console.log(data);
        setdataXRP(priceXRP);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);




  // BTC DATA--------------------------------------------------------------------------------------
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

  // CALL 1 Month
  const [BTCmonth, setdataMonth] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=31')
      .then((res) => res.json())
      .then((BTCmonth) => {
        // console.log(data);
        setdataMonth(BTCmonth);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  //--------------------------------------------------------         

  // ETH DATA
  const [ETH10m, setETHdata1Om] = useState<any[][]>();
  // CALL 10 MIN
  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=10')
      .then((res) => res.json())
      .then((ETH10m) => {
        // console.log(data);
        setETHdata1Om(ETH10m);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  // CALL 1 HOUR in min
  const [ETHhour, setETHh] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=60')
      .then((res) => res.json())
      .then((ETHhour) => {
        setETHh(ETHhour);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  // CALL 24 HOUR
  const [ETH24hour, setETH24] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1h&limit=24')
      .then((res) => res.json())
      .then((ETH24hour) => {
        // console.log(data);
        setETH24(ETH24hour);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // CALL 1 WEEK
  const [ETHweek, setETHWeek] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=7')
      .then((res) => res.json())
      .then((ETHweek) => {
        // console.log(data);
        setETHWeek(ETHweek);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // CALL 1 Month
  const [ETHmonth, setETHMonth] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=31')
      .then((res) => res.json())
      .then((ETHmonth) => {
        // console.log(data);
        setETHMonth(ETHmonth);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //--------------------------------------------------------          

  // ETH DATA
  const [XRP10m, setXRP1Om] = useState<any[][]>();
  // CALL 10 MIN
  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=XRPUSDT&interval=1m&limit=10')
      .then((res) => res.json())
      .then((XRP10m) => {
        // console.log(data);
        setXRP1Om(XRP10m);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  // CALL 1 HOUR in min
  const [XRPhour, setXRPh] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=XRPUSDT&interval=1m&limit=60')
      .then((res) => res.json())
      .then((XRPhour) => {
        setXRPh(XRPhour);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  // CALL 24 HOUR
  const [XRP24hour, setXRP24] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=XRPUSDT&interval=1h&limit=24')
      .then((res) => res.json())
      .then((XRP24hour) => {
        // console.log(data);
        setXRP24(XRP24hour);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // CALL 1 WEEK
  const [XRPweek, setXRPWeek] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=XRPUSDT&interval=1d&limit=7')
      .then((res) => res.json())
      .then((XRPweek) => {
        // console.log(data);
        setXRPWeek(XRPweek);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // CALL 1 Month
  const [XRPmonth, setXRPMonth] = useState<any[][]>();

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/klines?symbol=XRPUSDT&interval=1d&limit=31')
      .then((res) => res.json())
      .then((XRPmonth) => {
        // console.log(data);
        setXRPMonth(XRPmonth);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);







  function SetHourGraph() {

    setWidth(2);
    setPadding(2);
    if (currency == '1') {
      setdata(BTChour);
    }
    if (currency == '2') {
      setdata(ETHhour);
    }
    if (currency == '3') {
      setdata(XRPhour);
    }
  }

  function SetMinGraph() {

    setWidth(10);
    setPadding(20);
    if (currency == '1') {
      setdata(BTC10min);
    }
    if (currency == '2') {
      setdata(ETH10m);
    }
    if (currency == '3') {
      setdata(XRP10m);
    }


  }

  function SetDayGraph() {

    setWidth(5);
    setPadding(15);
    if (currency == '1') {
      setdata(BTC24hour);
    }
    if (currency == '2') {
      setdata(ETH24hour);
    }
    if (currency == '3') {
      setdata(XRP24hour);
    }
  }

  function SetWeekGraph() {

    setWidth(13);
    setPadding(22);
    if (currency == '1') {
      setdata(BTCweek);
    }
    if (currency == '2') {
      setdata(ETHweek);
    }
    if (currency == '3') {
      setdata(XRPweek);
    }
  }

  function SetMonthGraph() {

    setWidth(5);
    setPadding(15);
    if (currency == '1') {
      setdata(BTCmonth);
    }
    if (currency == '2') {
      setdata(ETHmonth);
    }
    if (currency == '3') {
      setdata(XRPmonth);
    }
  }





  // set setttings of graph
  function SetSettings(t: any) {


    if (data == BTC10min) {

      setTime('Min');
      return (`${t.getMinutes()}`);
    }

    if (data == ETH10m) {

      setTime('Min');
      return (`${t.getMinutes()}`);
    }
    if (data == XRP10m) {

      setTime('Min');
      return (`${t.getMinutes()}`);
    }

    // hour 
    if (data == BTChour) {

      setTime('Hour : Min');
      return (`${t.getHours()}:${t.getMinutes()}`)
    }
    if (data == ETHhour) {
      setTime('Hour : Min');
      return (`${t.getHours()}:${t.getMinutes()}`)
    }
    if (data == XRPhour) {

      setTime('Hour : Min');
      return (`${t.getHours()}:${t.getMinutes()}`)
    }


    if (data == BTC24hour) {

      setTime('Hour');
      return (`${t.getHours()}`)
    }
    if (data == ETH24hour) {

      setTime('Hour');
      return (`${t.getHours()}`)
    }
    if (data == XRP24hour) {

      setTime('Hour');
      return (`${t.getHours()}`)
    }


    if (data == BTCweek) {

      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }
    if (data == ETHweek) {

      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }
    if (data == XRPweek) {

      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }



    if (data == BTCmonth) {

      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }
    if (data == ETHmonth) {

      setTime('Day / Month');
      return (`${t.getDate()}/${t.getMonth() + 1}`)
    }
    if (data == XRPmonth) {

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


  let candless = [

    { x: data && data[0][0], open: data && data[0][1], close: data && data[0][4], high: data && data[0][2], low: data && data[0][3] },

  ];

  data?.map((items, indexes) => {

    var STARTdate = new Date(data && data[indexes][0]);

    candless.push({ x: STARTdate, open: data[indexes][1], close: data[indexes][4], high: data[indexes][2], low: data[indexes][3] })

  })

  //--------------------------------------


  function SetCurrency() {

    if (currency == '1') {
      return (
        <Text style={styles.highlight}> {price?.price + ' $'} </Text>
      )
    }

    if (currency == '2') {
      return (
        <Text style={styles.highlight}> {priceETH?.price + ' $'} </Text>
      )
    }

    if (currency == '3') {
      return (
        <Text style={styles.highlight}> {priceXRP?.price + ' $'} </Text>
      )
    }

  }

  return (
    <ScrollView>
      <Section title="Introduction">
        This app downloads data from Binance to show exact price of <Text style={styles.highlight}>Assets</Text> in editable intervals.
      </Section>

      <Section title='Time today'>
        <Text>{finalObject}</Text>
      </Section>

      <Section title='Select cryptocurrency'>

        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          //  maxHeight={50}
          value={currency}
          data={currency_arr}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select Cryptocurrency"
          searchPlaceholder="Search..."
          onChange={e => {
            setCurrency(e.value);
            console.log(e.value);
          }}
        />

      </Section>





      <Section title='Price of the asset in USDT'>

        {SetCurrency()}

      </Section>



      <Section title='Chart'>
        <View >

          <VictoryChart

            domainPadding={{ x: settingspaddig }}
            scale={{ x: "time" }}

          >

            <VictoryAxis tickFormat={(t) => SetSettings(t)} label={time} />
            <VictoryAxis dependentAxis label={'USDT'} />

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
              onPress={() => SetMonthGraph()}
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


  under: {
    flexDirection: 'column',
  },

  nextto: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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





