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
          </Text>
          {/* <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}>
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack> */}
        </Stack>
      </Container>
    );
  }

export default Header;
  