import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Input,  Center, Container, Textarea, Text, Box, SimpleGrid, ChakraProvider, Button, ButtonGroup, HStack } from "@chakra-ui/react"
import Flashcard from './components/Flashcard'
import Header from './components/Header'




function App() {
  const [getMessage, setGetMessage] = useState({})
  const [text, setText] = useState('LOL')
  const [videoURL, setVideoURL] = useState({})
  const [summaryText, setSummaryText] = useState({})
  const [flashcards, setFlashcards] = useState([[{answer: "Will go here", question: "The flashcards"}]])
  const [inputType, setInputType] = useState('Text')
  const [pasted, setPasted] = useState(false)
 
  

  const handlePaste = () => {
    setPasted(true);
  };
  return (
    <ChakraProvider>
    <div className="App">
      <Header/>
      <Container>
        <Center>
          <HStack spacing={"24px"} align={'center'}>
            <Button color='teal' size='lg' onClick={e => {
              e.preventDefault();
              setInputType('Video');
            }}>
              Video
            </Button>
            <Button color='teal' size='lg' onClick={e => {
              e.preventDefault();
              setInputType('Text');
            }}>
              Text
            </Button>
          </HStack>
        </Center>
      </Container>
      <SimpleGrid columns={2} spacing={10} paddingTop={'50px'}>
        <Text fontSize="4xl">Input Text</Text>
        <Text fontSize="4xl">Output Summary</Text>
        {inputType == 'Text' &&
          <Textarea size="lg" placeholder="Text to be summarized goes here." onChange = { e => {setText(e.target.value)}}/>
        }
        {inputType == 'Video' &&
          <Input size="lg" placeholder="Video link to be summarized goes here." onPaste={ e => {
            console.log(e.clipboardData.getData('text'))
            setVideoURL(e.target.value)
            console.log(videoURL)
          }
          } 
            onChange = { e => {
              setVideoURL(e.target.value);
              console.log(videoURL)
            }
            
          }/>
        }
        
        <header className="App-header">
          <div>{getMessage.status === 200 ? 
            <Text fontSize="lg">{getMessage.data.message}</Text>
            :
            <h3>No submission made</h3>}</div>
        </header>
        <Button colorScheme="teal" size="lg" onClick={e => {
          e.preventDefault();
          console.log({text});
          if (inputType == 'Text'){
            console.log('It is text apparently')
            axios.post('http://localhost:5000/flask/summary', {text }).then(response => {
              console.log(response)
              setGetMessage(response)
              setSummaryText(response.data.message)
            })
          }
          else if (inputType == 'Video'){
            axios.post('http://localhost:5000/flask/videosummary', {videoURL }).then(response => {
              console.log(videoURL)
              console.log(response)
              setGetMessage(response)
              setSummaryText(response.data.message)
            })
          }
          }}>
          Generate Summary
        </Button>
        <Button colorScheme="teal" size="lg" onClick={e => {
          e.preventDefault();
          axios.post('http://localhost:5000/flask/flashcards', {summaryText }).then(r => {
            setFlashcards(r.data.messages)
            console.log(flashcards[0][0])
            flashcards.forEach(item => console.log(item[0]));
          })
        }}>
          Generate Flashcards 
        </Button>
      </SimpleGrid>
      <SimpleGrid columns={4} spacing={10}>
        {flashcards.map(function (data) {
              const { answer, question } = data[0];
              return (
                <Flashcard
                  answer = {answer}
                  question = {question}
                />
              );
            })}
      </SimpleGrid>
      <Button colorScheme="teal" size="lg" textAlign={'center'} onClick={e => {
        e.preventDefault();
        console.log('button pressed')
        const element = document.createElement("a");
        let list = []
        flashcards.forEach(item => {
          let string = ""
          string = string.concat(item[0].question)
          string = string.concat('; ')
          string = string.concat(item[0].answer)
          list.push(string);
        })
        const file = new Blob([list.join('\n')], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }}>
        Export flashcards to Anki.
      </Button>
    </div>
    </ChakraProvider>
  );
}

export default App;