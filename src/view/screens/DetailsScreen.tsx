import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import COLORS from '../../consts/colors';

const backImage = require('../../assets/images/backImage.png');
const cartImage = require('../../assets/images/cartImage.png');

interface Plant {
  id: number;
  name: string;
  price: string;
  like: boolean;
  img: any;
  about: string;
}

interface DetailsScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  route: {
    params: Plant;
  };
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const plant = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(plant.id));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(plant.id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backImage} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={cartImage} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={plant.img} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.line} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{plant.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrementQuantity}>
                <Text style={styles.quantityBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>1</Text>
              <TouchableOpacity onPress={handleIncrementQuantity}>
                <Text style={styles.quantityBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.price}>${plant.price}</Text>
          <Text style={styles.about}>{plant.about}</Text>
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal:150
            
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: COLORS.light,
    borderRadius: 10,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.light,
    marginVertical: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    fontSize: 20,
    color: COLORS.green,
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    color: COLORS.dark,
  },
  price: {
    fontSize: 20,
    color: COLORS.green,
    marginVertical: 10,
  },
  about: {
    fontSize: 16,
    color: COLORS.dark,
    marginVertical: 10,
  },
  addToCartBtn: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addToCartText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
