# Generated by Django 4.1.1 on 2022-09-09 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='Price',
            field=models.CharField(default=None, max_length=20),
        ),
    ]
