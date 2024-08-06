import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../redux/cartSlice';
import COLORS from '../../consts/colors';

const CartScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.plant.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.plant.img} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.plant.name}</Text>
              <Text style={styles.price}>${item.plant.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrement(item.plant.id)}>
                  <Text style={styles.quantityBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item.plant.id)}>
                  <Text style={styles.quantityBtn}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleRemove(item.plant.id)}>
                <Text style={styles.removeBtn}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.light,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  price: {
    fontSize: 16,
    color: COLORS.green,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  removeBtn: {
    fontSize: 16,
    color: COLORS.red,
  },
});

export default CartScreen;
