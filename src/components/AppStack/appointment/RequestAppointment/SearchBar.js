import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="name, location, or specialization"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
});

export default SearchBar;
