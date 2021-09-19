import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Textarea } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"
import Flashcard from './components/Flashcard'
import { Button, ButtonGroup } from "@chakra-ui/react"
import Header from './components/Header'




function App() {
  const [getMessage, setGetMessage] = useState({})
  const [text, setText] = useState('LOL')
  const [summaryText, setSummaryText] = useState({})
  const [flashcards, setFlashcards] = useState([[{answer: "Will go here", question: "The flashcards"}]])
  const [download, setDownload] = useState(0)

  return (
    <ChakraProvider>
    <div className="App">
      {/* <header className="App-header">
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header> */}
      <Header />
      <SimpleGrid columns={2} spacing={10}>
        <Text fontSize="4xl">Input Text</Text>
        <Text fontSize="4xl">Output Summary</Text>
        <Textarea
          size="lg"
          placeholder="Text to be summarized goes here."
          onChange = { e => {
            setText(e.target.value)
          }}
        />
        <header className="App-header">
          <div>{getMessage.status === 200 ? 
            <Text fontSize="lg">{getMessage.data.message}</Text>
            :
            <h3>No submission made</h3>}</div>
        </header>
        <Button colorScheme="teal" size="lg" onClick={e => {
          e.preventDefault();
          console.log({text});
          axios.post('http://localhost:5000/flask/summary', {text }).then(response => {
            console.log(response)
            setGetMessage(response)
            setSummaryText(response.data.message)
          })
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