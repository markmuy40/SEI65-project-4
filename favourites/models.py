from django.db import models

# Create your models here.
class Favourite(models.Model):
    favourites = models.BooleanField(default=True)
    review = models.ForeignKey(
        "reviews.Review",
        related_name = "favourites",
        on_delete = models.CASCADE
        )
        # owner = models.ForeignKey(
        #         "jwt_auth.User",
        #         related_name = "favourite",
        #         on_delete = models.CASCADE    
        # )
    def __str__(self):
        return f"{self.favourites}"