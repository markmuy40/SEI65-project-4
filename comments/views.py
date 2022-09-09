from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound


from .serializers.common import CommentSerializer
from .models import Comment
# Create your views here.

class CommentListView(APIView):
    def get(self, _request):
        comments = Comment.objects.all()
        print("comments->", comments)
        serialized_comments = CommentSerializer(comments, many=True)
        print(serialized_comments)
        return Response(serialized_comments.data, status=status.HTTP_200_OK)


    def post(self, request):
        comment_to_create = CommentSerializer(data=request.data)
        try:
            comment_to_create.is_valid(True)
            comment_to_create.save()
            return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
    
    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Review not found")

    def delete(self, request, pk):
        comment_to_delete = self.get_comment(pk=pk)

        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # function to update a comment
    def put(self, request, pk):
        comment_to_update = self.get_comment(pk=pk)
        updated_comment = CommentSerializer(comment_to_update, data=request.data)
        try:
            updated_comment.is_valid(True)
            updated_comment.save()
            return Response(updated_comment.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)    