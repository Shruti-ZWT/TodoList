import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const API_URL = 'https://fakestoreapi.com/products';

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setTimeout(() => {
        setIsLoading(false); 
        // Set loading to false after data is fetched
      }, 1000);
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }: any) => (
    <Card item={item} />
  );

  return (
    <View>
        {isLoading 
        ? (
            <ActivityIndicator size="large" color="#007bff"/>
            ) : 
      (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
      />
      )
      }
    </View>
  );
};

const Card = ({ item }: any) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
        <View style= {styles.bottomContainer}>
        <Text style={styles.price}>Rs: {item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      margin: 5,
      padding: 10,
      elevation: 3,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 5,
    },
    textContainer: {
      marginBottom: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      color: 'gray',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      position: 'absolute',
      marginTop: 150,
      bottom: 2, 
      left: 0,
    },
    bottomContainer: {
        flex: 1,
        marginTop: 20
    },
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 2,
      position: 'absolute',
      bottom: 2,
      right: 10,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default Products;
