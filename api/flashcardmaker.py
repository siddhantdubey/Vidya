import requests
import re
from flask_restful import Api, Resource, reqparse
from question_generation.pipelines import pipeline


alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov)"

def split_into_sentences(text):
    #shout out to the regexers on Stack Overflow LOLLLL
    """
    Regex to split a pargraph into a list of sentences. No NLTK needed!
    """
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences]
    return sentences


nlp = pipeline("question-generation")
class FlashcardMaker(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Vidya"
      }

  def post(self):
    """
    get in the summary, split the summary into a list of sentences, then loop through the sentences.
    each sentence will then be turned into a flashcard thanks to the gpt-j API. Other options may also be explored.
    """
    print("Request made")
    parser = reqparse.RequestParser()
    parser.add_argument('summaryText', type = str, required = True,
    help = 'No task title provided', location = 'json')
    args = parser.parse_args()
    request_text = args['summaryText']
    print(request_text)
    sentences = split_into_sentences(request_text)

    responses = []
    for sentence in sentences:
        print(sentence)
        try:
          flashcards = nlp(sentence)
          flashcards = [dict(t) for t in {tuple(d.items()) for d in flashcards}]
          responses.append(flashcards)
          print(flashcards)
        except:
          print("Unable to make a flashcard out of that sentence")
    return {"status": "Success", "messages": responses}
