from rest_framework.views import (APIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()
from datetime import datetime, timedelta
from django.conf import settings


import jwt # Importing whole library rather than modules from JWT.
from .serializers.common import UserSerializer


# Create your views here.
class RegisterView(APIView):
    
    def post(self, request):
        user_to_create = UserSerializer(data = request.data)
        try:
            user_to_create.is_valid(True)
            print("register endpoint")
            user = user_to_create.save()
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode(
                {
                  "sub": user.id, 
                  "exp": int(dt.strftime('%s'))
                },
                settings.SECRET_KEY,
                "HS256"
            )
            print('TOKEN', token)
            return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response (e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')
        print("login endpoint")
        print("request username ->", request.data.get('username'))
        print("request password ->", request.data.get('password'))
        try:
            #check username exists
            user_to_login = User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied("invalid credentials")

            # check passwords match
        if not user_to_login.check_password(password):
            raise Response({ 'message': 'invalid credentials' })

            #at thi point user is valid, send a token
        dt = datetime.now() + timedelta(days=7)
            
        token = jwt.encode(
            #payload
            {
                "sub": user_to_login.id,
                "exp": int(dt.strftime('%s'))
            },
            #secret
            settings.SECRET_KEY,
            #algorithm
            "HS256"
        )
        print("token->", token)
        return Response({"token" : token, "message": f"Welcome back {user_to_login.username}😊" })