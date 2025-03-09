import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; 
import { CheckBox } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import logo from '../assets/taskiologo.png';


const TodoScreen = () => {
  /*defautl task list in a state variable here
  and also has the id unique identifier, boolean and description*/
  const [tasks, setTasks] = useState([
    { id: '1', 
      description: 'Buy groceries', 
      completed: false },
    { id: '2', 
      description: 'Go to the gym', 
      completed: false },
  ]);
  
  const [newTask, setNewTask] = useState('');

  //function to toggle completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  //function to add new task
  const addTask = () => {
    if (newTask.trim() === '') return; // Ignore empty inputs

    const newTaskObj = {
      id: Math.random().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        {/*Input and Button*/}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/*task List with flatlist and checkbox*/}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <CheckBox
                checked={item.completed}
                onPress={() => toggleTaskCompletion(item.id)}
                checkedIcon={<FontAwesome name="dot-circle-o" size={20} color="#E6A5F3" />}
                uncheckedIcon={<FontAwesome name="circle-o" size={20} color="#E6A5F3" />}
              />
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.description}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },  

  container: {
    backgroundColor: '#fff',
    maxWidth: 600, //limita el ancho para desktop
    width: '100%',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'DMSans_Bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    fontFamily: 'DMSans_Regular',
    fontSize: 16,
    outlineStyle: 'none',
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  taskText: {
    fontSize: 16,
    fontFamily: 'DMSans_Regular',
  },

  //required styling from professor
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  button: {
    backgroundColor: '#E6A5F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'DMSans_Bold',
  },

  logo: {
    width: 150,   // Adjust size as needed
    height: 150,  // Adjust size as needed
    resizeMode: 'contain',
    alignSelf: 'center',  // Centers the logo
    marginBottom: 10,
  },
  
});

export default TodoScreen;
