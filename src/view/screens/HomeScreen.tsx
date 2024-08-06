import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import COLORS from '../../consts/colors';
import plants from '../../consts/plants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const cardWidth = width / 2 - 30;
const headerHeight = height * 0.1; // 10% of screen height
const searchHeight = height * 0.07; // 7% of screen height
const imageSize = 40;

interface Plant {
  id: number;
  name: string;
  price: string;
  like: boolean;
  img: any;
  about: string;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTextContainer: ViewStyle;
  headerImageContainer: ViewStyle;
  searchContainer: ViewStyle;
  input: TextStyle;
  sortBtn: ViewStyle;
  categoryContainer: ViewStyle;
  categoryButton: ViewStyle;
  categoryButtonSelected: ViewStyle;
  headerText: TextStyle;
  headerTextBold: TextStyle;
  image: ImageStyle;
  searchImage: ImageStyle;
  sortImage: ImageStyle;
  categoryText: TextStyle;
  categoryTextSelector: TextStyle;
  card: ViewStyle;
  favoriteIconContainer: ViewStyle;
  favoriteImage: ImageStyle;
}

type HomeScreenProps = {
  navigation?: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const categories: string[] = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const dispatch = useDispatch();

  const CategoryList: React.FC = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCategoryIndex(index)}
            activeOpacity={0.8}
            style={[
              styles.categoryButton,
              categoryIndex === index && styles.categoryButtonSelected,
            ]}>
            <Text
              style={[
                styles.categoryText,
                categoryIndex === index && styles.categoryTextSelector,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  const handleAddToCart = (plant: Plant) => {
    dispatch(addToCart(plant));
  };

  const Card: React.FC<{ plant: Plant }> = ({ plant }) => {
    const isFavorite = favorites.includes(plant.id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation?.navigate('Details', plant)}>
        <View style={styles.card}>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={[
                styles.favoriteIconContainer,
                {
                  backgroundColor: isFavorite
                    ? 'rgba(245, 42, 42,0.2)'
                    : 'rgba(0,0,0,0.2)',
                },
              ]}>
              <TouchableOpacity onPress={() => toggleFavorite(plant.id)} activeOpacity={100}>
                <Image
                  source={require('../../assets/images/favoriteImage.png')}
                  style={[
                    styles.favoriteImage,
                    { tintColor: isFavorite ? COLORS.red : COLORS.dark },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={plant.img}
              style={{ flex: 1, resizeMode: 'contain' }}
            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
            {plant.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
              ${plant.price}
            </Text>
            <TouchableOpacity onPress={() => handleAddToCart(plant)}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: COLORS.green,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    paddingBottom: 2,
                  }}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Welcome to</Text>
          <Text style={styles.headerTextBold}>Plant Shop</Text>
        </View>
        <View style={styles.headerImageContainer}>
          <TouchableOpacity onPress={() => navigation?.navigate('Cart')}>
            <Image source={require('../../assets/images/cartImage.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={styles.searchContainer}>
          <Image source={require('../../assets/images/searchImage.png')} style={styles.searchImage} />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Image source={require('../../assets/images/sortImage.png')} style={styles.sortImage} />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={plants}
        renderItem={({ item }) => {
          return <Card plant={item} />;
        }}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04, // 5% of screen width
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: headerHeight,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingTop:30,
  },
  headerTextContainer: {
    flex: 1,
    paddingLeft: width * 0.02, // 2% of screen width
  },
  headerImageContainer: {
    paddingRight: width * 0.02, // 2% of screen width
  },
  searchContainer: {
    height: searchHeight,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02, // 2% of screen width
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    backgroundColor: COLORS.green,
    marginLeft: width * 0.02, // 2% of screen width
    height: searchHeight,
    width: searchHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryButton: {
    paddingVertical: 10,
  },
  categoryButtonSelected: {
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  headerText: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: 'bold',
  },
  headerTextBold: {
    fontSize: width * 0.08, // Responsive font size
    color: COLORS.green,
    fontWeight: 'bold',
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
  searchImage: {
    width: imageSize * 0.5, // 50% of imageSize
    height: imageSize * 0.5,
    marginRight: width * 0.02, // 2% of screen width
  },
  sortImage: {
    height: imageSize * 0.6, // 60% of imageSize
    width: imageSize * 0.6,
  },
  categoryText: {
    fontSize: width * 0.04, // Responsive font size
    color: COLORS.dark,
  },
  categoryTextSelector: {
    fontSize: width * 0.04, // Responsive font size
    color: COLORS.green,
    fontWeight: 'bold',
  },
  card: {
    width: cardWidth,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  favoriteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain', // Ensures the image is not cropped
  },
});

export default HomeScreen;
