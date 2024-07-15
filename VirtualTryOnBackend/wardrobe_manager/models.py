# # wardrobe_manager/models.py
# from django.db import models

# class UploadedImage(models.Model):
#     image_name = models.CharField(max_length=255)
#     image_data = models.TextField()  # Store the base64 string

#     def __str__(self):
#         return f"Image {self.image_name} uploaded"


# wardrobe_manager/models.py
from django.db import models

class UploadedImage(models.Model):
    image_name = models.CharField(max_length=255)
    image_data = models.TextField()  # Store the base64 string
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created

    def __str__(self):
        return f"Image {self.image_name} uploaded"
