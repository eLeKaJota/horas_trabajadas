import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import Button from '../../Components/Form/Button';
import {Select} from '@mobile-reality/react-native-select-pro';
import {User} from '../../Context/UserContext';
import firestore from '@react-native-firebase/firestore';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import Login from '../Auth/Login';

const NewTask = ({navigation}) => {
  const [categories, setCategories] = useState();
  const {user, account} = useContext(User);

  useEffect(() => {
    if (user && account) {
      getCategories(account.id);
    }
  }, [account, user]);

  const getCategories = async account => {
    const categoriesSnapshot = await firestore().collection('categories').get();
    let cat = [];
    categoriesSnapshot.forEach(categorie => {
      if (categorie.data().account === account) {
        const catOption = {
          label: categorie.data().name,
          value: categorie.id,
        };
        cat.push(catOption);
      }
    });
    setCategories(cat);
  };

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: {
      name: '',
      notes: '',
      category: '',
      newCategory: '',
    },
    onSubmit: values => {
      (values.account = account.id), console.log(values);
      sendTask(values);
    },
  });

  const sendTask = async values => {
    firestore()
      .collection('tasks')
      .add({
        name: values.name,
        notes: values.notes,
        category: values.category,
        account: values.account,
        created: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Task added!');
      });
    navigation.navigate('TaskNavigator');
  };

  console.log(categories);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
      <Text style={{color: '#223e4b', fontSize: 20, marginBottom: 16}}>
        New Task
      </Text>
      <View style={{paddingHorizontal: 5, marginBottom: 16, width: '100%'}}>
        <TextInput
          placeholder="Task name"
          autoCapitalize={true}
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('name')}
          style={{
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          marginBottom: 16,
          width: '100%',
        }}>
        <TextInput
          placeholder="Task description"
          autoCapitalize={true}
          multiline={true}
          keyboardAppearance="dark"
          returnKeyType="next"
          onChangeText={handleChange('notes')}
          returnKeyLabel="next"
          style={{
            height: 180,
            borderWidth: 1,
            borderRadius: 5,
            textAlignVertical: 'top',
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          width: '100%',
        }}>
        <Select
          options={categories}
          placeholderText={'Select category'}
          onSelect={option => {
            values.category = option.value;
          }}
          searchable={true}
          selectControlStyle={{height: 50}}
        />
      </View>
      <Text>or</Text>
      <View style={{paddingHorizontal: 5, marginBottom: 16, width: '100%'}}>
        <TextInput
          placeholder="Create new category"
          autoCapitalize={true}
          keyboardAppearance="dark"
          onChangeText={handleChange('newCategory')}
          returnKeyType="next"
          returnKeyLabel="next"
          style={{
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
      </View>

      <Button label="Create New Task" onPress={handleSubmit} />
    </View>
  );
};

export default NewTask;
