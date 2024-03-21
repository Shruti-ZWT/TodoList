import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

const ConfirmationModal = ({ visible,title, onConfirm, onCancel }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text>{title}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="Confirm" onPress={onConfirm} />
            <View style={{ width: 10 }} />
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
