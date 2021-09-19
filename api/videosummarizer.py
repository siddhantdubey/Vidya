from flask_restful import Api, Resource, reqparse
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
from summarizer import Summarizer





# noinspection PyTypeChecker
def extract_video_id(url):
    query = urlparse(url)
    if query.hostname == 'youtu.be': return query.path[1:]
    if query.hostname in {'www.youtube.com', 'youtube.com'}:
        if query.path == '/watch': return parse_qs(query.query)['v'][0]
        if query.path[:7] == '/watch/': return query.path.split('/')[1]
        if query.path[:7] == '/embed/': return query.path.split('/')[2]
        if query.path[:3] == '/v/': return query.path.split('/')[2]
        # below is optional for playlists
        if query.path[:9] == '/playlist': return parse_qs(query.query)['list'][0]
   # returns None for invalid YouTube url

class VideoSummarizer(Resource):

  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Vidya"
      }

  def post(self):
    print("Request made")
    parser = reqparse.RequestParser()
    print("working")
    parser.add_argument('videoURL', type = str, required = True,
    help = 'No task title provided', location = 'json')
    print("working")
    args = parser.parse_args()
    request_text = args['videoURL']
    print(request_text)
    print(extract_video_id(request_text))
    transcript = YouTubeTranscriptApi.get_transcript(extract_video_id(request_text))
    all_text = ""
    for item in transcript:
        all_text += item['text'] + " "
    print(all_text)
    model = Summarizer()
    result = model(all_text, ratio=0.3)
    full = ''.join(result)
    print(full)
    final_ret = {"status": "Success", "message": full}
    return final_ret

    