import React, { useState, useRef } from 'react';
import {
  // Button,
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
// import DatePicker from 'react-native-date-picker';
import colors from '../../assets/colors';
import ButtonCom from '../components/ButtonCom';
import fontName from '../../assets/fontName';
import TextCom from '../components/TextCom';
import InputCom from '../components/InputCom';
import Calendar from '../icons/calendar.svg';
import Arrow from '../icons/arrow.svg';
import UpArrow from '../icons/upArrow.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Text } from 'react-native-svg';
// import Rectangle from '../components/Rectangle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default () => {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);
  const [dOpen, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [doneClicked, setDoneClicked] = useState(false);

  const [train, setTrain] = useState('');
  const [tOpen, settOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState('');
  const [clicked, setClicked] = useState(false);

  const minDate = new Date('2023-07-01');
  const maxDate = new Date('2024-12-31');
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dateString = new Date(date);
  // const dayName = weekday[date.getDay()];
  const dayName = weekday[dateString.getDay()];
  const monthName = dateString.toLocaleDateString('en-US', { month: 'short' });
  const dayNumber = dateString.getDate();
  const year = dateString.getFullYear();

  const [isAtBottom, setIsAtBottom] = useState(false);
  const flatListRef = useRef(null);

  // const handleDateChange = (newDate) => {
  //   setDate(newDate);
  // };
  const data1 = [
    {
      id: 1,
      trainName: 'Udarata Manike - Kotuwa',
    },
    {
      id: 2,
      trainName: 'Jaffna Mail - Kotuwa',
    },
    {
      id: 3,
      trainName: 'Yal Devi - Jaffna',
    },
    {
      id: 4,
      trainName: 'A234 Office Mail - Gampaha',
    },
    {
      id: 5,
      trainName: 'Awissawella Express - Awissawella',
    },
    {
      id: 6,
      trainName: 'Awissawella Express - Awissawell',
    },
    {
      id: 7,
      trainName: 'Awissawella Express - Awissawel',
    },
    {
      id: 8,
      trainName: 'Awissawella Express - Awissawe',
    },
  ];

  const renderItem1 = ({ item }) => (
    <View style={{ alignItems: 'center', marginBottom: 5, height: 50, borderBottomWidth: 1, borderBottomColor: colors.BORDER, }}>
      <TouchableOpacity onPress={() => handleTrainPress(item.trainName)}>
        <TextCom
          textCont={{}}
          text={{
            fontFamily: fontName.POPMEDIUM,
            fontSize: fontName.MEDIUM,
            color: selectedTrain === item.trainName ? colors.SELECTEDTEXT : colors.TEXTCOLOR4
          }}
          textShow={item.trainName}
        />
      </TouchableOpacity>
      {/* <Rectangle rectangle={styles.rectangle} /> */}
    </View>
  );
  // const handleScroll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const contentHeight = event.nativeEvent.contentSize.height;
  //   const windowHeight = event.nativeEvent.layoutMeasurement.height;

  //   // Calculate whether the FlatList is at the bottom
  //   const isAtBottom = offsetY + windowHeight >= contentHeight - 20; 

  //   setIsAtBottom(isAtBottom);
  // };
  const handleScroll = (event) => {
    if (event.nativeEvent) {
      const offsetY = event.nativeEvent.contentOffset.y;
      const contentHeight = event.nativeEvent.contentSize.height;
      const windowHeight = event.nativeEvent.layoutMeasurement.height;

      // Calculate whether the FlatList is at the bottom
      const isAtBottom = offsetY + windowHeight >= contentHeight - 5; // Adjust the threshold as needed
      // console.log(isAtBottom);
      setIsAtBottom(isAtBottom);
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };
  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      // Convert the selectedDate to a JavaScript Date object
      const newDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      // Set the newDate in the state
      setDate(newDate);
    }
    setDoneClicked(true);
    setOpen(false); // Close the date picker modal
  };
  // console.log(newDate);
  // console.log(dateString);
  // console.log(dayName);
  // console.log(monthName);
  // console.log(dayNumber);
  // console.log(year);

  // const handleDonePress = () => {
  //   setOpen(false);
  //   setSelectedDate(date);
  //   setDoneClicked(true);
  // };

  const handleTrainPress = (select) => {
    setSelectedTrain(select);
    console.log(select);
    setClicked(true);
    settOpen(false);
  };

  const renderDateModal = () => {
    return (
      <Modal
        visible={dOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalCont}>
          <View style={styles.dPickerCont}>
            {/* <TextCom
              textCont={styles.datePickerHeader}
              text={styles.datePickerHeadText}
              textShow={`${dayName}, ${monthName} ${dayNumber}, ${year}`}
            /> */}
            {/* <View style={styles.dPicker}> */}

            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="calendar"
              onChange={handleDateChange}
              style={styles.datePicker}
              minimumDate={minDate}
              maximumDate={maxDate}

            />
            {/* </View> */}
            {/* <ButtonCom
              buttonContainer={styles.btnCont}
              btn={styles.btnText}
              bTitle="Done"
              Path={handleDonePress}
            /> */}
          </View>
        </View>
      </Modal>
    );
  };

  const renderTrainModal = () => {
    return (
      <Modal
        visible={tOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => settOpen(!tOpen)}
      >
        <View style={styles.modalCont}>
          <View style={styles.tPickerCont}>
            <View style={styles.tPickerTopText}>

              <TextCom
                textCont={styles.trainTextCont}
                text={styles.trainText}
                textShow="Select your train"
              />
              {/* <ButtonCom
                buttonContainer={styles.trainBtnCont}
                btn={styles.trainBtnText}
                bTitle="Select your train"
                Path={handleTrainPress}
              /> */}
            </View>
            <View style={styles.trainPicker}>
              {/* <Text style={{ color: 'red' }}>hello</Text> */}
              <FlatList
                ref={flatListRef} // Attach the ref
                data={data1}
                renderItem={renderItem1}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScroll}
                onEndReachedThreshold={0.1}
                onScroll={(event) => handleScroll(event)}
              />

            </View>
            <View style={styles.upIconCont}>
              {isAtBottom && (
                <TouchableOpacity onPress={scrollToTop}>
                  <UpArrow size={5} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderDateModal()}
      {renderTrainModal()}

      <View style={styles.topContainer}>
        <TextCom
          textCont={{ margin: 0, padding: 0, }}
          text={styles.topText1}
          textShow='Quick Scan'
        />
        <TextCom
          textCont={{ margin: 0, padding: 0, }}
          text={styles.topText2}
          textShow='Select date and time'
        />
      </View>


      <View style={styles.middleContainer}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity onPress={() => setOpen(!dOpen)}>
            <InputCom
              container={[styles.inputStyle, { marginTop: 30 }]}
              textShow={doneClicked ? `${dayName}, ${monthName} ${dayNumber}, ${year}` : "Selected Date"} // Display selected date or "Selected Date"
              phtc={colors.DARKTEXT}
              input={[styles.input]}
              editable={false}
            />
            <View style={styles.inputEndIcon}>
              <Calendar size={5} fill={colors.DARKTEXT} />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity onPress={() => settOpen(!tOpen)}>
            <InputCom
              container={[styles.inputStyle, { marginTop: 30, }]}
              textShow={clicked ? `${selectedTrain}` : "Select Train"}
              phtc={colors.DARKTEXT}
              input={[styles.input]}
              editable={false}
            />
            <View style={[styles.inputEndIcon, { paddingLeft: 5, }]}>

              <Arrow size={5} fill={colors.DARKTEXT} />

            </View>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.bottomContainer}>
        {!dOpen && !tOpen && (<ButtonCom
          buttonContainer={styles.bottomContbtn}
          btn={styles.btn} bTitle="Next"
        // Path={() => navigation.navigate('Scan')}
        />)}
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 3,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.77,
    // backgroundColor: 'yellow',
  },
  topText1: {
    fontSize: fontName.EXLARGE,
    fontFamily: fontName.POPSEMIBOLD,
    color: colors.TEXTCOLOR1,
  },
  topText2: {
    fontSize: fontName.EXSMALL,
    fontFamily: fontName.POPBOLD,
    color: colors.TEXTCOLOR1,

  },
  middleContainer: {
    // backgroundColor: 'orange',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  inputStyle: {
    width: windowWidth * 0.77,
  },
  input: {
    color: colors.DARKTEXT,
    fontFamily: fontName.POPSEMIBOLD,
    fontSize: fontName.MEDIUM,
    // position: 'relative',
    // backgroundColor: colors.SURFACE,
  },
  inputEndIcon: {
    width: 20,
    height: 20,
    zIndex: 1,
    position: 'absolute',
    marginTop: 30,
    marginLeft: windowWidth * 0.7
  },
  bottomContainer: {
    flex: 3,
    // width: windowWidth * 0.77,
    flexDirection: 'center',
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  bottomContbtn: {
    width: windowWidth * 0.91,
    marginTop: 30,
    backfaceVisibility: 'hidden'
  },
  btn: {
    fontFamily: fontName.POPMEDIUM,
    fontSize: fontName.LMEDIUM,
    color: colors.SURFACE,
  },
  modalCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SURFACEOVERLAY,
  },
  dPicker: {
    // width: 200,
    flex: 3,
    paddingTop: 15,
  },
  dPickerCont: {
    flexDirection: 'column',
    backgroundColor: colors.SURFACE,
    height: windowHeight * 0.47,
  },
  datePicker: {
    backgroundColor: 'red',
  },
  tPickerCont: {
    flexDirection: 'column',
    backgroundColor: colors.SURFACE,
    height: windowHeight * 0.72,
    width: windowWidth * 0.91,
    borderRadius: 7,
    alignItems: 'center',
  },
  tPickerTopText: {
    // flex: 3,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  trainText: {
    fontSize: fontName.LARGE,
    fontFamily: fontName.POPBOLD,
    color: colors.TEXTCOLOR3,
  },
  trainTextCont: {
    backgroundColor: colors.BLUE,
    height: 95,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    // marginTop: 10,
    // marginBottom: 10,
    justifyContent: 'center',
    width: windowWidth * 0.91,
    alignItems: 'center',
    // width: windowWidth * 0.79,


  },
  trainPicker: {
    flex: 7,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 38,
    // zIndex: 1,
  },
  upIconCont: {
    flex: 1,
    // elevation: 5,
    // backgroundColor: 'red',
    width: windowWidth * 0.91,
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnText: {
    color: colors.TEXTCOLOR2,
    fontFamily: fontName.POPREGULAR,
    fontSize: fontName.SMALL,
  },
  btnCont: {
    backgroundColor: colors.SURFACE,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: colors.VIEWFILL,
    height: 50,
  },
  datePickerHeader: {
    borderBottomWidth: 2,
    borderBottomColor: colors.DATETEXT,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 15,
    flex: 1,
  },
  datePickerHeadText: {
    fontSize: fontName.LARGE,
    fontFamily: fontName.POPMEDIUM,
    color: colors.DATETEXT,
  },
  rectangle: {
    backgroundColor: colors.LIGHTBLUE,
    // width: 2, 
    height: 1,
    // margin: 12
    // marginBottom: 10,
    marginTop: 10,
  },
})
