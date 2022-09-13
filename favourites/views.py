from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Favourite
from .serializers.common import FavouriteSerializer
# Create your views here.

class FavouriteListView(APIView):

    def post(self, request):
        favourite_to_add = FavouriteSerializer(data=request.data)
        try:
            favourite_to_add.is_valid(True)
            favourite_to_add.save()
            return Response(favourite_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print('ERROR')
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FavouriteDetailView(APIView):

    def get_favourite(self, pk):
        try:
            return Favourite.objects.get(pk=pk)
        except Favourite.DoesNotExist:
            raise NotFound(detail="Favourite not found")

    def delete(self, request, pk):
        favourite_to_delete = self.get_favourite(pk=pk)
        if favourite_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        favourite_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)