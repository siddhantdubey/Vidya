# Vidya

It is a pain going through long lectures and videos and constructing flashcards manually while also attempting to digest the content. So to address this issue, I came up with Vidya. You can enter either text or a URL to a YouTube video and then have that video/article summarized. Once you're done reviewing the summary, you can generate flashcards from the summary which you can then export to Anki for use in any one of your decks for easy studying. Vidya is powered by BERT for summarizing and question generation and uses the YouTubeTranscriptAPI to get video transcripts. It uses React for the frontend and Flask for the backend.

APIS AND LIBRARIES USED:
- [BERT Extractive Summarizer](https://github.com/dmmiller612/bert-extractive-summarizer)
- [YouTube Downloader API](https://github.com/jdepoix/youtube-transcript-api)
- [BERT Question Generation Library](https://github.com/patil-suraj/question_generation)