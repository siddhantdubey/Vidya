from flask_restful import Api, Resource, reqparse
from summarizer import Summarizer

class ApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Vidya"
      }

  def post(self):
    print("Request made")
    parser = reqparse.RequestParser()
    parser.add_argument('text', type = str, required = True,
    help = 'No task title provided', location = 'json')
    args = parser.parse_args()

    print(args)
    request_text = args['text']
    model = Summarizer()
    result = model(request_text, ratio=0.3)
    full = ''.join(result)
    print(full)
    final_ret = {"status": "Success", "message": full}
    return final_ret