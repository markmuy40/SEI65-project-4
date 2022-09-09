from .common import ReviewSerializer
from comments.serializers.common import CommentSerializer
#from comments.serializers.common import CommentSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    comments = CommentSerializer(many=True)
