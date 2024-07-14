# outfit_manager/models.py

from django.db import models

class ClothedAvatar(models.Model):
    image = models.TextField()  # Storing base64 encoded images
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ClothedAvatar {self.id}"
