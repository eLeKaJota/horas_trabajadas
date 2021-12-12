import React, {useEffect, useState} from 'react';
import {
  Button,
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

const Tasks = ({navigation, category}) => {
  const [tasks, setTasks] = useState();
  const {user, account} = useContext(User);

  useEffect(() => {
    if (user && account) {
      getTasks(account.id);
    }
  }, []);

  const getTasks = async account => {
    const tasksSnapshot = await firestore().collection('tasks').get();
    let tsk = [];
    tasksSnapshot.forEach(task => {
      if (task.data().account === account) {
        tsk.push(task.data());
      }
    });
    setTasks(tsk);
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
              <Text> Horas</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Button
        onPress={() => navigation.navigate('Categories')}
        title={'Categorías'}
      />
      <FlatList data={tasks} renderItem={renderList} />
    </View>
  );
};

export default Tasks;
