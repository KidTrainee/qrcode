import React from 'react';
import { Modal, DatePickerIOS } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';

import { Input, Button } from '../index';

const DateTimePicker = props => (
  <View>
    <Input
      key={props.key}
      placeholder={props.placeholder}
      onFocus={() => props.setModalState(true)}
      value={props.inputValue ? moment(props.inputValue).format('DD-MM-YYYY HH:MM') : null}
    />
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isModalOpened}
    >
      <View flex-1 centerV>
        <DatePickerIOS
          date={props.inputValue ? props.inputValue : new Date()}
          onDateChange={props.setInputValue}
        />
      </View>
      <View flex-0>
        <Button onPress={() => props.setModalState(false)} style={{ borderBottomWidth: 20 }}>Save</Button>
      </View>
    </Modal>
  </View>
);

export default DateTimePicker;
