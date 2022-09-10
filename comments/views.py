from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .serializers.common import CommentSerializer
from .models import Comment
# Create your views here.

# view all comments
class CommentListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        comments = Comment.objects.all()
        print("comments->", comments)
        serialized_comments = CommentSerializer(comments, many=True)
        print(serialized_comments)
        return Response(serialized_comments.data, status=status.HTTP_200_OK)


    def post(self, request):
        print("comment post endpoint")
        comment_to_create = CommentSerializer(data=request.data)
        try:
            comment_to_create.is_valid(True)
            comment_to_create.save()
            return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#single comment view 
class CommentDetailView(APIView):
    
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Review not found")

    def delete(self, request, pk):
        print("comment delete endpoint")
        comment_to_delete = self.get_comment(pk=pk)
        if comment_to_delete.owner != request.user or request.user.is_superuser:
            raise PermissionDenied("Unauthorized!")
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # function to update a comment
    def put(self, request, pk):
        print("Comment update endpoint")
        comment_to_update = self.get_comment(pk=pk)
        updated_comment = CommentSerializer(comment_to_update, data=request.data)
        try:
            updated_comment.is_valid(True)
            updated_comment.save()
            return Response(updated_comment.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)    