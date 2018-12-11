// @flow
import React from 'react';
import { Modal, Picker, DatePickerIOS } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import moment from 'moment';

import { Input, Button } from '../index';

/**
 * Props type for PickerComponent
 */
export type PickerProps = {
  /**
   * Picker type
   */
  type: 'datetime' | 'picker',

  /**
   * Unique key to identify the picker
   */
  key: number,

  /**
   * Placeholder to display on the input.
   * @default Value
   */
  placeholder?: string,

  toggleModal: () => void,
  setModalState: () => void,
  isModalOpened: boolean,

  /**
   * Function to handle inputValue change
   */
  handleSetValue: (Date) => void,
  setInputValue: (string) => void,
  inputValue: Date,

  minimumDate: any,

  /**
   * Callback it value has set
   */
  onSetValue: (string) => void,

  items?: Array<{
    id: number,
    label: string,
  }>,
  title?: string,
};

const PickerComponent = (props: PickerProps) => (
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
      <View paddingH-15 flex-1 centerV>
        <Text h2 center marginB-20>{props.title}</Text>
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
              {props.items && props.items.map(item => <Picker.Item key={item.id} {...item} />)}
            </Picker>
          )
        }
        <Button onPress={props.toggleModal} style={{ marginTop: 20 }}>Save</Button>
      </View>
    </Modal>
  </View>
);

PickerComponent.defaultProps = {
  placeholder: 'Value',
};

export default PickerComponent;
