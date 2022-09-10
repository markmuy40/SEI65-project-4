
from django.db import models

# Create your models here.
class Review(models.Model):
        Title = models.CharField(max_length=100)
        Price = models.CharField(max_length=20, default=None)
        Description = models.TextField()
        ImageUrl = models.CharField(max_length=200)
        created_at = models.DateTimeField(auto_now_add=True)
        owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = "reviews",
        on_delete = models.CASCADE
    )

        def __str__(self):
                return f"{self.Title}"
