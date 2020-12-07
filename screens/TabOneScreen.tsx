import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, SectionList} from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { DarkTheme } from '@react-navigation/native';

export default function TabOneScreen() {

  const [sprite, setSprite] = useState('');
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.subItem}>{title}</Text>
    </View>
  );

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/charizard').then((result) => {
      const { data } = result;
      setSprite(data.sprites.back_default)

      let general = [];
      general.push(
        {
          key: 'Height',
          value: data.height
        },
        {
          key: 'Weight',
          value: data.weight
        }
      );
      setData(general);


      let types = [{
        title: "Types",
        data: []
      }];
      data.types.map(item => {
        types[0].data.push(item.type.name)
      });
      setTypes(types);
      
      
      let abilities = [{
        title: "Abilities",
        data: []
      }];
      data.abilities.map(item => {
        abilities[0].data.push(item.ability.name)
      });
      setAbilities(abilities);

    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: sprite }}
        />
      </View>

      <ScrollView style={styles.infoContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>About</Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList
          data={data}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.key}: {item.value}</Text>}
        />
        <SectionList
          sections={types}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.listItem}>{title}</Text>
          )}
        />
        <SectionList
          sections={abilities}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.listItem}>{title}</Text>
          )}
        />
      </ScrollView>
    </View>
  );
}

const bgColor = '#FFEEB0';
const sectionTitleColor = 'red';
const baseColor = 'orange';
// const secondaryColor = '#F2684A';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${bgColor}`,
  },
  imageContainer: { 
    width: '100%',
    padding: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${bgColor}`,
  },
  image: { 
    width: 200,
    height: 200,
  },
  infoContainer: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: `${baseColor}`,
  },
  sectionTitleContainer: {
    padding: 7,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: `${sectionTitleColor}`,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  subItem: {
    fontSize: 18,
    padding: 4,
    paddingLeft: 21,
    backgroundColor: `${baseColor}`,
  },
  item: {
    fontSize: 20,
    color: 'violet'
  },
  listItem: {
    fontSize: 20,
    margin: 7
  },
  separator: {
    marginVertical: 3,
    height: 1,
    width: '80%',
  },
});
