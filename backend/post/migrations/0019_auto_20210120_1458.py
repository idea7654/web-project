# Generated by Django 3.1.5 on 2021-01-20 05:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0018_auto_20210120_1456'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postimage',
            old_name='parent',
            new_name='parents',
        ),
    ]
