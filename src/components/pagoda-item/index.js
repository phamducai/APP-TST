import React from 'react';
import {Card, Paragraph} from 'react-native-paper';
import {Button} from 'react-native';
import {withTheme} from 'react-native-paper';

const PagodaItem = withTheme(
  ({theme: {colors}, id, data, onItemPress, onMorePress}) => {
    const {name, address, phone, location} = data;
    return (
      <Card style={{backgroundColor: colors.background}}>
        <Card.Title
          title={name}
          onPress={() => onItemPress({id, name, address, phone, location})}
        />
        <Card.Content>
          <Paragraph>Địa chỉ: {address}</Paragraph>
          <Paragraph>Điện thoại: {phone}</Paragraph>
        </Card.Content>
        <Card.Actions style={{flexDirection: 'row-reverse'}}>
          <Button
            color={colors.accent}
            title={'Chỉ đường'}
            onPress={() => onMorePress({id, name, address, phone, location})}
          />
        </Card.Actions>
      </Card>
    );
  },
);

export default PagodaItem;
