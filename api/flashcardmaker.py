import requests
import re
from flask_restful import Api, Resource, reqparse

alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov)"

def split_into_sentences(text):
    #shout out to the regexers on Stack Overflow LOLLLL
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

    for sentence in sentences:
        print(sentence)
        context = f"""
            Highlight: The arms and legs are the extremities.
            Flashcard: What are the extremeities?
            ###
            Highlight: Christopher Columbus, sailed from Spain in 1492 and reached the Americas.
            Flashcard: Who is Christopher Columbus?
            ###
            Highlight: He attacked the castle because he thought it would net him riches.
            Flashcard: Why did he attack the castle?
            ###
            Highlight: The capitol riots took place on January 26th, 2021.
            Flashcard: When did the capitol riots take place?
            ###
            Highlight: World War II started in 1939.
            Flashcard: When did World War II start?
            ### 
            Highlight: They ended up losing to the better team.
            Flashcard: What happened to them?
            ###
            Highlight: {sentence}
        """
        payload = {
            "context": context,
            "token_max_length": 70,
            "temperature": 0.7,
            "top_p": 0.9,
        }
        response = requests.post("http://api.vicgalle.net:5000/generate", params=payload).json()
        print(response['text'])
