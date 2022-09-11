from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        # check authorization header exists
        print("authentication middleware")
        print("request.headers", request.data)
        header = request.data.get('Authorization')
        print("header->", header)
        if not header:
            return None
        
        # check header is valid(bearer token)
        if not header.startswith('Bearer'):
            print("failed at token validity")
            raise PermissionDenied("invalid token")

        # remove bearer from beginning and save token to a variable
        token = header.replace('Bearer ', '')

        # attempt to decode the token
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, ["HS256"])

        # if decoded, have a sub - use to look for a user matching that id in the database.
            user = User.objects.get(pk=payload.get('sub'))
        
        except jwt.exceptions.InvalidTokenError:
            print("failed at token decode")
            raise PermissionDenied("Invalid token")

        #if user not found
        except User.DoesNotExist:
            raise PermissionDenied("User not found 🔭")

        # if user is verified, authenticate method requires a tuple to be returned( user, token)
        return (user, token)