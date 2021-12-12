import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext} from 'react';
import {User} from '../../Context/UserContext';
import {COLOR} from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState();
  const {user, account} = useContext(User);

  useEffect(() => {
    if (user && account) {
      getCategories(account.id);
    }
  }, []);

  const getCategories = async account => {
    const categoriesSnapshot = await firestore().collection('categories').get();
    let cat = [];
    categoriesSnapshot.forEach(categorie => {
      if (categorie.data().account === account) {
        cat.push(categorie.data());
      }
    });
    setCategories(cat);
  };

  const renderList = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: COLOR.MAIN,
              border: '1px solid',
              padding: 10,
              margin: 5,
              borderRadius: 5,
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name={'book-outline'} size={24} color={COLOR.TEXT} />
              <Text style={{fontSize: 22}}>{item.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name={'time-outline'} size={24} color={COLOR.TEXT} />
              <Text>{item.tasks} Tareas pendientes</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={categories} renderItem={renderList} />
    </View>
  );
};

export default Categories;
