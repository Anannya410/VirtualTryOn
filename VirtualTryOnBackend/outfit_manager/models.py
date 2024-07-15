from django.db import models

class ClothedAvatar(models.Model):
    image = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ClothedAvatar {self.id}"
