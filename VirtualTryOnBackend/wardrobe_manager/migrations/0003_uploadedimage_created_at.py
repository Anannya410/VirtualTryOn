# Generated by Django 5.0.7 on 2024-07-15 06:41

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wardrobe_manager', '0002_uploadedimage_delete_wardrobeimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedimage',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]