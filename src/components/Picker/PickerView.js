import React from 'react';
import { Modal, Picker } from 'react-native';
import { View } from 'react-native-ui-lib';

import { Input, Button } from '../index';

const PickerComponent = props => (
  <View>
    <Input
      key={props.key}
      placeholder={props.placeholder}
      onFocus={() => props.setModalState(true)}
      value={props.inputValue}
    />
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isModalOpened}
    >
      <View flex-1 centerV>
        <Picker
          selectedValue={props.inputValue}
          onValueChange={itemValue => props.handleSetValue(itemValue)}
        >
          {props.items.map(item => <Picker.Item key={item.id} {...item} />)}
        </Picker>
      </View>
      <View flex-0>
        <Button onPress={() => props.setModalState(false)} style={{ borderBottomWidth: 20 }}>Save</Button>
      </View>
    </Modal>
  </View>
);

export default PickerComponent;
