from rest_framework.decorators import api_view
from .models import FAQ
from .serializers import FAQSerializer
from django.http import JsonResponse

import time

@api_view(['GET'])
def get_faq(request, format=None):
    faq = FAQ.objects.all()
    serializer = FAQSerializer(faq, many=True)
    response = JsonResponse(serializer.data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response
