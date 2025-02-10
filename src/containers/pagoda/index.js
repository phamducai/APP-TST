import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {PagodaItem} from '../../components';
import {Divider} from 'react-native-paper';
import {ScreenName} from '../../navigation/screen';
import {connect} from 'react-redux';
import {fetchPagodasAction} from '../../store/actions';

const mapStateToProps = state => {
  return {
    fetching: state.pagodaReducers.fetching,
    pagodas: state.pagodaReducers.pagodas,
    error: state.pagodaReducers.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchPagodas: () => dispatch(fetchPagodasAction()),
  };
};

const Pagoda = ({navigation, fetchPagodas, pagodas, fetching}) => {
  // useEffect(() => {
  //   fetchPagodas();
  // }, []);

  const onRefresh = () => {
    fetchPagodas();
  };

  return (
    <FlatList
      data={pagodas}
      onRefresh={onRefresh}
      refreshing={fetching}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => (
        <PagodaItem
          {...item}
          onItemPress={item => {
            console.log(item);
          }}
          onMorePress={item => {
            navigation.navigate(ScreenName.PagodaMap, item);
          }}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const PagodaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagoda);

export default PagodaContainer;
