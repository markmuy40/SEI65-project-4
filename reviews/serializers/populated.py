from favourites.serializers.common import FavouriteSerializer
from .common import ReviewSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from comments.serializers.common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    comments = PopulatedCommentSerializer(many=True)
    owner = UserSerializer()
    # favourites = FavouriteSerializer()
