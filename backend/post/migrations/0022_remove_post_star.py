# Generated by Django 3.1.5 on 2021-02-01 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0021_comment_cstar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='star',
        ),
    ]
