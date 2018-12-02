
// @flow
import React from 'react';
import { Modal, Picker, DatePickerIOS } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';

import { Input, Button } from '../index';

type Props = {
  type: string,
  key: number,
  placeholder: string,
  toggleModal: () => void,
  inputValue: string,
  isModalOpened: boolean,
  handleSetValue: (string) => void,
  minimumDate: any,
}

const PickerComponent = (props: Props) => (
  <View>
    <Input
      key={props.key}
      placeholder={props.placeholder}
      onFocus={props.toggleModal}
      value={props.type === 'datetime'
        ? props.inputValue && moment(props.inputValue).format('DD-MM-YYYY HH:MM')
        : props.inputValue
      }
    />
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isModalOpened}
    >
      <View flex-1 centerV>
        {props.type === 'datetime'
          ? (
            <DatePickerIOS
              date={props.inputValue ? props.inputValue : new Date()}
              onDateChange={props.handleSetValue}
              minimumDate={props.minimumDate}
            />
          ) : (
            <Picker
              selectedValue={props.inputValue}
              onValueChange={props.handleSetValue}
            >
              {props.items.map(item => <Picker.Item key={item.id} {...item} />)}
            </Picker>
          )
        }
        <Button onPress={props.toggleModal} style={{ marginTop: 20 }}>Save</Button>
      </View>
    </Modal>
  </View>
);

export default PickerComponent;
