# Generated by Django 3.1.5 on 2021-01-17 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_auto_20210117_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='mimage',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
