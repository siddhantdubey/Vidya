import React from 'react';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
  } from '@chakra-ui/react';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"

  
  const Header = () => {
    return (
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Vidya{': '}
            <Text as={'span'} color={'orange.400'}>
              Study better
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Automatically make summaries and flashcards from YouTube videos, Zoom recordings, articles, and more.
            To export your flashcards and use them in Anki do the following:
          </Text>
          <OrderedList color={'gray.500'} textAlign={'left'}>
            <ListItem><Text color={'gray.500'} maxW={'3xl'}>Paste in your text into the input text section and hit Generate Summary.</Text></ListItem>
            <ListItem><Text color={'gray.500'} maxW={'3xl'}>Once the summary shows up in the right column, hit the generate flashcards button.</Text></ListItem>
            <ListItem><Text color={'gray.500'} maxW={'3xl'}>Once the flashcards are done generating, scroll down and hit export flashcards.</Text></ListItem>
            <ListItem><Text color={'gray.500'} maxW={'3xl'}>Open Anki, and import the text file into your deck.</Text></ListItem>
            <ListItem><Text color={'gray.500'} maxW={'3xl'}>Enjoy studying!</Text></ListItem>
          </OrderedList>
        </Stack>
      </Container>
    );
  }

export default Header;
  