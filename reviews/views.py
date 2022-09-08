from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.exceptions import NotFound

from .models import Review
from .serializers.common import ReviewSerializer

# Create your views here.
class ReviewListView(APIView):

    # ! get all reviews
    def get(self, _request):
        reviews = Review.objects.all()
        print("reviews->", reviews)
        serialized_reviews = ReviewSerializer(reviews, many=True)
        print(serialized_reviews)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)

    # ! post a review
    def post(self, request):
        print('request data->', request.data)
        review_to_add = ReviewSerializer(data=request.data)
        try:
            review_to_add.is_valid(True)
            review_to_add.save()
            return Response(review_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print('ERROR')
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ReviewDetailView(APIView):

    # ! function to fetch data
    def get_review(self, pk):
        try:
            return Review.objects.get(pk)
        except Review.DoesNotExist:
            raise NotFound(detail='Review not found 😢')

    # ! function to get a single review
    def get(self, _request, pk):
        review = self.get_review(pk=pk)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data)

    # ! function to delete a review
    def delete(self, _request, pk):
        review_to_delete = self.get_review(pk=pk)
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  

    # ! function to update a review
    def put(self, request, pk):
        review_to_update = self.get_review(pk=pk)
        updated_review = ReviewSerializer(review_to_update, data=request.data)
        try:
            updated_review.is_valid(True)
            updated_review.save()
            return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)