from django.db import models

class Avatar(models.Model):
    image_name = models.CharField(max_length=255)
    image_data = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image_name
