import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Textarea } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"
import Header from './components/Header'

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [text, setText] = useState('LOL')
  const [summaryText, setSummaryText] = useState({})


  useEffect(()=>{
    // axios.get('http://localhost:5000/flask/hello').then(response => {
    //   console.log("SUCCESS", response)
    //   setGetMessage(response)
    // }).catch(error => {
    //   console.log(error)
    // })
    // let text = "It has been featured prominently in many films, including Men in Black 3, Spider-Man, Armageddon, Two Weeks Notice and Independence Day. The previous sale took place just before the 2008 financial meltdown led to a plunge in real estate prices. Still there have been a number of high profile skyscrapers purchased for top dollar in recent years, including the Waldorf Astoria hotel, which Chinese firm Anbang Insurance purchased in 2016 for nearly $2 billion, and the Willis Tower in Chicago, which was formerly known as Sears Tower, once the world's tallest. Blackstone Group (BX) bought it for $1.3 billion 2015."
    // console.log(text)
    // console.log({text})
    // axios.post('http://localhost:5000/flask/hello', {text }).then(response => {
    //   console.log(response)
    //   setGetMessage(response)
    // })
    console.log("pog")
  }, [])

  
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
        console.log({text});
        axios.post('http://localhost:5000/flask/flashcards', {summaryText }).then(response => {
          console.log(response)
        })
        }}>
        Generate Flashcards 
      </Button>
      </SimpleGrid>
      
    </div>
    </ChakraProvider>
  );
}

export default App;