from django.db import models

# Create your models here.
class Favourite(models.Model):
    review = models.ForeignKey(
        "reviews.Review",
        related_name = "favourite",
        on_delete = models.CASCADE
        )
    myfavourite = models.BooleanField(default=True)
        # owner = models.ForeignKey(
        #         "jwt_auth.User",
        #         related_name = "favourite",
        #         on_delete = models.CASCADE    
        # )
    def __str__(self):
        return f"{self.myfavourite}"